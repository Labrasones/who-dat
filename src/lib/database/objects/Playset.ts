import type { CachedImageRef } from "./CachedImage";
import type { CharacterRef } from "./Character";

export interface Playset {
    /** Unique title for the playset */
    title: string;

    /** Playset icon data */
    icon_ref?: CachedImageRef;
}
export type PlaysetRef = Playset['title'];