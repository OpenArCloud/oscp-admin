<!--
  (c) 2020 Open AR Cloud, This code is licensed under MIT license (see LICENSE.md for details)
  (c) 2024 Nokia, Licensed under the MIT License, SPDX-License-Identifier: MIT
-->

<script lang="ts">
    import { authStore, postScrFile } from '@oarc/scd-access';
    import { oscpScdUrl } from '../../../core/store';

    import Import from '../../../components/Import.svelte';

    let topicElement: HTMLInputElement;
    const propertyMissingMessage = 'Please enter a topic';
</script>

<Import
    {authStore}
    {propertyMissingMessage}
    propertyElement={topicElement}
    postFileFunction={async ({ url, propertyValue, file, token }) => {
        if (url == null) {
            throw new Error('url is undefined!');
        }
        return postScrFile(url, propertyValue, file, token);
    }}
    url={$oscpScdUrl}
>
    <p slot="intro">
        Here it is possible to upload Spatial Content Records (SCR) by either dropping .json files onto the drop area or by selecting files from local drive. The content is validated against a json
        schema and sent to the server for the provided topic. A protocol of the process is shown below the drop area.
    </p>

    <div slot="search" id="search">
        <label for="searchtopic">Topic</label>
        <input id="searchtopic" type="text" required bind:this={topicElement} />
    </div>
</Import>
