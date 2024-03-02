<script>

    let selectedFile;
    let files = [
        {name: "test.jpg.gpg"},
        {name: "test.jpg.gpg"},
        {name: "test.jpg.gpg"},
        {name: "test.jpg.gpg"},
        {name: "test.jpg.gpg"},
        {name: "test.jpg.gpg"},
        {name: "test.jpg.gpg"}
    ]

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
</script>

<style>
    /* CSS styles for the grid container */
    .file-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); /* Adjust column width as needed */
        gap: 20px; /* Adjust gap between items as needed */
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
        margin-left: 5px;

    }

    .upload-bar{
        margin-bottom: 15px;
    }
</style>
<div>
    <div class="upload-bar">
        <label for="file-upload">To upload , choose a file:</label>
        <input type="file" id="file-upload" accept=".jpg,.png,.pdf" on:change={uploadFile} />
    </div>

    <div class="file-grid">
        {#each files as {name}}
            <div class="file-item">
                <img src="/src/lib/images/lockedfile.png" alt={name} class="file-image">
                <div>{name}</div>
                <div class="button-row">
                    <button on:click={() => downloadFile(name)}>Download</button>
                    <button on:click={() => deleteFile(name)}>Delete file</button>
                </div>

            </div>
        {/each}
    </div>
</div>
