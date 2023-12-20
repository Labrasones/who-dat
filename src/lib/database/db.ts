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
            sets:          'title',
            characters:    '[name+_set_title]',
            images:        '[_char_name+_set_title]'
        })
        .upgrade( tx => {
            tx.table<dv1_Playset>( 'playsets' ).each( dv1_set => {
                try {
                    const set: Playset = {
                        title:         dv1_set.title ?? 'Unnamed Set'
                    };

                    for( const dv1_char of dv1_set.characters ) {
                        const char: Character = {
                            _set_title: set.title,
                            name:       dv1_char.name ?? "Unnamed Character"
                        }

                        if( dv1_char.img_blob !== undefined )
                        {
                            const blob                      = dataUriToBlob( dv1_char.img_blob );
                            const cached_image: CachedImage = {
                                _set_title: set.title,
                                _char_name: char.name,
                                original:   blob,
                                data_url:   dv1_char.img_blob
                            }
                            this.images.add( cached_image );
                        }

                        this.characters.add( char );
                    }

                    this.sets.add( set );
                }
                catch( e ) { console.error( e ); throw e; }
            })
        })
    }
}
export const db = new WhoDatDexie();