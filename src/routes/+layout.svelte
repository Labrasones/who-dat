<script lang='ts' context='module'>
    let title_stack: string[] = [];
    export function pushTitle( title: string )
    {
        title_stack.unshift( title );
        page_title.set( title_stack[0] );
    }
    export function popTitle()
    {
        title_stack.shift();
        page_title.set( title_stack[0] );
    }
    export let page_title: Writable<string> = writable("");
    
</script>
<script lang='ts'>
    import '$scss/global.scss';
    import '@fontsource/concert-one';
    import '@fontsource-variable/lemonada';
    import '@fontsource-variable/comfortaa';
    import '@fontsource/paytone-one';

    import { onMount } from "svelte";
    import { backOut, elasticOut } from "svelte/easing";
    import { fade, fly } from "svelte/transition";
    import { db, type Playset } from '$lib/db';
    import { goto } from '$app/navigation';
    import { writable, type Writable } from 'svelte/store';
    import Modal, { pushModal } from './components/modal/Modal.svelte';
    import TimedModal from './components/modal/TimedModal.svelte';
    import { base } from '$app/paths';

    const splash_time: number  = 3000;
    let show_splash: boolean = false;

    let import_files: FileList;

    onMount(() => {
        // show_splash = true;
        setTimeout( () => {
            show_splash = false;
        }, splash_time);
    })

    async function onImportPlaysets()
    {
        if( import_files?.length < 1 ) return;
        const playset = await new Promise<Playset>( res => {
            const reader = new FileReader();
            reader.onload = () => {
                if( typeof reader.result !== 'string' ) return;
                const parsed = JSON.parse( reader.result ) as Playset;
                // Strip the id from the imported data so we don't trash our own
                delete parsed.id;
                res( parsed );
            }
            reader.readAsText( import_files[0] );
        });
        db.playsets.add( playset );
        pushModal( TimedModal, { message: `Imported ${playset.title}!` } );
    }
</script>

<!-- Splash Page -->
{#if show_splash}
    <div class="splash" in:fly={{ duration: 1000, y: 1000, easing: backOut, opacity: 0 }} out:fade={{ duration: 250 }}>
        <img src="{base}/logo.png" alt="splash"/>
    </div>
{:else}
    <div class="container" in:fade={{ duration: 250 }}>
        <header>
            <a href="{base}"><img src="{base}/logo.png" alt="Who Dat Logo" /></a>
            <span class='logo-theme'>{$page_title ?? ""}</span>
        </header>
        <page><slot /></page>
        <nav>
            <a href="{base}/editor">
                <IconMdiChessPawn />
                <span>Manage</span>
            </a>
            <a href="{base}/game" class='newgame'>
                <IconSolarGamepadBold />
                <span>New game</span>
            </a>
            <label for='importPlayset'>
                <IconSolarUploadBold />
                <span>Upload</span>
                <input id='importPlayset' type='file' bind:files={import_files} on:change={onImportPlaysets} />
            </label>
        </nav>
    </div>
{/if}
<Modal />

<style lang="scss">
    @use 'sass:color';
    @use '$scss/theme';

    header {
        display: flex;
        flex-direction: row;
        align-items: center;

        font-size: 1.5rem;
        padding: 5px;
        
        a {
            display: contents;
        }
        img {
            height: 2em;
        }
        span {
            flex-grow: 1;
            text-align: center;
        }
    }

    .splash {
        position:        absolute;
        
        top:    0;
        left:   0;
        right:  0;
        bottom: 0;
        
        display:         flex;
        flex-direction:  row;
        align-items:     center;
        justify-content: center;

        height: 100dvh;
        width:  100dvw;

        overflow: hidden;

        img {
            width: 80vw;
        }
    }
    .container {
        position:       relative;
        display:        flex;
        flex-direction: column;
        
        height: 100dvh;
        width:  100dvw;
        overflow: hidden;

        nav {
            overflow: hidden;
            background-color: color.scale( theme.$accent_1, $lightness: -25% );

            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: center;

            flex-shrink: 0;

            padding: 0.5em;
            background-color: theme.$accent_1;

            label,
            a {
                text-decoration: none;
                text-align:      center;

                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;

                width: 30%;

                input[type='file'] {
                    position: absolute;
                    opacity: 0;
                    width: 0;
                }

                color: theme.$accent_2;

                text-shadow:
                     1px  0px 0 theme.$light,
                    -1px  0px 0 theme.$light, 
                     0px  1px 0 theme.$light,
                     0px -1px 0 theme.$light 
                ;

                & :global( svg ) {
                    font-size: 1.5em;
                    stroke: theme.$light;
                    stroke-width: 1px;
                }

                &.newgame {
                    width: 40%;
                }
            }
        }

        page {
            flex-grow: 1;
            overflow: scroll;
        }
    }
</style>