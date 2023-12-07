<script lang="ts">
    import { onMount } from "svelte";

    export let dismiss: () => void;

    export let message: string;
    export let display_ms: number = 1000;

    onMount(()=>{
        setTimeout( dismiss, display_ms );
    })
</script>
<article>
    <p>{@html message}</p>
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