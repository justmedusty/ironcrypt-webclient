<script>
 let files = [
     {name: "test.jpg.gpg",imageUrl:"lockedfile.png" }
 ]

 function downloadFile(fileId) {
     // Implement file download logic here
     console.log(`Downloading ${fileId}`);
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
        border: 1px solid #ccc;
        padding: 10px;
        text-align: center;
    }

    /* CSS styles for file image */
    .file-image {
        max-width: 100%;
        height: auto;
        margin-bottom: 10px;
    }
</style>

<div class="file-grid">
    {#each files as { name, imageUrl: imageUrl}}
        <div class="file-item">
            <img src="/src/lib/images/{imageUrl}" alt={name} class="file-image">
            <div>{name}</div>
            <button on:click={() => downloadFile(name)}>Download</button>
        </div>
    {/each}
</div>