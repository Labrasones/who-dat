<spinner>
    <shape />
</spinner>

<style lang='scss'>
    @use '$scss/theme';
    
    @keyframes spin {
        0% {
            transform: rotateZ( 0deg );
        }
        100% {
            transform: rotateZ( 360deg )
        }
    }

    // Default Variables
    :root {
        --spinner-easing: ease;
        --spinner-time:   500ms;
        --spinner-weight: 0.2em;
        --spinner-color:  #{theme.$light};
    }

    spinner {
        display:  inline;
        position: absolute;

        min-height:   1em;
        aspect-ratio: 1/1;

        shape {
            display:  block;
            position: absolute;

            top:  0;
            left: 0;

            width:  100%;
            height: 100%;

            border:        solid var( --spinner-weight ) transparent;
            border-top:    solid var( --spinner-weight ) var( --spinner-color );
            border-radius: 100%;

            animation: spin var( --spinner-easing ) infinite var( --spinner-time );
        }
    }
</style>