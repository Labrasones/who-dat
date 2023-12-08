<script lang="ts">
    import { fileToUri } from "$lib/helpers";
    import { derived, writable } from "svelte/store";
    import Spinner from "../Spinner.svelte";
    import { onMount } from "svelte";

    // Types
    type vec2 = [ x: number, y: number ];
    type TouchBox = {
        center:    vec2;
        p1:        vec2;
        p2?:       vec2;
        size:      vec2;
        direction: vec2;
        diagonal:  number;
        rotation:  number;
    };
    type ImgOffset   = { center: vec2, scale_factor: number, rotation: number };

    // Properties
    export let dismiss: ( img_uri_or_cancel: string|false ) => void;
    export let cur_img_uri: string;
    export let wheel_zoom_multi: number = 0.1;
    export let snap_distance: number = Math.PI / 4;

    // Internal
    const waiting    = writable( false );
    const img_box    = writable<ImgOffset>({ center: [ 200, 200 ], scale_factor: 1, rotation: 0 });
    const img_store  = writable<HTMLImageElement>();

    const render     = derived([ img_box, img_store ], ( v ) => { return v }); // Derived store that updates whenever the observed render data changes

    let img_files: FileList;
    let canvas: HTMLCanvasElement;
    $: ctx         = canvas?.getContext( '2d' );
    $: canvas_rect = canvas?.getBoundingClientRect();


    // Input Handling Variables
    let touches: undefined | TouchList = undefined;
    let user_is_touching : boolean                 = false;

    let start_img_box    : undefined | ImgOffset   = undefined;
    let start_box  : undefined | TouchBox = undefined;
    let cur_box    : undefined | TouchBox = undefined;

    let cur_touches: TouchList | undefined;

    // Lifecycle
    onMount(async () => {
        await onChangeImage( cur_img_uri );
    })

    // Helpers
    function sanitize( x: number | null | undefined ): number {
        if( x === null || x === undefined || isNaN( x ) ) return 0;
        return x;
    }
    function magSqr( [ x, y ]: vec2 ): number
    {
        return (x * x) + (y * y);
    }
    function mag( a: vec2 ): number
    {
        return Math.sqrt( magSqr( a ) );
    }
    function cross( [ax, ay]: vec2, [bx, by]: vec2 ): number {
        return (ax * by) - (ay * bx);
    }
    function dot( [ ax, ay ]: vec2, [ bx, by ]: vec2 ): number {
        return ( ax * bx ) + ( ay * by );
    }
    function angle( a: vec2, b: vec2 ): number {
        return Math.atan2( cross( a, b ), dot( a, b ) );
    }
    function computeTouchBox( touches: TouchList ): TouchBox
    {
        const out: Partial<TouchBox> = {};
        
        // Compute max/min bounds in each axis
        const x = { min: Number.MAX_VALUE, max: Number.MIN_VALUE };
        const y = { min: Number.MAX_VALUE, max: Number.MIN_VALUE };
        for( const touch of touches )
        {
            const tx = touch.clientX - canvas_rect.x;
            const ty = touch.clientY - canvas_rect.y;

            if( tx < x.min ) x.min = tx;
            if( tx > x.max ) x.max = tx;

            if( ty < y.min ) y.min = ty;
            if( ty > y.max ) y.max = ty;
        }
        out.size   = [ Math.abs( x.max - x.min ), Math.abs( y.max - y.min ) ];
        out.center = [ x.min + out.size[0]/2    , y.min + out.size[1]/2     ];

        // First 2 touches determine "direction"
        out.p1     = [ touches[0].clientX - canvas_rect.x, touches[0].clientY - canvas_rect.y ];
        out.direction = [ 0, 0 ];
        if ( touches.length > 1 )
        {
            out.p2 = [ touches[1].clientX - canvas_rect.x, touches[1].clientY - canvas_rect.y ];
            out.direction = [ out.p1[0] - out.p2[0], out.p1[1] - out.p2[1] ];
        }
        out.rotation = Math.atan2( out.direction[1], out.direction[0] );

        out.diagonal = mag( out.size );

        return out as TouchBox;
    }

    // Event Handlers

    async function onChangeImage( file_or_uri: File | string)
    {
        waiting.set( true );
        if ( $img_store !== undefined )
        {
            URL.revokeObjectURL( $img_store.src ); // Release the last image if we had one
        }

        const uri = file_or_uri instanceof File ? await fileToUri( file_or_uri ) : file_or_uri;
        const img = new Image();
        img_box.set({
            center: [ 200, 200 ],
            scale_factor: 400,
            rotation: 0
        })
        img.src    = uri;
        img.onload = () => {
            img_store.set( img ); // Set the image
            waiting.set( false ); // Done waiting
        }
    }

    async function onAcceptCrop()
    {
        // Dismiss the modal with the data url for the image
        dismiss( canvas.toDataURL( 'img/png' ) );
    }

    
    render.subscribe( ( [ offset, img ] ) => {
        if( ctx === undefined || ctx === null || img === undefined ) return; // No canvas context yet

        ctx.clearRect( 0, 0, canvas.width, canvas.height );

        // Core backdrop color
        ctx.fillStyle = "rgba( 3, 80, 148 )"
        ctx.fillRect( 0, 0, canvas.width, canvas.height );
        
        const sf = offset.scale_factor / 400;
        const w = img.naturalWidth  + (sf * img.naturalWidth);
        const h = img.naturalHeight + (sf * img.naturalHeight);
        const rad = -offset.rotation;// * Math.PI / 180;

        ctx.strokeStyle = 'black';
        ctx.fillStyle   = 'blue';
        ctx.textAlign   = 'left';
        ctx.font        = 'bold 20px sans-serif';

        ctx.translate( offset.center[0], offset.center[1] );
        ctx.rotate( rad );

        
        // Draw a blurry background for the image that fills the canvas
        ctx.filter = "blur(25px) brightness(50%) saturate(50%)"
        ctx.globalAlpha = 0.5;
        ctx.drawImage( img, -w*2, -h*2, w * 4, h * 4);
        ctx.globalAlpha = 1;

        ctx.filter = "none";
        ctx.drawImage( img, -w/2, -h/2, w, h );

        // ctx.strokeRect( -w/2, -h/2, w, h );
        ctx.rotate( -rad );
        ctx.translate( -offset.center[0], -offset.center[1] );

        // ctx.fillText( `rot: ${offset.rotation.toFixed( 2 )}`, 5, 20, canvas.width );
        // ctx.fillText( `size: [${w.toFixed( 2 )}, ${h.toFixed( 2 )}], sf: ${sf.toFixed(2)}`, 5, 40, canvas.width );

        // if( start_box )
        // {
        //     ctx.fillStyle   = 'purple';
        //     ctx.strokeStyle = 'yellow';

        //     ctx.strokeRect(
        //         start_box.center[0] - start_box.size[0]/2,
        //         start_box.center[1] - start_box.size[1]/2,
        //         start_box.size[0],
        //         start_box.size[1]
        //     )

        //     ctx.fillRect( start_box.center[0] - 10, start_box.center[1] - 10, 20, 20 );

        //     if( start_box.p2 )
        //     {
        //         ctx.strokeStyle = 'cyan';
        //         ctx.fillStyle = 'cyan';
        //         ctx.beginPath();
        //         ctx.moveTo( start_box.p1[0], start_box.p1[1] );
        //         ctx.lineTo( start_box.p2[0], start_box.p2[1] );
        //         ctx.stroke();
        //         ctx.fillRect( start_box.p2[0] - 5, start_box.p2[1] - 5, 10, 10 );
        //     }
        // }

        // if( cur_box )
        // {
        //     ctx.fillStyle   = 'blue';
        //     ctx.strokeStyle = 'green';

        //     ctx.strokeRect(
        //         cur_box.center[0] - cur_box.size[0]/2,
        //         cur_box.center[1] - cur_box.size[1]/2,
        //         cur_box.size[0],
        //         cur_box.size[1]
        //     )

        //     ctx.fillRect( cur_box.center[0] - 10, cur_box.center[1] - 10, 20, 20 );

        //     if( cur_box.p2 )
        //     {
        //         ctx.strokeStyle = 'red';
        //         ctx.beginPath();
        //         ctx.moveTo( cur_box.p1[0], cur_box.p1[1] );
        //         ctx.lineTo( cur_box.p2[0], cur_box.p2[1] );
        //         ctx.stroke();
        //         ctx.fillRect( cur_box.p2[0] - 5, cur_box.p2[1] - 5, 10, 10 );
        //     }
        // }
    })

    async function onCanvasBeginMove( e: MouseEvent | TouchEvent )
    {
        user_is_touching = true;
        start_img_box = $img_box;

        if ( e instanceof MouseEvent )
        {
            start_box = {
                center:    [ e.clientX - canvas_rect.x, e.clientY - canvas_rect.y ],
                p1:        [ e.clientX - canvas_rect.x, e.clientY - canvas_rect.y ],
                size:      [ 400, 400 ],
                direction: [0, 0],
                diagonal:  400,
                rotation:  0
            }
        }
        else
        {
            touches = e.touches;
            start_box = computeTouchBox( e.touches );
        }
    }

    async function onCanvasZoom( e: WheelEvent )
    {
        e.preventDefault();
        img_box.update( i => {
            i.scale_factor += e.deltaY * -wheel_zoom_multi;
            return i;
        })
    }

    async function onCanvasMove( e: MouseEvent | TouchEvent )
    {
        if( !user_is_touching || !start_box ||!start_img_box ) return; // Not interested in these events right now.
        e.preventDefault(); // Don't bubble

        cur_touches = e instanceof MouseEvent ? undefined : e.touches;

        // Move the img box by the difference between the touch box we started with and now
        cur_box = e instanceof MouseEvent
        ?   {
                center:    [ e.clientX - canvas_rect.x, e.clientY - canvas_rect.y, ],
                p1:        [ e.clientX - canvas_rect.x, e.clientY - canvas_rect.y ],
                size:      [ 400, 400 ],
                direction: [ 0, 1 ],
                diagonal:  400,
                rotation:  0
            }
        : computeTouchBox( e.touches );
        
        const dcx     = cur_box.center[0] - start_box.center[0];
        const dcy     = cur_box.center[1] - start_box.center[1];
        const dlength = cur_box.diagonal  - start_box.diagonal;

        const drot    = -angle( start_box.direction, cur_box.direction );

        img_box.set({
            center:       [start_img_box.center[0] + dcx, start_img_box.center[1] + dcy],
            scale_factor: start_img_box.scale_factor + (dlength * 1 ),
            rotation:     (start_img_box.rotation + drot) % (2 * Math.PI)
        });
    }
    async function onCanvasEndMove( e: MouseEvent | TouchEvent )
    {
        user_is_touching = false;
        start_box  = undefined;
        start_img_box    = undefined;
    }

    async function onCancel()
    {
        dismiss( false );
    }
