import type { CachedImageRef } from "./CachedImage";
import type { CharacterRef } from "./Character";

export interface Playset {
    /** Unique title for the playset */
    title: string;

    /** Playset icon data */
    icon?: CachedImageRef;

    /** Characters included in this playset */
    character_ids: CharacterRef[];
}
export type PlaysetRef = Playset['title'];