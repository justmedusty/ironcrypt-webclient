<script>
    import {createEventDispatcher} from 'svelte'

    export let show = true
    export let title = ''

    const dispatch = createEventDispatcher()
</script>
<style>
    div {
        background-color: rgb(255, 255, 255);
        border-radius: .5rem .5rem .5rem .5rem;
        margin-bottom: 15px;
    }

    .btn-primary, .btn-secondary {
        background-color: rgba(0, 0, 0, 0.85);
    }

    .btn-primary:hover {
        background-color: #ff0000;
    }

    .btn-secondary:hover {
        background-color: limegreen;
    }

</style>
{#if show}
    <div>
        <br/>
        <h5 style="font-size: medium">{title}</h5>
        <slot/>
        <div>
            <br>
            <button on:click={() => dispatch('cancel')} class="btn btn-secondary">Cancel</button>
            <button on:click={() => dispatch('confirm')} class="btn btn-primary">Confirm</button>
            <br>
        </div>
        <br>


    </div>
{/if}