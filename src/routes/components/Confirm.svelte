<svelte:head>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.1.3/dist/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous">
</svelte:head>

<script>
    import { createEventDispatcher } from 'svelte'

    export let show = true
    export let title = ''

    const dispatch = createEventDispatcher()
</script>
<style>
    div{
        background-color: rgba(255, 255, 255, 0.16);
    }
    .btn-primary{
        background-color: rgba(0, 0, 0, 0.85);
    }
</style>
{#if show}
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">{title}</h5>
                <button on:click={() => dispatch('cancel')} class="close" aria-label="Close">
                    <span aria-hidden="true">×</span>
                </button>
            </div>
            <div class="modal-body">
                <slot />
            </div>
            <div class="modal-footer">
                <button on:click={() => dispatch('cancel')} class="btn btn-secondary">Cancel</button>
                <button on:click={() => dispatch('confirm')} class="btn btn-primary">Confirm</button>
            </div>
        </div>
    </div>
{/if}