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

    async function deleteAccount() {
        try {
            if(confirmDelete){
                const token = getToken()
                const response = await fetch(URI.BASE_URL + URI.BASE_URI + URI.DELETE_ACCOUNT,
                    {
                        method: "DELETE",
                        headers: {
                            Authorization: `Bearer ${token}`
                        },
                    })


                if (response.ok) {
                    newPassword = ""
                    console.log("SUCCESS")
                } else {
                }
                const responseJSON = await response.json()
                alert(responseJSON["Response"])
            }

        } catch (error) {
            alert(error)

        }
    }
</script>

<style>
    form{
        margin-bottom: 50px;
    }
</style>

<div>
    <form>
        <label>New Username</label>
        <input bind:value={newUserName}>
        <button on:click={updateUserName}>Submit</button>
    </form>
    <form>
        <label>New Password</label>
        <input bind:value={newPassword}>
        <button on:click={updatePassword}>Submit</button>
    </form>

    <div>
        <input style="width: 20px ; height:20px" type="checkbox" bind:value={confirmDelete}>
        <button >Delete Account</button>
    </div>

</div>