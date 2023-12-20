import type { CachedImageRef } from "./CachedImage";

export interface Character {
    /** Unique identifier for this character */
    uuid: string;

    /** Displayed name for this character */
    name: string;

    /** Image data for this charachter */
    image?: CachedImageRef;
}

export type CharacterRef = Character['uuid'];