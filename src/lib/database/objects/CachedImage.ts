export interface CachedImage {

    /** Unique identifier for this image*/
    uuid: string;

    /** Original image data used to produce this Cached Image */
    original: Blob;

    /** Data URL of the cropped and modified image */
    data_url: string;
}

export type CachedImageRef = CachedImage['uuid'];