</script>
<div>
    <header>Select an Image</header>
    <label for="imageUpload">
        <button>
            <IconSolarUploadSquareBold />
            <span>Choose Image</span>
        </button>
        <input type='file' id="imageUpload" accept="image/*" bind:files={img_files} on:change={ () => onChangeImage( img_files[0] ) } />
    </label>
    <canvas
        bind:this={canvas}
        width="400"
        height="400"
        
        on:mousedown   = { onCanvasBeginMove }
        on:mousemove   = { onCanvasMove      }
        on:mouseup     = { onCanvasEndMove   }
        on:mouseleave  = { onCanvasEndMove   }
        on:wheel       = { onCanvasZoom      }

        on:touchstart  = { onCanvasBeginMove }
        on:touchmove   = { onCanvasMove      }
        on:touchcancel = { onCanvasEndMove   }
        on:touchend    = { onCanvasEndMove   }
    />
    <button on:click={onCancel} class="cancel">
        <IconSolarCloseCircleBold />
        <span>Cancel</span>
    </button>
    <button on:click={onAcceptCrop} class="accept">
        <IconSolarCheckCircleBold />
        <span>Finished</span>
    </button>
    
    <div class="spinner-container" class:visible={$waiting}>
        <Spinner />
    </div>
</div>

<style lang="scss">
    @use '$scss/theme';

    div {
        position: relative;
        display:  grid;
        grid-template-areas:
            'header header header'
            'choose choose choose'
            'canvas canvas canvas'
            '.      cancel accept'
        ;
        grid-template-columns: 2fr 1fr 1fr;
        align-items: center;


        label {
            grid-area: choose;
            input[type='file'] {
                position: absolute;
                opacity: 0;
                width: 0;
            }
            button {
                pointer-events: none;
            }
        }

        canvas {
            position: relative;
            grid-area: canvas;

            pointer-events: all;

            width: 100%;
            aspect-ratio: 1/1;

            backdrop-filter: blur( 50px );
        }

        header {
            grid-area: header;
            font-size: 1.5em;

            padding: 0.25em;
        }

        button {
            display: flex;
            flex-direction: row;
            align-items: center;

            color:      theme.$light;
            background: theme.$accent_2;

            border: none;
            border-radius: 0.25em;

            padding: 0.5em;
            margin: 0.5em;
            font-size: 1.5em;
            height:    2em;

            span {
                font-size: 0.75em;
                margin-left: 0.25em;
            }

            &.cancel {
                grid-area: cancel;
            }
            &.accept {
                grid-area: accept;
            }
        }

        div.spinner-container {
            position: absolute;

            top:    0;
            left:   0;
            right:  0;
            bottom: 0;

            backdrop-filter:
                blur( 5px )
                brightness( 75% )
            ;

            & > :global( spinner ) {
                font-size: 5em;
                height: 2em;

                left: 50%;
                top:  50%;

                transform: translate( -50%, -50% );
            }

            transition: opacity 150ms ease;
            opacity: 0;
            pointer-events: none;
            &.visible {
                opacity: 1;
                pointer-events: all;
            }
        }
    }
</style>