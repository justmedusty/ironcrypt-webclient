<script>
    import {getToken} from "../../auth/TokenHandling.js";
    import {URI} from "../utils/enums.js";
    import {onMount} from "svelte";
    import toast from "svelte-french-toast";

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
                toast.success("Delete success!")
                await fetchUserFiles(page)
            }
        } catch (error) {
            toast.error(error)
        }
    }

    async function uploadFile() {
        await fetchPublicKey()

        if (!hasPublicKey) {
            toast.error("You cannot upload any files until you have a public key uploaded")
        } else {
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
                    } else if (response.status === 400) {
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


    }

    async function fetchUserFiles(page) {
        files = []
        try {
            const token = getToken();
            const response = await fetch(URI.BASE_URL + URI.BASE_URI + URI.FILE_FETCH + `?page=${page}`, {
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

    function truncateFileName(fileName) {
        if (fileName.length > MAX_FILENAME_LENGTH) {
            fileName = fileName.replace("\n" ,"")
            return  fileName.slice(0, MAX_FILENAME_LENGTH) +"..." ;
        } else return fileName
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

            if (!response.ok) {
                return;
            }
            const responseData = await response.json()
            const keyValue = responseData["Response"]
            hasPublicKey = keyValue !== "null";
        } catch (error) {
            console.log(error)
        }

    }


    function handleNextPage() {
        if (files.length === 25) {
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
</script>

<style>
    /* CSS styles for the grid container */
    .file-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); /* Adjust column width as needed */
        gap: 20px; /* Adjust gap between items as needed */
        min-width: 40vb;
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
        margin-block: 5px;
    }

    button {
        margin-left: 10px;


    }

    .upload-bar {
        margin-bottom: 25px;
    }

    .upload-form {
        margin-top: 25px;
        border: 1px solid rgba(255, 255, 255, 0.64); /* black border */
        padding: 5px; /* add some padding for spacing */

    }


</style>
<div>


    <div class="file-grid">
        {#each files as file}
            <div class="file-item">
                <img src="/src/lib/images/lockedfile.png" alt={file.fileName} class="file-image">
                <div style="font-size: medium">{truncateFileName(file.fileName)}
                </div>
                <div class="button-row">
                    <button on:click={() => downloadFile(file.fileId,file.fileName)}>Download</button>
                    <button on:click={() => deleteFile(file.fileId)}>Delete</button>
                </div>

            </div>
        {/each}
    </div>
    <div style="margin-top: 70px">
        {#if page > 1}
            <button on:click={handlePreviousPage}>Previous</button>
        {/if}
        {#if files.length === 25}
            <button on:click={handleNextPage}>Next</button>
        {/if}
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
</div>
