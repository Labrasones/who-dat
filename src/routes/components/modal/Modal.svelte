<script lang="ts" context="module">
    import { SvelteComponent, type ComponentType, type ComponentProps } from "svelte";
    import { writable, type Writable } from "svelte/store";
    import { fade, fly } from "svelte/transition";


    export interface ModalComponentInterface<ResultType = any> {
        dismiss ( r: ResultType ): void;
    }
    export class ModalComponent<ResultType = any> extends SvelteComponent<ModalComponentInterface<ResultType>> {}
    export type  ModalComponentProperties<C extends SvelteComponent<any, any>> = Omit<ComponentProps<C>, keyof ModalComponentInterface>;
    export type  ModalComponentResultType<C> = C extends ModalComponent< infer R > ? R : never;

    type ModalStackEntry<C extends ModalComponent = ModalComponent> = {
        component: ComponentType<C>,
        dismiss:  ( result: any ) => void,
        props?:    any
    }

    const modal_stack: Writable< ModalStackEntry[] > = writable( [] );
    export function pushModal<C extends ModalComponent, RT = ModalComponentResultType<C>>( component: ComponentType<C>, props ?: ModalComponentProperties<C> ): Promise<RT>
    {
        // Construct a promise which will be resolved when the modal's dismiss function is called
        let r: ( result: RT ) => void;
        const p = new Promise<RT>( res => r = res );

        // Push the modal onto the stack
        modal_stack.update( s => {
            const idx = s.push({
                component,
                props,
                dismiss: ( result: RT ) => {
                    modal_stack.update( s => {
                        s.splice( idx - 1, 1 );
                        return s;
                    });
                    r( result );
                }
            })
            return s;
        })

        return p;
    }
</script>
<script lang='ts'>
    $: top_modal = $modal_stack[0];
</script>

{#if top_modal !== undefined}
<div transition:fade={{duration: 250}}>
    <span transition:fly={{y: -25, duration: 450, delay: 125}}>
        <svelte:component this={top_modal.component} dismiss={top_modal.dismiss} {...top_modal.props} />
    </span>
</div>
{/if}

<style lang="scss">
    @use 'sass:color';
    @use '$scss/theme';
    div {

        position: fixed;
        z-index:  999;
        top:    0;
        left:   0;
        right:  0;
        bottom: 0;

        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;

        background-color: rgba( 50, 50, 50, 0.15 );
        backdrop-filter: blur( 1.5px );

        span {
            display:  block;
            position: relative;

            margin:   25px;
            overflow: hidden;

            background: theme.$accent_1;
            border: solid 5px theme.$accent_2;
            border-radius: 1.5em;

            box-shadow:
                0 0 0 2px theme.$light,
                0 0 0 8px theme.$accent_1,
            ;

            & :global( > * ) {
                flex-grow: 1;
            }
        }
    }
</style>