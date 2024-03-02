<script lang="ts">

    import {URI} from "../utils/enums.js";
    import {page} from "$app/stores";
    import {goto} from "$app/navigation";

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
            goto("/login")
        } else {
            alert(`Signup failed : ${response.status}`)
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

    h1 {
        color: #000000;
    }

</style>


<h1>Sign Up</h1>

<form on:submit|preventDefault={handleSubmit}>
    <label>
        Username :
        <input type="text" bind:value={username}/>


    </label>
    <label>
        Password :
        <input type="password" bind:value={password}/>


    </label>
    <button style="margin-bottom: 25px" type="submit">Submit</button>
    <button class="switch-pages" aria-current={$page.url.pathname.startsWith("/login")?undefined:'page'}>
        <a href="/login">Already have an account?</a>
    </button>

</form>

