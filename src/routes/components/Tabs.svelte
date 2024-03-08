<script>
    export let items = [];
    export let activeTabValue = 1;

    const handleClick = tabValue => () => (activeTabValue = tabValue);
</script>

<ul>
    {#each items as item}
        <li class={activeTabValue === item.value ? 'active' : ''}>
            <span on:click={handleClick(item.value)}>{item.label}</span>
        </li>
    {/each}
</ul>
{#each items as item}
    {#if activeTabValue === item.value}
        <div class="box">
            <svelte:component this={item.component}/>
        </div>
    {/if}
{/each}
<style>
    .box {
        margin-bottom: 10px;
        padding: 40px;
        border-radius: .5rem .5rem .5rem .5rem;
        border: 5px solid rgba(255, 255, 255, 0.46);
        align-content: center;
    }
    ul {
        display: flex;
        flex-wrap: wrap;
        padding-left: 0;
        margin-bottom: 0;
        list-style: none;
        justify-content: center;
    }
    li {
        margin-bottom: 0;
    }

    span {
        border: 1px solid transparent;
        border-top-left-radius: 0.25rem;
        border-top-right-radius: 0.25rem;
        display: inline-block;
        padding: 0.5rem 1rem;
        cursor: pointer;
    }

    span:hover {
        border-color: rgb(233, 236, 239) rgb(233, 236, 239) #dee2e6 rgb(222, 226, 230);
    }

    li.active > span {
        color: #495057;
        background-color: rgba(255, 255, 255, 0.5);
        font-weight: 900;
    }
</style>