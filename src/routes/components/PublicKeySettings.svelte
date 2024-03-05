<script>

    import {getToken} from "../../auth/TokenHandling.js";
    import {URI} from "../utils/enums.js"

    let newPublicKey;
    let currentPublicKey;

    async function uploadPublicKey() {
        try {
            const token = getToken()
            const response = await fetch(URI.BASE_URL + URI.BASE_URI + URI.UPLOAD_KEY, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(newPublicKey)
            })

            if (response.ok) {
                console.log("SUCCESS")
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
</style>

<div class="publicKeySettings">
    <h2>Submit New Public Key</h2>

    <form on:submit|preventDefault={uploadPublicKey}>
        <input type="text" bind:value={newPublicKey}/>
        <button type="submit">Submit</button>
    </form>
</div>