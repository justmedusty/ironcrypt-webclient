<script lang="ts">

    import Tabs from "../components/Tabs.svelte";
    import {deleteToken} from "../../auth/TokenHandling.js";
    import FileViewer from "../components/FileViewer.svelte";
    import About from "../components/About.svelte";
    import PublicKeySettings from "../components/PublicKeySettings.svelte";
    import AccountSettings from "../components/AccountSettings.svelte";

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
            component: AccountSettings
        },
        {
            label: "Public Key Settings",
            value: 3,
            component: PublicKeySettings
        },
        {
            label: "About",
            value: 4,
            component: About
        }
    ];
</script>
<div >
    <Tabs {items}/>
    <footer>
        <button class="logout" on:click={handleLogout}>Logout
        </button>
    </footer>
</div>


<style>
    div {

        align-self: center;
        align-content: center;
        align-items: center;
        text-align: center;
        min-width: fit-content;

    }

    button {
        margin-top: 5vh;
    }
</style>
