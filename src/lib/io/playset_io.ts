/**
 * Playset Input/Output functions
 * Provides handlers and helpers for exporting and importing playset data of various versions
 */
// Imports

import { db } from "$lib/database/db";
import type { dv1_Playset } from "$lib/database/deprecated_objects/1/dv1_Playset";
import { type CachedImage } from "$lib/database/objects/CachedImage";
import type { Character } from "$lib/database/objects/Character";
import type { Playset } from "$lib/database/objects/Playset";
import { dataUriToBlob } from "$lib/helpers";
import CachedImage from "../../routes/components/elements/CachedImage.svelte";

// Types
/** Transforms the provided data into a Playset object */
type Importer<T>    = ( inData: T ) => Promise<Playset>;
type VersionImports = { [ version_name: string ]: Importer<any> }

// Json Export Definitions
// - These types define the expected structure of the exported JSON object for each version of
//   export data. It need not be equivalent to database version should only the serialization
//   need changing

/** V1 Export - This version was just the playset object type serialized as JSON */
type v1_SerializedPlayset = dv1_Playset;
/** V2 Export - Multiple fields for each type of data, along with the serialized version */
type v2_SerializedPlayset = {
    version:    '2';
    playset:    Playset;
    characters: Character[];
    images:     Omit<CachedImage, 'original'>[];
}

const importers = [
    async ( data: v1_SerializedPlayset ): Promise<v2_SerializedPlayset> => {
        
        const images    : v2_SerializedPlayset["images"]     = [];
        const characters: v2_SerializedPlayset["characters"] = [];
        const playset   : v2_SerializedPlayset["playset"]    = {
            title:         data.title ?? "Unnamed Playset"
        }

        // Add the image if we had one. Original image isn't stored in v2's serialization, so we don't need to worry about it here
        if( data.img_blob !== undefined )
        {
            images.push({
                _set_title: playset.title,
                _char_name: "!!_SET_ICON",
                data_url:   data.img_blob
            });
        }

        // Add the characters
        for( const dv1_char of data.characters )
        {
            const char: Character = {
                _set_title: playset.title,
                name:       dv1_char.name ?? "Unnamed Character"
            }

            // Add the image if we had one
            if( dv1_char.img_blob !== undefined )
            {
                images.push({
                    _set_title: playset.title,
                    _char_name: dv1_char.name ?? "Unnamed Character",
                    data_url:   dv1_char.img_blob
                })
            }

            // Add the character to the set and the list of characters
            characters.push( char );
        }

        // Return the final v2_SerializedPlayset data
        return {
            version: '2',
            images,
            playset,
            characters
        }
    }
]

// Helpers
export function readAsJson<T>( blob: Blob ): Promise<T> {
    return new Promise( ( res, rej ) => {
        const reader = new FileReader();
        reader.onload = () => {
            if( typeof reader.result !== 'string' ) {
                rej( new Error( `Unable to read blob as JSON` ) );
            }
            else 
            {
                const parsed = JSON.parse( reader.result ) as T;
                res( parsed );
            }
        }
        reader.readAsText( blob );
    });
}

/**
 * Import the serialized playset data into the database
 * 
 * *Will overwrite existing data*
 * @param set_data Serialized playset data to import
 * @returns `Playset` data object
 */
export async function importSerializedPlayset( set_data: v2_SerializedPlayset ): Promise<Playset>
{
    // Add the images and characters to the database first
    await db.characters.bulkPut( set_data.characters );
    await db.images    .bulkPut( set_data.images.map( ( { _set_title, _char_name, data_url } ) => {
        let original;
        try {
            original = dataUriToBlob( data_url );
        }
        catch( e )
        {
            console.warn( `Failed to convert [${_set_title}+${_char_name}]'s data url to a blob!` );
            original = new Blob();
        }

        return {
            _set_title,
            _char_name,
            data_url,
            original
        }
    }));
    await db.sets.put( set_data.playset );

    return set_data.playset;
}

/**
 * Parses the provided blob into the most current serialized data format
 * @param blob Blob containing the JSON data to import
 * @returns The playset contained in the blob in the most current serialized format type
 */
export async function parsePlaysetFromBlob( blob: Blob ): Promise<v2_SerializedPlayset>
{
    let data    : any    = await readAsJson<{version ?: number}>( blob );
    let data_ver: number = data.version ?? 0;

    for( let idx = data_ver; idx < importers.length; ++idx )
    {
        console.log( `Upgrading import file: v${idx} -> v${idx+1}` );
        data = importers[idx]( data as any );
    }

    return data;
}

/**
 * Serializes the provided playset and it's required data to a single file blob for export
 * @param set `Playset` data object to serialize
 */
export async function exportPlaysetToBlob( set: Playset ): Promise<Blob>
{
    // First, retrieve all the images and characters from their respective databases
    const characters = await db.characters.where( 'uuid' ).anyOf( set.character_refs );
    console.log( characters );
}