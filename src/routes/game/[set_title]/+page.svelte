<script lang='ts'>
    import { db, type Character, type Playset, pushRecentPlayset } from "$lib/database/db";
    import { liveQuery } from "dexie";
    import { writable } from "svelte/store";
    import type { PageData } from "./$types";
    import { download_playset } from "$lib/helpers";
    import { onDestroy, onMount } from "svelte";
    import { popTitle, pushTitle } from "../../+layout.svelte";
    import { base } from "$app/paths";

    export let data: PageData;
    $: playset_id = data.playset_id;
    $: playset    = liveQuery(() => db.playsets.get( playset_id ));
    $: characters = writable<Character[]>( [] );
    $: {
        if ( playset_id !== undefined )
        {
            pushRecentPlayset( playplaysetsid );
        }
    }
    $: {
        if( $playset?.characters !== undefined )
        { // #10 - Add characters to the screen randomly
            const clone = $playset.characters.slice();
            characters.update( chars => {

                let char: Character | undefined;
                while( ( char = clone.pop() ) !== undefined )
                {
                    const tar_idx = Math.floor( Math.random() * chars.length ); // Random position in the target array
                    chars.splice( tar_idx, 0, char );
                }
                
                return chars;
            })
        }
    }
    let my_character: Character;

    // Lifecycle
    onMount( async () => {
        const set = await new Promise<Playset>( res => {
            playset.subscribe( v => {
                if( v !== undefined ) res( v );
            })
        })
        pushTitle( set.title ?? "Play!" );
        my_character = set.characters[ Math.floor( Math.random() * set.characters.length ) ]; // TODO: Use a method that's consistent across reloads
    })
    onDestroy( () => {
        popTitle();
    })

    // Event Handlers
    function onDownload()
    {
        if ( $playset === undefined ) throw new Error( "Attempting to download before playset is loaded" );
        // TODO: It's possible to trigger a web share event! https://developer.mozilla.org/en-US/docs/Web/API/Web_Share_API
        download_playset( $playset );
    }

</script>

<div class="metadata">
    <button class="download" on:click={onDownload}>
        <IconSolarDownloadSquareBold />
        <span>Download Playset</span>
    </button>
    <header>Your Character Is:</header>
    <img src={my_character?.img_blob ?? `${base}/logo.png`} alt="My Character" />
    {#if my_character?.name !== undefined}<span>{my_character.name}</span>{/if}
</div>
<ul class="characters">
    {#each $characters as character, i}
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <!-- svelte-ignore a11y-missing-attribute -->
        <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
        <li class="character" class:selected={character.selected} on:click={() => character.selected = !character.selected}>
            <div class="front">
                <img src={character.img_blob} alt="Character" />
                {#if character.name !== undefined}<span>{character.name}</span>{/if}
            </div>
            <div class="back">
                <img src="{base}/logo.png" />
            </div>
        </li>
    {/each}
</ul>

<style lang="scss">
    @use '$scss/theme';

    .characters {
        list-style: none;
        margin:  0;
        padding: 0;

        display: grid;
        grid-template-columns: repeat(4, auto);
        gap: 10px;
        padding: 10px;

        .character {
            display:  block;
            position: relative;
            
            overflow:     hidden;

            transition: transform 800ms ease;
            height: 6.5em;

            .front,
            .back {
                position: absolute;
                width:  100%;
                height: 100%;
                transition: transform 800ms;
                backface-visibility: hidden;
                transform-style:     preserve-3d;

                border: solid 3px theme.$accent_3;
                border-radius: 15px;
                overflow: hidden;
            }

            .front {
                display: block;

                img {
                    position: absolute;
                    
                    min-width: 100%;
                    height: 100%;

                    top: 50%;
                    left: 50%;

                    transform: translate( -50%, -50% );
                }
                span {
                    position: absolute;
                    z-index: 1;
                    left: 5px;
                    right: 5px;
                    bottom: 5px;

                    text-align: center;
                    text-shadow: // Black outline
                        2px -1px 1px theme.$dark,
                        -2px  1px 1px theme.$dark,
                        -1px  2px 1px theme.$dark,
                        1px -2px 1px theme.$dark,
                        2px  1px 1px theme.$dark,
                        -2px -1px 1px theme.$dark,
                        1px  2px 1px theme.$dark,
                        -1px -2px 1px theme.$dark
                    ;
                }
            }

            .back {
                background-color: theme.$accent_3;
                transform: rotateY(180deg);

                img {
                    position: absolute;
                    display:  block;
                    backface-visibility: hidden;

                    width: 80%;

                    left: 50%;
                    top: 50%;

                    transform: translate( -50%, -50% );
                }
            }

            &.selected .front {
                transform: rotateY(180deg);
            }

            &.selected .back {
                transform: rotateY(360deg);
            }
        }

    }
    
    .metadata {
        display: grid;
        grid-template-areas:
            'download download'
            'header   icon'
            'name     icon'
        ;
        grid-template-columns: 1fr min-content;
        grid-template-rows: 2em 1fr;
        align-items: center;
        gap: 0.5em;
        padding: 0.5em;

        background-color: theme.$accent_1;

        img {
            grid-area: icon;

            height: 6em;
            aspect-ratio: 1/1;

            border: solid 1px theme.$light;
            border-radius: 10px;
        }

        & > span {
            grid-area: name;

            outline:    none;
            border:     solid 1px theme.$light;
            border-radius: 0.25em;
            background: none;

            font-size: 1.5em;

            color: theme.$light;
            text-align: center;

            padding: 0.25em 0 0.15em 0;

            font-family: 'Concert One';
        }
        header {
            grid-area: header;
            justify-self: center;
        }

        button {
            text-decoration: none;
            outline:    none;
            border:     solid theme.$light 2px;
            border-radius: 6px;
            background: theme.$accent_2;
            padding: 0 6px;

            color:       theme.$light;
            font-family: 'Lemonada Variable';

            font-size: 1.1em;

            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: center;

            span {
                flex-grow: 1;
                text-align: center;
            }
        }
        .download {
            grid-area: download;
        }
    }

</style>