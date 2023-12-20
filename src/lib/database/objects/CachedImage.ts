import { dataUriToBlob } from "$lib/helpers";
import type { Character, CharacterRef } from "./Character";
import type { Playset, PlaysetRef } from "./Playset";

export interface CachedImage {
    /* FK Components */
    _set_title : Playset  [ 'title' ];
    _char_name : Character[ 'name'  ];

    /** Original image data used to produce this Cached Image */
    original: Blob;

    /** Data URL of the cropped and modified image */
    data_url: string;
}

export type CachedImageRef = [
    char_name: CachedImage['_char_name'],
    set_title: CachedImage['_set_title']
];