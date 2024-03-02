<script>
    import {getToken} from "../../auth/TokenHandling.js";
    import {URI} from "../utils/enums.js";
    import {onMount} from "svelte";
    let selectedFile;
    onMount(fetchUserFiles)

    class File {
        constructor(fileId, ownerId, fileName, fileSizeBytes) {
            this.fileId = fileId;
            this.ownerId = ownerId;
            this.fileName = fileName;
            this.fileSizeBytes = fileSizeBytes;
        }
    }
    let files = []

    function downloadFile(fileId) {
        // Implement file download logic here
        console.log(`Downloading ${fileId}`);
    }

    function deleteFile(fileId) {
        // Implement file download logic here
        console.log(`Deleting${fileId}`);
    }

    function uploadFile(event) {

        selectedFile = event.target.files[0]

    }

    async function fetchUserFiles() {
        try {
            const token = getToken();
            const response = await fetch(URI.BASE_URL + URI.BASE_URI + URI.FILE_FETCH, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (!response.ok) {
               alert('Failed to fetch user files');
            }
            const responseData = await response.json();
            // Map the file names from the response data to instances of the File class
            files = responseData.map(fileData => new File(fileData.name));
            console.log('User files:', files);
        } catch (error) {
            console.error('Error fetching user files:', error);
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

    .upload-bar,.upload-form {
        margin-bottom: 25px;
    }
</style>
<div>

    <form class="upload-form">
        <div class="upload-bar">
            <label for="file">Upload your file</label>
            <input
                    type="file"
                    id="file"
                    name="fileToUpload"
                    required
            />
        </div>


        <button type="submit">Submit</button>

    </form>


    <div class="file-grid">
        {#each files as {name}}
            <div class="file-item">
                <img src="/src/lib/images/lockedfile.png" alt={name} class="file-image">
                <div>{name} </div>
                <div class="button-row">
                    <button on:click={() => downloadFile(name)}>Download</button>
                    <button on:click={() => deleteFile(name)}>Delete</button>
                </div>

            </div>
        {/each}
    </div>
</div>
