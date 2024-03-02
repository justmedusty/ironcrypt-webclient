<script lang="ts">
    import {URI} from "../utils/enums";
    import {saveToken} from "../../auth/TokenHandling.ts";
    import Header from "../Header.svelte";

    let username = ""
    let password = ""

    async function handleSubmit() {

        const credentials = `${username}:${password}`
        const base64Credentials = btoa(credentials)

        try {
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
                saveToken(token)
                alert("Login Success")
            } else {
                alert("Login failed")
            }

        } catch
            (error) {
            console.error("Error logging in")
            alert("Error")
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
       background-color: #4f67ff;
        color: whitesmoke;
        font-family: "Bell MT", system-ui;
        width: 50%;
    }

    h1 {
        color: crimson;
        font-family: "Bell MT", system-ui;
    }

</style>

<h1>Login</h1>

<form on:submit|preventDefault={handleSubmit}>

    <label>
        Username :
        <input type="text" bind:value={username}/>


    </label>
    <label>
        Password :
        <input type="text" bind:value={password}/>


    </label>
    <button type="submit">Submit</button>


</form>



