import type { CachedImageRef } from "./CachedImage";
import type { Playset } from "./Playset";

export interface Character {
    /** FK Components */
    _set_title: Playset[ 'title' ];

    /** Displayed name for this character */
    name: string;
}

export type CharacterRef = [
    name:      Character[ 'name'       ],
    set_title: Character[ '_set_title' ]
];