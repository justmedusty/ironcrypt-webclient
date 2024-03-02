<script lang="ts">

    import Counter from "../Counter.svelte";
    import Tabs from "../components/tabs/Tabs.svelte";

    let items = [
        {
            label: "Content",
            value: 1,
            component: Counter
        },
        {
            label: "Interactions",
            value: 2,
            component: Counter
        },
        {
            label: "Tab 3",
            value: 3,
            component: Counter
        }
    ];
</script>
<div>
    <Tabs {items}/>
</div>


<style>
    div {

        align-self: center;
    }
</style>
