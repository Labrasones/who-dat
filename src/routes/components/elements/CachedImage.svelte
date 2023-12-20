<script lang='ts'>
    import type { CachedImage } from "$lib/database/objects/CachedImage";
    import { readable, type Readable } from "svelte/store";

    
    // Props
    export let image:    Readable<CachedImage> = readable<CachedImage>({
        uuid: crypto.randomUUID(),
        data_url: './logo.png',
        original: null as any
    });
    export let editable: boolean               = false;

    // Internal
    let files: FileList;

    // Event Handlers
    function onChangeImageFile()
    {
        
    }
</script>

<cached-image>
    <input id='playset-image' type="file" bind:files accept="image/*" on:change={onChangeImageFile}/>
    <img src={$image.data_url} />
</cached-image>