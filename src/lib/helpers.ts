import type { Playset } from "./db";

const ctx = document.createElement( 'canvas' );
ctx.width  = 200;
ctx.height = 200;

function getOptimizedDataUri( original_uri: string, cb: ( uri: string ) => void ) {
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

export function download_playset( playset: Playset )
{
    // Construct the JSON string for the required data
    const set = Object.assign( {}, playset );
    const as_json = JSON.stringify( set );

    // Create a downloadable blob for the object
    const blob = new Blob([as_json], { type: 'application/json' });
    const url  = URL.createObjectURL( blob );

    // Create and trigger the download via an HREF
    const a = document.createElement( 'a' );
    a.href     = url;
    a.download = `[WhoDatPack] ${ set.title }.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    // Release the URL
    URL.revokeObjectURL( url );
}