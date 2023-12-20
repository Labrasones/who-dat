<script lang='ts'>
    import { db } from "$lib/database/db";
    import { liveQuery } from "dexie";
    import { writable, type Writable } from "svelte/store";
    import type { PageData } from "./$types";
    import { convert_files, download_playset } from "$lib/helpers";
    import { goto } from "$app/navigation";
    import { onDestroy, onMount } from "svelte";
    import { page_title, popTitle, pushTitle } from "../../+layout.svelte";
    import { slide } from "svelte/transition";
    import { pushModal } from "../../components/modal/Modal.svelte";
    import YesNoModal from "../../components/modal/YesNoModal.svelte";
    import { base } from "$app/paths";
    import CropImageModal from "../../components/modal/CropImageModal.svelte";
    import type { dv1_Character } from "$lib/database/deprecated_objects/1/dv1_Playset";
    import CachedImage from "../../components/elements/CachedImage.svelte";

    export let data: PageData;
    $: playset = data.set;

    // Dynamic
    $: character_count = $playset?.character_refs?.length ?? 0;
    $: set_icon = liveQuery( () => db.images.get( $playset?.icon_ref ) );

    // Internal
    let playset_image_file:    FileList;
    let character_image_files: FileList;

    // Lifecycle
    onMount( () => {
        pushTitle( "Playset Editor" );
    })
    onDestroy( () => {
        popTitle();
    })

    // Event Handlers
    async function onChangePlaysetImage()
    {
        if ( playset_image_file.length > 0 )
        {
            const optimized_uri = ( await convert_files( playset_image_file ) )[0];
            //$playset?.icon = optimized_uri;
        }
    }

    async function onAddCharacterImages()
    {
        // if( character_image_files.length > 0 )
        // {
        //     if( $playset.characters === undefined ) {
        //         $playset.characters = [];
        //     }
        //     const optimized_uris = await convert_files( character_image_files );
        //     for( const uri of optimized_uris )
        //     {
        //         if( ($playset.characters?.length ?? 0) >= 24 ) break; // Insert up to 24 max
        //         playset.update( p => {
        //             p.characters.push({
        //                 img_blob: uri
        //             });
        //             return p;
        //         })
        //     }
        // }
    }

    async function onDelete()
    {
        // const result = await pushModal( YesNoModal, { title: `Delete "${$playset.title}"?`, message: `Are you sure you want to delete the "${$playset.title}" playset?` } );
        // if( result )
        // {
        //     db.sets.delete( $playset.title );
        //     goto( `${base}/editor` )
        // }
    }

    function onShare()
    {
        // download_playset( $playset );
    }

    async function onEditImageFor( character: dv1_Character )
    {
        // const new_img_uri = await pushModal( CropImageModal, { cur_img_uri: character.img_blob ?? `${base}/logo.png` });
        // if( new_img_uri === false ) return; // User cancelled the modal
        
        // character.img_blob = new_img_uri;
        // playset.set( $playset );
    }

</script>

<div class="metadata">
    <label for='playset-image'>
        <IconSolarPenBold class="icon"/>
        <!-- <img src={$playset.img_blob ?? `${base}/logo.png`} alt="Playset Icon" /> -->
    </label>
    <!-- <input type="text" bind:value={$playset.title} placeholder="Playset Title" /> -->
    <button class="trash" on:click={onDelete}>
        <IconSolarTrashBin2Bold />
    </button>
    <button class="share" on:click={onShare}>
        <IconSolarShareBold />
        <span>Share</span>
    </button>
