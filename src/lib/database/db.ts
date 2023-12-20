import Dexie, { type Table, type Transaction } from 'dexie';
import type { Playset, PlaysetRef } from './objects/Playset';
import type { Character } from './objects/Character';
import type { CachedImage, CachedImageRef } from './objects/CachedImage';
import type { dv1_Playset } from './deprecated_objects/1/dv1_Playset';
import { dataUriToBlob } from '$lib/helpers';

export type UpgradeDefinition = [ stores: {[tableName: string]: string | null}, fn?: (trans: Transaction) => void | PromiseLike<any> ]
export class WhoDatDexie extends Dexie {
    sets       !: Table<Playset>;
    characters !: Table<Character>;
    images     !: Table<CachedImage>;

    constructor() {
        super( 'whodat' );

        // Versions
        this.v1();
        this.v2();
    }

    /** Initial Implementation */
    private v1() {
        this.version( 1 ).stores({
            playsets: '++id, title'
        })
    }

    /** Schema change for [#13](https://github.com/Labrasones/who-dat/issues/13) */
    private v2() {
        this.version( 2 )
        .stores({
            sets:          '&title',
            characters:    '&uuid',
            images:        '&uuid'
        })
        .upgrade( tx => {
            tx.table<dv1_Playset>( 'playsets' ).each( dv1_set => {
                try {
                    if( dv1_set.title === undefined )
                    {
                        console.warn( `Dropping set with undefined title! Such records are invalid under schema V2` );
                        return;
                    }

                    const set: Playset = {
                        title:         dv1_set.title,
                        character_ids: []
                    };

                    for( const dv1_char of dv1_set.characters ) {
                        const uuid = crypto.randomUUID();
                        const char: Character = {
                            uuid,
                            name: dv1_char.name ?? "Unnamed Character"
                        }

                        if( dv1_char.img_blob !== undefined )
                        {
                            const blob                      = dataUriToBlob( dv1_char.img_blob );
                            const img_uuid: CachedImageRef  = crypto.randomUUID();
                            const cached_image: CachedImage = {
                                uuid:     img_uuid,
                                original: blob,
                                data_url: dv1_char.img_blob
                            }
                            this.images.add( cached_image, img_uuid );
                            char.image = img_uuid;
                        }

                        this.characters.add( char, uuid );
                        set.character_ids.push( uuid );
                    }

                    this.sets.add( set );
                }
                catch( e ) { console.error( e ); throw e; }
            })
        })
    }
}
export const db = new WhoDatDexie();