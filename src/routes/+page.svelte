<script lang="ts">
    import { onDestroy, onMount } from "svelte";
    import { liveQuery } from "dexie";
    import { db, type Playset } from "$lib/db";
    import { backOut } from "svelte/easing";
    import { fly } from "svelte/transition";
    import { goto } from "$app/navigation";
    import { base } from "$app/paths";
    import { popTitle, pushTitle } from "./+layout.svelte";

    // Internal
    let search_str: string;
    $: playsets = liveQuery(async () => {
        console.log( `Search with str: `, search_str );
        if ( !search_str ) return await db.playsets.toArray();
        else return await db.playsets.filter( p => {
            if( !p.title ) return false;
            return p.title.toLowerCase().includes( search_str.toLowerCase() );
        }).toArray();
    })

    // Lifecycle
    onMount(() => {
        pushTitle( "Choose Your Playset" );
    });
    onDestroy(() => {
        popTitle();
    });

    // Event Handlers
    async function onAddPlayset()
    {
        const idx = await db.playsets.add({} as Playset);
        goto( `${base}/editor/${idx}` );
    }
</script>

<article>
    <header>Select a Playset</header>
    <nav>
        <input type='text' placeholder="search" bind:value={search_str} />
        <IconSolarMagniferLinear />
    </nav>
    <section>
        {#each $playsets ?? [] as playset, idx}
            {@const character_count = playset.characters?.length ?? 0}
            <a href="{base}/game/{playset.id}" transition:fly={{ duration: 1000, y: 50, easing: backOut }}>
                {#if character_count < 24}
                    <span class="warning">
                        <IconSolarShieldWarningBold />
                        <small>{character_count}/24 chacacter{character_count !== 1 ? "s" : ""}!</small>
                    </span>
                {/if}
                <img src={playset.img_blob ?? `${base}/logo.png`} alt="Playset icon" />
                <span>{playset.title}</span>
            </a>
        {/each}
    </section>
</article>


<style lang="scss">
    @use '$scss/theme';

    article {
        display: flex;
        flex-direction: column;
        align-items:    center;

        header {
            font-size: 2em;
            color:       theme.$light;
            text-shadow: 0 0 15px theme.$accent_1;
            
            font-family: 'Lemonada Variable';
            font-weight: 900;
        }

        section {
            display:               grid;
            grid-template-columns: repeat( 2, 1fr );
            gap:    1em;
            margin: 1em;

            button {
                display:        flex;
                flex-direction: column;
                align-items:    center;
                justify-content: center;

                border:        solid 5px theme.$accent_3;
                border-radius: 10px;

                color: theme.$light;
                font-size: 1.25em;

                background: none;
                outline:    none;

                padding: 1em;

                & :global( svg ) {
                    font-size: 3em;
                    margin-bottom: 0.25em;
                }
            }

            a {
                position: relative;
                display: flex;
                flex-direction: column;
                align-items:    stretch;
                
                border: solid 5px theme.$accent_3;
                border-radius: 15px;

                overflow: hidden;

                span {
                    font-size: 1.2em;
                    text-align: center;
                    padding: 0.25em;
                }

                .warning {
                    position: absolute;
                    font-size: 1rem;
                    font-weight: 100;
                    left:  0;
                    right: 0;
                    top:   0;

                    background: theme.$accent_3;
                    color: theme.$dark;

                    & :global( svg ) {
                        font-size: 1.5em;
                        color: theme.$accent_2;
                        
                        stroke: theme.$light;
                        stroke-width: 1px;

                        vertical-align: middle;
                    }
                }
            }
        }
    }
</style>