</div>
<!-- {#if character_count < 24}
{@const characters_needed = 24 - character_count}
<div class="file-upload" transition:slide={{ duration: 250, axis: 'y'}}>
    <label for="character-images">
        <IconSolarUploadSquareBold />
        <span>Add Images</span>
    </label>
    <input id="character-images" type='file' bind:files={character_image_files} multiple accept="image/*" on:change={onAddCharacterImages} />
    <span>
        {characters_needed} more character{characters_needed !== 1 ? "s" : ""} needed!
    </span>
</div>
{/if}
<ul class="characters">
    {#each $playset.characters ?? [] as character, i}
    <li class="character">
        <img src={character.img_blob} alt="Character" />
        <input type="text" bind:value={character.name} on:change={()=>{ playset.set( $playset ) }}/>
        <button
            class='trash'
            on:click={()=>{
                $playset.characters.splice( i, 1 );
                playset.set( $playset );
            }}
        >
            <IconSolarTrashBin2Bold />
        </button>
        <button
            class="edit"
            on:click={()=>onEditImageFor( character )}
        >
            <IconSolarPenBold />
        </button>
    </li>
    {/each}
</ul> -->

<style lang="scss">
    @use '$scss/theme';

    .characters {
        list-style: none;
        margin:  0;
        padding: 0;

        display: grid;
        grid-template-columns: repeat(3, auto);
        gap: 10px;
        padding: 10px;

        .character {
            display:  inline-block;
            position: relative;

            overflow: hidden;
            border: solid 5px theme.$accent_3;
            border-radius: 5px;
            aspect-ratio: 1/1.3;

            img {
                height: 100%;
                transform: translateX( -15% );
            }
            input {
                position: absolute;
                z-index: 1;
                bottom:  0;
                background: rgba( theme.$light, 0.5 );
                outline: none;

                width: 100%;
                font-size: 1rem;

                border: none;
                border-top: solid 1px theme.$light;
                color: theme.$light;
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

            button {
                display: inline-block;
                position: absolute;
                z-index: 1;

                padding: 4px;
                font-size: 1.2rem;

                background: theme.$accent_1;
                border: none;
                border-radius: 5px;
                color: theme.$accent_2;


                & > :global( svg ) {
                    stroke: theme.$light;
                    stroke-width: 1px;
                }

                &.trash {
                    top:   5px;
                    right: 5px;
                }
                &.edit {
                    top: 5px;
                    left: 5px;
                }
            }
        }
    }

    .file-upload {
        position: sticky;
        top: 0;
        z-index: 99;

        display: flex;
        flex-direction: row;
        align-items: center;

        padding: 0.25em;

        background: theme.$accent_1;

        input[type='file'] { // Effectively remove this from the DOM as we can't style it. Use it's Label as the form control instead
            position: absolute;
            opacity: 0;
            width: 0;
        }

        label {
            display:       inline-block;
            outline:       none;
            border:        solid theme.$light 2px;
            border-radius: 6px;
            background:    theme.$accent_2;

            color:         theme.$light;
            font-family:  'Lemonada Variable';

            padding: 0.25em;

            font-size: 1.1em;

            display: flex;
            flex-direction: row;
            align-items: center;

            span {
                flex-grow: 1;
                text-align: center;
                margin-left: 0.25em;
            }
        }

        span {
            flex-grow: 1;
            text-align: center;
        }
    }

    .metadata {
        display: grid;
        grid-template-areas:
            'icon title title title    trash'
            'icon save  save  download download'
        ;
        grid-template-columns: min-content 1fr 1fr 1fr 1fr;
        grid-template-rows: 1.5fr 1fr;
        gap: 0.5em;
        padding: 0.5em;

        background-color: theme.$accent_1;

        input[type='file'] { // Effectively remove this from the DOM as we can't style it. Use it's Label as the form control instead
            position: absolute;
            opacity: 0;
            width: 0px;
        }

        label {
            grid-area: icon;
            align-self: center;

            position: relative;
            display:  block;

            overflow: hidden;

            img {
                height: 6em;
                aspect-ratio: 1/1;

                border: solid 1px theme.$light;
                border-radius: 10px;
            }

            & :global( svg ) {
                position: absolute;

                z-index: 999;

                font-size: 1.5em;

                right:   0.3em;
                bottom:  0.3em;

                color: theme.$accent_2;

                stroke: theme.$light;
                stroke-width: 1px;

                background-color: theme.$accent_1;

                padding: 5px;
                border-radius: 10px;
            }
        }

        input[type='text'] {
            grid-area: title;
            outline:    none;
            border:     solid 1px theme.$light;
            border-radius: 0.25em;
            background: none;

            font-size: 1.5em;

            color: theme.$light;
            text-align: center;

            padding: 0.25em 0 0.25em 0;

            font-family: 'Concert One';
        }

        a,
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
        .save {
            grid-area: save;
        }
        .download {
            grid-area: download;
        }
    }

</style>