<!--
    (c) 2020 Open AR Cloud
    This code is licensed under MIT license (see LICENSE.md for details)
-->

<!--
    Intro - accessing box as a sample. Other cloud services with Javascript sdk also possible
    File list - navigation through file hierarchy
    Preview - preview 3d models
-->

<style>
    #selector {
        margin-top: 2rem;
        text-align: center;
    }

    #selector li {
        display: inline;
        width: 4rem;
        padding: 5px;
    }

    :global(#selector button[active]) {
        background-color: lightgreen;
    }

    #selector button[disabled] {
        filter: opacity(25%);
    }

    #selector img {
        width: 4rem;
    }
</style>

<script>
    let storageProvider;

    function selectBox(event) {
        event.currentTarget.setAttribute('active', 'active');

        import('../../../../components/scd/storageprovider/Box.svelte')
            .then((result) => storageProvider = result.default)
            .catch((error) => console.log(`Storage service not loaded: ${error}`));
    }
</script>


<p>
    Using pCloud here as an example for a file selector / uploader to manage online assets. Any other storage service
    with Javascript client sdk can be implemented here.
</p>

<ul id="selector">
    <li>
        <button disabled>
            <img src="/cloudserviceicons/icons8-pcloud.svg" alt="pCloud storage service icon"/>
        </button>
    </li>
    <li>
        <button disabled>
            <img src="/cloudserviceicons/icons8-adobe-creative-cloud.svg" alt="Adobe creative cloud service icon" />
        </button>
    </li>
    <li>
        <button disabled>
            <img src="/cloudserviceicons/icons8-azure-storage.svg" alt="Azure storage service icon" />
        </button>
    </li>
    <li>
        <button disabled>
            <img src="/cloudserviceicons/icons8-baidu-cloud.svg" alt="Azure storage service icon" />
        </button>
    </li>
    <li>
        <button on:click={selectBox}>
            <img src="/cloudserviceicons/icons8-box.svg" alt="Box storage service icon" />
        </button>
    </li>
    <li>
        <button disabled>
            <img src="/cloudserviceicons/icons8-google-drive.svg" alt="Google Drive storage service icon" />
        </button>
    </li>
</ul>

<svelte:component this="{storageProvider}" />