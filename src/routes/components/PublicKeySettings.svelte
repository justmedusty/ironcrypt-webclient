<script>

    import {getToken} from "../../auth/TokenHandling.js";
    import {URI} from "../utils/enums.js"
    import {onMount} from "svelte";

    onMount(fetchPublicKey)

    let publicKey;
    let currentPublicKey

    async function uploadPublicKey() {

        try {
            const token = getToken()
            const formData = new FormData()
            formData.append("publicKey",publicKey)

            const response = await fetch(URI.BASE_URL + URI.BASE_URI + URI.UPLOAD_KEY, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: formData
            })

            if (response.ok) {
                console.log("SUCCESS")
                publicKey = ""
                await fetchPublicKey()
            } else {
                console.log("Failure")
            }
        } catch (error) {
            alert("error")
        }

    }

    async function fetchPublicKey() {
        try {
            const token = getToken()
            const response = await fetch(URI.BASE_URL + URI.BASE_URI + URI.GET_KEY, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })

            if (response.ok) {
                console.log("SUCCESS")
                const responseJson = await response.json()
                currentPublicKey = responseJson["Response"]
            }
            else {
                currentPublicKey = "Cannot load public key, you must have a public key uploaded to use this service."
            }
        } catch (error) {
            console.log(error)
        }

    }


</script>

<style>
    .publicKeySettings {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .newKeyForm{
        display: flex;
        flex-direction: column;

    }
    input {

        width: 500px;
        height: 300px;
        margin-bottom: 15px;

    }
    .currentPublicKey{
        margin-top: 50px;
    }
</style>

<div class="publicKeySettings">
    <h2>Submit New Public Key</h2>

    <form class="newKeyForm" on:submit|preventDefault={uploadPublicKey}>
        <textarea bind:value={publicKey} rows="8" cols="80" id="TITLE"></textarea>

        <button type="submit">Submit</button>
    </form>
</div>
<div class="currentPublicKey">

    <h1>Your Current Public Key:</h1>
    <label>{currentPublicKey}</label>

</div>