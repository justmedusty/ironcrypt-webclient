<script>
    import {getToken} from "../../auth/TokenHandling.js";
    import {URI} from "../utils/enums.js";
    import {onMount} from "svelte";

    let selectedFile;
    onMount(fetchUserFiles)
    const MAX_FILENAME_LENGTH = 15

    class File {
        constructor(fileId, fileName, fileSizeBytes) {
            this.fileId = fileId;
            this.fileName = fileName;
            this.fileSizeBytes = fileSizeBytes;
        }
    }

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
                alert('Failed to download file');
            }
            const arrayBuffer = await response.arrayBuffer();
            const blob = new Blob([arrayBuffer], {type: 'application/octet-stream'});
            const blobUrl = URL.createObjectURL(blob);
            const tempAnchor = document.createElement('a');
            tempAnchor.href = blobUrl;
            tempAnchor.download = fileName + ".gpg";
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
                alert("Delete Success!")
                await fetchUserFiles(page)
            }
        } catch (error) {
            console.log(error)
        }
    }

    async function uploadFile() {
        try {

            selectedFile = chosenFile
            const token = getToken()
            const formData = new FormData()
            formData.append('file', selectedFile)

            const response = await fetch(URI.BASE_URL + URI.BASE_URI + URI.FILE_UPLOAD, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,


                },
                body: formData
            })
            if (response.ok) {
                fetchUserFiles(page)
            } else if (response.status === 400) {
                const responseData = await response.json()
                alert(responseData['Response'])
            }
        } catch (e) {
            alert("error")
        }

    }

    async function fetchUserFiles(page) {
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
                await alert(responseData['Response'])
                files = []
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
            const startIndex = fileName.length - MAX_FILENAME_LENGTH;
            return "..." + fileName.slice(startIndex);
        } else return fileName
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
        chosenFile = file;
    }
</script>

<style>
    /* CSS styles for the grid container */
    .file-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); /* Adjust column width as needed */
        gap: 20px; /* Adjust gap between items as needed */
        min-width: 40vb;
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

    .upload-bar, .upload-form {
        margin-bottom: 25px;
        margin-top: 70px;
    }


</style>
<div>


    <div class="file-grid">
        {#each files as file}
            <div class="file-item">
                <img src="/src/lib/images/lockedfile.png" alt={file.fileName} class="file-image">
                <div>{truncateFileName(file.fileName)}
                </div>
                <div class="button-row">
                    <button on:click={() => downloadFile(file.fileId,file.fileName)}>Download</button>
                    <button on:click={() => deleteFile(file.fileId)}>Delete</button>
                </div>

            </div>
        {/each}
    </div>
    <div style="margin-top: 70px">
        <button on:click={handlePreviousPage}>Previous</button>
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
</div>
