<!--
    (c) 2020 Open AR Cloud
    This code is licensed under MIT license (see LICENSE.md for details)
-->

<style>
    .editorbutton {
        background-color: transparent;
        border: 0;
    }

    :global(.editoricon) {
        cursor: pointer;
        width: 20px;
        vertical-align: bottom;
    }
</style>

<script>
    import {UploadIcon, MapIcon} from 'svelte-zondicons';

    import { goto } from '@sveltech/routify';

    import Content from './Content.svelte';
    import GeoPose from './GeoPose.svelte';

    export let data;


    function openContentEditor(event) {
        event.preventDefault();

        import('../../pages/scd/admin/contenteditor/index.svelte')
            .then(() => $goto('contenteditor/'))
            .catch((error) => console.log(`Content editor not loaded: ${error}`));
    }

    function openGeoPoseEditor(event) {
        event.preventDefault();

        import('../../pages/scd/admin/geoposeeditor/index.svelte')
            .then(() => $goto('geoposeeditor/'))
            .catch((error) => console.log(`GeoPose editor not loaded: ${error}`));
    }
</script>


<fieldset>
    <legend>
        <span>Content</span>
        <button class="editorbutton" on:click={openContentEditor}><UploadIcon class="editoricon"/></button>
    </legend>

    <Content data="{data.content}"/>
</fieldset>

<fieldset>
    <legend>
        <span>GeoPose</span>
        <button class="editorbutton" on:click={openGeoPoseEditor}><MapIcon class="editoricon" /></button>
    </legend>

    <GeoPose data="{data.content.geopose}"/>
</fieldset>
