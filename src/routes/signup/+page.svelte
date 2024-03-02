<script lang="ts">

    import {URI} from "../utils/enums.ts";

    let username = ""
    let password = ""

    async function handleSubmit() {

        const response = await fetch(URI.BASE_URL + URI.BASE_URI + URI.SIGNUP, {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({username, password})

        })

        if (response.ok) {
            alert("Signuo success")
        } else {
            alert(`Signup failed : ${await response.json()}`)
        }

    }
</script>

<style>
    form {
        max-width: 300px;
        margin: 0 auto;
    }

    input {
        width: 100%;
        margin-bottom: 10px;
    }

    button {
        width: 100%;
    }

    h1 {
        color: crimson;
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
        <input type="text" bind:value={password}/>


    </label>
    <button type="submit">Submit</button>
</form>

