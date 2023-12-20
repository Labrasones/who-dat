import { browser } from "$app/environment";
import type { dv1_Playset } from "./database/deprecated_objects/1/dv1_Playset";
import type { Playset } from "./database/objects/Playset";


function getOptimizedDataUri( original_uri: string, cb: ( uri: string ) => void ) {
    const ctx = document.createElement( 'canvas' );
    ctx.width  = 200;
    ctx.height = 200;
    
    const img = new Image();
    img.onload = () => {
        const h_aspect = img.height / img.width;
        const v_aspect = img.width  / img.height;
        let width, height;
        if ( img.height < img.width ) {
            width  = ctx.width / h_aspect;
            height = ctx.height;
        }
        else
        {
            width  = ctx.width;
            height = ctx.height / v_aspect;
        }
        ctx.getContext('2d')?.clearRect(0, 0, ctx.width, ctx.height);
        ctx.getContext('2d')?.drawImage( img, (ctx.width - width) / 2, (ctx.height - height) / 2, width, height );
        cb( ctx.toDataURL('image/png') );
    }
    img.src = original_uri;
}


export function fileToUri( file: File ): Promise<string>
{
    return new Promise<string>( ( res, rej ) => {
        const reader = new FileReader();
        reader.onerror = rej;
        reader.onload = () => {
            const result = reader.result;
            if ( result === null ) {
                rej( `File reader had null result` );
            }
            else if ( typeof result !== 'string' )
            {
                rej( `File reader result was not a string` );
            }
            else
            {
                res( result );
            }
        }
        reader.readAsDataURL( file );
    })
}

/** Function to convert a data uri to a blob based on: https://stackoverflow.com/questions/4998908/convert-data-uri-to-file-then-append-to-formdata */
export function dataUriToBlob( data_uri: string ): Blob
{
    // convert base64/URLEncoded data component to raw binary data held in a string
    var byteString;
    if ( data_uri.split(',')[0].indexOf('base64') >= 0 )
    {
        byteString = atob( data_uri.split(',')[1] );
    }
    else
    {
        byteString = decodeURI( data_uri.split(',')[1] );
    }

    // separate out the mime component
    var mimeString = data_uri.split(',')[0].split(':')[1].split(';')[0];

    // write the bytes of the string to a typed array
    var ia = new Uint8Array(byteString.length);
    for (var i = 0; i < byteString.length; i++)
    {
        ia[i] = byteString.charCodeAt(i);
    }

    return new Blob([ia], {type:mimeString});
}

export function convert_files( files: FileList ): Promise< string[] >
{
    let promises: Promise<string>[] = [];

    for( const file of files )
    {
        promises.push( new Promise( res => {
            const reader = new FileReader();
            reader.onload = () => {
                if( typeof reader.result !== 'string' ) return;
                getOptimizedDataUri( reader.result, ( uri: string ) => res( uri ) );
            }
            reader.readAsDataURL( file );
        }));
    }

    return Promise.all( promises );
}
