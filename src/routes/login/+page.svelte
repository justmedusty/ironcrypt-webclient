<script>
    import {URI} from "../utils/enums";
    import {saveTokenWithAutoDelete} from "../../auth/TokenHandling.js";
    import {page} from "$app/stores";
    import {goto} from "$app/navigation";
    import toast, {Toaster} from 'svelte-french-toast';

    let username = ""
    let password = ""

    async function handleSubmit() {
        const credentials = `${username}:${password}`
        const base64Credentials = btoa(credentials)
        const response = await fetch(URI.BASE_URL + URI.BASE_URI + URI.LOGIN, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Basic ${base64Credentials}`
            },
            body: JSON.stringify({username, password})
        })

        if (response.ok) {
            const responseData = await response.json()
            const token = responseData['access_token']
            saveTokenWithAutoDelete(token)
            username = ""
            password = ""
            toast.success("Success!")
            goto("/dashboard")

        } else {
            toast.error("Error logging in")
        }
        console.error("Error logging in")


    }


</script>
<style>
    form {
        max-width: 300px;
        margin: 0 auto;
        text-align: center;
    }

    label {
        font-family: "Bell MT", system-ui;
    }

    input {
        width: 100%;
        margin-bottom: 10px;
    }


    h2 {
        color: #000000;
        font-size: xx-large;
        font-weight: 900;
        border: white;

    }

    button {
        background-color: #000000;
        color: whitesmoke;
        margin-top: 15px;
        width: 50%;
    }

    h2 {
        color: #000000;
        font-size: xx-large;
        font-weight: 900;
        border: white;

    }
    a{
        color: blue;
    }
</style>


<form on:submit|preventDefault={handleSubmit}>
    <h2>Login</h2>

    <label>
        Username :
        <input type="text" bind:value={username}/>


    </label>
    <label>
        Password :
        <input type="password" bind:value={password}/>


    </label>
    <button style="margin-bottom: 25px; width: 50%;" type="submit">Login</button>

    <div class="switch-pages">
        <a href="/signup">Don't have an account?</a>
    </div>



</form>


