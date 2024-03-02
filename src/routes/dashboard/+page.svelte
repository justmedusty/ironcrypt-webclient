<script lang="ts">

    import Counter from "../Counter.svelte";
    import Tabs from "../components/tabs/Tabs.svelte";
    import {deleteToken} from "../../auth/TokenHandling.js";
    import FileViewer from "../components/FileViewer.svelte";
    function handleLogout() {
        deleteToken()
    }


    let items = [
        {
            label: "Your Files",
            value: 1,
            component: FileViewer
        },
        {
            label: "Account Settings",
            value: 2,
            component: Counter
        },
        {
            label: "Public Key Settings",
            value: 3,
            component: Counter
        },
        {
            label: "About",
            value: 4,
            component: Counter
        }
    ];
</script>
<div>
    <Tabs {items}/>
    <footer>
        <button on:click={handleLogout}>Logout
        </button>
    </footer>
</div>



<style>
    div {

        align-self: center;
        align-content: center;
        align-items: center;
        text-align: center;
        alignment-baseline: center;
    }
    button{
        margin-top: 5vh;
    }
</style>
