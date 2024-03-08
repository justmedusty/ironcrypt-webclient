<script>
    import {getToken} from "../../auth/TokenHandling.js";
    import {URI} from "../utils/enums.js";
    import {onMount} from "svelte";
    import toast from "svelte-french-toast";
    import Confirm from "./Confirm.svelte";

    let selectedFile;
    onMount(fetchUserFiles)
    const MAX_FILENAME_LENGTH = 20
    const maxSizeBytes = 1073741824


    class File {
        constructor(fileId, fileName, fileSizeBytes) {
            this.fileId = fileId;
            this.fileName = fileName;
            this.fileSizeBytes = fileSizeBytes;
        }
    }

    let hasPublicKey;
    let page = 1
    let chosenFile;
    let files = []
    let show = false
    let confirmed
    let fileToDeleteId
    let fileNameToDelete
    let limit = 25

    const onCancel = () => {
        show = false
        confirmed = false
        fileNameToDelete = null
        console.log('canceled')
    }

    async function downloadFile(fileId, fileName) {
        // Implement file download logic here
        try {
            const token = getToken()
            const response = await fetch(URI.BASE_URL + URI.BASE_URI + URI.FILE_DOWNLOAD + `/${fileId}`,
                {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

            if (!response.ok) {
                toast.error("Failed to download file")
            }
            const arrayBuffer = await response.arrayBuffer();
            const blob = new Blob([arrayBuffer], {type: 'application/octet-stream'});
            const blobUrl = URL.createObjectURL(blob);
            const tempAnchor = document.createElement('a');
            tempAnchor.href = blobUrl;
            tempAnchor.download = fileName + ".gpg";
            toast.success("Success!")
            tempAnchor.click();

            // Cleanup
            URL.revokeObjectURL(blobUrl);
        } catch (error) {
            console.log("An error occurred")
        }
    }

    async function deleteFile(fileId) {
        try {
            const token = getToken()
            const response = await fetch(URI.BASE_URL + URI.BASE_URI + URI.FILE_DELETE + `/${fileId}`,
                {
                    method: 'DELETE',
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
            if (response.ok) {
                show = false
                toast.success("Delete success!")
                fileNameToDelete = null
                await fetchUserFiles(page)
            }
        } catch (error) {
            toast.error(error)
        }
    }

    async function uploadFile() {
        try {
            selectedFile = chosenFile
            const token = getToken()
            const formData = new FormData()

            formData.append('file', selectedFile)
            if (selectedFile != null) {
                const response = await toast.promise(
                    fetch(URI.BASE_URL + URI.BASE_URI + URI.FILE_UPLOAD, {
                        method: 'POST',
                        headers: {
                            Authorization: `Bearer ${token}`,


                        },
                        body: formData
                    }),
                    {
                        loading: 'Uploading...',
                        success: "Success",
                        error: 'Upload Failed.'
                    }
                );

                if (response.ok) {
                    await fetchUserFiles(page)
                } else if (!response.ok) {
                    const responseData = await response.json()
                    toast.error(responseData['Response'])
                }
            } else {
                toast.error("You to make sure you both have a file selected and have a public key uploaded")
            }

        } catch (e) {
            toast.error(e)
        }


    }

    async function fetchUserFiles(page,limit) {
        files = []
        try {
            const token = getToken();
            const response = await fetch(URI.BASE_URL + URI.BASE_URI + URI.FILE_FETCH + `?page=${page}` + `&limit=${limit}`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            const responseData = await response.json();
            if (!response.ok) {
                console.log('Response data:', responseData); // Log the res
                toast(responseData['Response'])
            }


            // Find the key representing the array of files
            const filesKey = Object.keys(responseData).find(key => Array.isArray(responseData[key]));

            if (!filesKey) {
                console.log("No files found in response data");
            }

            // Extract the array of files
            const filesData = responseData[filesKey];
            // Map the files data to instances of the File class
            files = filesData.map(fileData => new File(fileData.fileId, fileData.fileName, fileData.fileSizeBytes));
            console.log('User files:', files);
        } catch (error) {
            console.error('Error fetching user files:', error);
        }
    }

    $:fetchUserFiles(page,limit)

    function truncateFileName(fileName) {
        if (fileName.length > MAX_FILENAME_LENGTH) {
            fileName = fileName.replace("\n", "")
            return fileName.slice(0, MAX_FILENAME_LENGTH) + "...";
        } else return fileName
    }


    function handleNextPage() {
        if (files.length === limit) {
            page++
            fetchUserFiles(page)
        }

    }

    function handlePreviousPage() {
        if (page > 1) {
            page--
            fetchUserFiles(page)
        }


    }

    function handleFileChange(event) {
        const file = event.target.files[0];
        if (file) {
            // Check the size of the file
            if (file.size > maxSizeBytes) { // Assuming the maximum allowed size is 10 MB
                toast.error('File size exceeds the limit (1GB)');
                chosenFile = null
            } else {
                chosenFile = file
            }
        }
    }

    function handleDeleteDialog(fileId,fileName){
        fileToDeleteId = fileId
        fileNameToDelete = fileName
        show = true
    }
</script>

<style>
    /* CSS styles for the grid container */
    .file-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); /* Adjust column width as needed */
        gap: 20px; /* Adjust gap between items as needed */
        min-width: 49vw;
        margin-bottom: 70px;
        align-items: center;
        align-content: center;
        text-align: center
    }

    /* CSS styles for individual file items */
    .file-item {
        padding: 10px;
        text-align: center;
    }

    /* CSS styles for file image */
    .file-image {
        max-width: 100%;
        height: auto;
        margin-bottom: 10px;
    }

    .button-row {
        display: flex;
        flex-direction: row;
        margin-block: 10px;
    }

    button {
        margin-left: 10px;
        background-size: inherit;
    }

    .upload-bar {
        margin-bottom: 25px;
    }

    .upload-form {
        margin-top: 25px;
        border: 5px solid rgba(255, 255, 255, 0.48); /* black border */
        padding: 5px; /* add some padding for spacing */
        border-radius: .5rem .5rem .5rem .5rem;
        background-color: rgba(255, 255, 255, 0.08);
        max-width: inherit;

    }


</style>
<Confirm bind:show on:confirm={() =>{  return deleteFile(fileToDeleteId); }} on:cancel={onCancel} title='Confirm deletion?'>
    Would you like to delete {fileNameToDelete}? This is permanent.
</Confirm>
<div>


    <div class="file-grid">
        {#each files as file}
            <div class="file-item">
                <img src="/src/lib/images/lockedfile.png" alt={file.fileName} class="file-image">
                <div style="font-weight: 500">{truncateFileName(file.fileName)}
                    <div class="button-row">
                        <button on:click={() => downloadFile(file.fileId,file.fileName)}>Download</button>
                        <button on:click={() => handleDeleteDialog(file.fileId,file.fileName)}>Delete</button>
                    </div>
                </div>
            </div>
        {/each}
    </div>
    <div style="margin-top: 70px">
        {#if page > 1}
            <button on:click={handlePreviousPage}>Previous</button>
        {/if}
            <button on:click={handleNextPage}>Next</button>
    </div>

    <form class="upload-form" on:submit|preventDefault={uploadFile}>
        <div class="upload-bar">
            <label for="file">Upload your file</label>
            <input
                    type="file"
                    id="file"
                    name="fileToUpload"
                    on:change={handleFileChange}
                    required
            />
        </div>
        <button type="submit">Upload</button>
    </form>
<div>
    <br>
    <label style="margin-top: 10px" for="page-limit">Page Limit:</label>
    <select name="page-limits" id="page-limit" bind:value={limit}>
        <option value="10">10</option>
        <option value="25">25</option>
        <option value="50">50</option>
        <option value="75">75</option>
    </select>
</div>

</div>
