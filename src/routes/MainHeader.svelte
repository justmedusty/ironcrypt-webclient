<script>
import {page} from "$app/stores";
</script>

<header>
    <ul>
        <li >
            <h1 style="margin-bottom: 0">IronCrypt</h1>
        </li>
        <li>
            <h2>Asymmetric Encryption + File Storage</h2>
        </li>
    </ul>
</header>


<style>
    header {
        display: flex;
        justify-content: center; /* Center content horizontally */
        align-items: center; /* Center content vertically */
        width: 100vw; /* Full width of the viewport */
        max-width: 100%; /* Limit width to the viewport width */
        box-sizing: border-box; /* Include padding and border in the total width */
    }

    ul {
        display: flex;
        flex-direction: column;
        justify-content: center; /* Center content horizontally */
        align-items: center; /* Center content vertically */
        padding: 5px;
        margin: 0;
        height: 7vh; /* Full height of the viewport */
        width: 100vw; /* Full width of the viewport */
        background-size: contain;
        background-color: rgba(101, 255, 0, 0.07);
        list-style: none;
    }

    li {
        font-family: "Franklin Gothic Heavy",system-ui;
        font-weight: bolder;
        font-size: x-large;
    }


</style>