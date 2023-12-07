<script lang="ts">
    export let dismiss: ( value: boolean|undefined ) => void;

    export let title:   string;
    export let message: string;

    export let yesText: string = "Yes";
    export let noText: string  = "No";

    export let showCancel: boolean = false;
</script>
<article>
    <h1>{title}</h1>
    <p>{@html message}</p>
    <nav>
        <button on:click={()=>dismiss( true )} >{yesText}</button>
        <button on:click={()=>dismiss( false )}>{noText }</button>
        {#if showCancel}
            <button on:click={() => dismiss( undefined ) }>
                Cancel
            </button>
        {/if}
    </nav>
</article>

<style lang="scss">
    @use '$scss/theme';
    article {
        max-width: 75vw;
        background-color: theme.$dark;

        padding: 1rem;

        & > *:not(:last-child) {
            margin-bottom: 8px;
        }
        p {
            white-space: pre-wrap;

            & :global( em ) {
                white-space: normal;
                color: theme.$accent_2;
            }
        }
    }
</style>