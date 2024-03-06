<script>
    import {deleteToken, getToken} from "../../auth/TokenHandling.js";
    import {URI} from "../utils/enums.js";
    import toast from "svelte-french-toast";

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
                toast.error(responseJSON["Response"])
            }


        } catch (error) {
            console.log(error)

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
                toast.success("Password change successful!")
            } else if (!response.ok) {
                const responseJSON = await response.json()
                toast.error(responseJSON["Response"])
            }

        } catch (error) {
            console.log(error)

        }


    }

    async function deleteAccount() {
        try {
            if (confirmDelete) {
                const token = getToken()
                const response = await fetch(URI.BASE_URL + URI.BASE_URI + URI.DELETE_ACCOUNT,
                    {
                        method: "DELETE",
                        headers: {
                            Authorization: `Bearer ${token}`
                        },
                    })

                const responseJSON = await response.json()

                if (response.ok) {
                    toast.success(responseJSON["Response"])
                    deleteToken()
                } else {
                    toast.error(responseJSON["Response"])
                }
            } else {
                toast.error("You must check the Confirm box to delete your account")
            }

        } catch (error) {
            alert(error)

        }
    }
</script>

<style>
    form {
        margin-bottom: 50px;
    }

    .delete {
        display: inline-flex;
        align-items: center;
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
        <input type="password" bind:value={newPassword}>
        <button on:click={updatePassword}>Submit</button>
    </form>

    <div>
        <h2>Note: Account deletion removes all files associated with your account</h2>
    </div>
    <div class="delete">
        <label>Confirm</label>
        <input style="width: 20px ; height:20px; margin-right: 50px" type="checkbox" bind:checked={confirmDelete}>
        <button on:click={deleteAccount}>Delete Account</button>
    </div>

</div>