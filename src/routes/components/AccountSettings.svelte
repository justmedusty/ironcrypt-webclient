<script>
    import {getToken} from "../../auth/TokenHandling.js";
    import {URI} from "../utils/enums.js";

    let newUserName = ""
    let newPassword = ""
    let confirmDelete = false

    async function updateUserName() {
        try {
            const token = getToken()
            const formData = new FormData()
            formData.append("newUser", newUserName)

            const response = await fetch(URI.BASE_URL + URI.BASE_URI + URI.CHANGE_USERNAME,
                {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                    body: formData
                })


            if (response.ok) {
                newUserName = ""
                console.log("SUCCESS")
            } else {
                const responseJSON = await response.json()
                alert(responseJSON["Response"])
            }


        } catch (error) {
            alert(error)

        }

        async function updatePassword() {
            try {
                const token = getToken()
                const formData = new FormData()
                formData.append("newPassword", newPassword)

                const response = await fetch(URI.BASE_URL + URI.BASE_URI + URI.CHANGE_PASSWORD,
                    {
                        method: "POST",
                        headers: {
                            Authorization: `Bearer ${token}`
                        },
                        body: formData
                    })


                if (response.ok) {
                    newPassword = ""
                    console.log("SUCCESS")
                } else {
                }
                const responseJSON = await response.json()
                alert(responseJSON["Response"])
            } catch (error) {
                alert(error)

            }
        }
    }
</script>

<style>

</style>

<div>
    <form>
        <label>New Username</label>
        <input bind:value={newUserName}>
    </form>
    <form>
        <label>New Password</label>
        <input bind:value={newPassword}>
    </form>
</div>