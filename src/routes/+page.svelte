<script lang='ts'>
    import { LocalStorageStore, db, type Playset, recent_playset_ids } from "$lib/db";
    import { liveQuery } from "dexie";
    import { backOut, elasticOut } from "svelte/easing";
    import { fly } from "svelte/transition";

    $: recents = liveQuery<Playset[]>(async () => {
        return await db.playsets.where( 'id' ).anyOf( $recent_playset_ids ).toArray();
    })

</script>
<article>
    <header>Jump back in</header>
    <section>
        {#each $recents ?? [] as recent, idx}
            <a href="/game/{recent.id}" transition:fly={{ duration: 1000, y: 50, easing: backOut }}>
                <img src={recent.img_blob} alt="Playset icon" />
                <span>{recent.title}</span>
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
            display: grid;
            grid-template-columns: repeat( 2, 1fr );
            gap: 1em;
            margin: 1em;

            a {
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
            }
        }
    }
</style>