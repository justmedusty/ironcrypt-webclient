<script lang="ts">

    import {URI} from "../utils/enums.js";
    import {page} from "$app/stores";
    import {goto} from "$app/navigation";
    import toast from "svelte-french-toast";

    let username = ""
    let password = ""
    async function handleSubmit() {


        const response = await fetch(URI.BASE_URL + URI.BASE_URI + URI.SIGNUP, {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({
                username, password
            }),

        })


        if (response.ok) {
            password = ""
            username = ""
                toast.success("Sign-up Success!")
            goto("/login")
        } else {
            const responseJson = await response.json()
            toast.error(responseJson["Response"])
        }

    }
</script>

<style>
    form {
        max-width: 300px;
        margin: 0 auto;
        text-align: center;
    }
    label{
        font-family: "Bell MT", system-ui;
    }

    input {
        width: 100%;
        margin-bottom: 10px;
    }

    button {
        background-color: #000000;
        color: whitesmoke;
        width: 50%;
    }

    h2 {
        color: #000000;
        font-size: xx-large;
        font-weight: 900;
        border: white;

    }
    button{
        margin-top: 15px;
    }
    a{
        color :blue;
    }

</style>



<form on:submit|preventDefault={handleSubmit}>

    <h2>Sign Up</h2>
    <label>
        Username :
        <input type="text" bind:value={username}/>


    </label>
    <label>
        Password :
        <input type="password" bind:value={password}/>


    </label>
    <button style="margin-bottom: 25px" type="submit">Sign Up</button>
    <div>
        <a href="/login">Already have an account?</a>
    </div>

</form>

