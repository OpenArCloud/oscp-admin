<!--
  (c) 2020 Open AR Cloud, This code is licensed under MIT license (see LICENSE.md for details)
  (c) 2024 Nokia, Licensed under the MIT License, SPDX-License-Identifier: MIT
-->

<script lang="ts">
    import { onMount } from 'svelte';
    import { url, route, params, goto } from '@sveltech/routify';

    import { ssr_empty, authStore, getServiceWithId, deleteWithId, validateSsr, putService, type SSR } from '@oarc/ssd-access';

    import Form from '../../../components/Form.svelte';
    import SSRComponent from '../../../components/ssd/SSR.svelte';
    import type { MouseEventHandler } from 'svelte/elements';

    let data: SSR = ssr_empty;
    let returnPath = ($route as any).last ? `${($route as any).last.path}?${new URLSearchParams(($route as any).last.params)}` : '/ssd/admin/editservice';

    onMount(() => {
        getServiceWithId($params.countryCode, $params.id)
            .then((services) => (data = services))
            .catch((error) => console.log(`Server access error: ${error}`));
    });

    function handleDelete() {
        // TODO: Show dialog - maybe

        authStore
            .getToken()
            .then((token) => {
                deleteWithId($params.countryCode, $params.id, token || '');
            })
            .then(() => $goto(returnPath))
            .catch((error) => console.error(`Failed to delete: ${error}`));
    }

    const urlReturnPath = (): any => {
        return $url(returnPath);
    };

    const handleSave: MouseEventHandler<HTMLButtonElement> = (event) => {
        event.preventDefault();

        data.timestamp = Date.now();
        const dataString = JSON.stringify(data);
        validateSsr(dataString);
        authStore
            .getToken()
            .then((token) => putService($params.countryCode, dataString, data.id, token || ''))
            .then((response) => {
                console.log(`Record created: ${response}`);
                $goto(returnPath);
            })
            .catch((error) => {
                console.log(`New SSR not sent - ${error}`);
            });
    };
</script>

<h2>
    <a href={urlReturnPath()}><img class="backarrow" alt="back navigation arrow" src="/arrow_back_ios-24px.svg" /></a>
    <span>SSR record detail</span>
</h2>

<Form {data}>
    <p slot="intro">Edit SSR record.</p>

    <div slot="form">
        <SSRComponent bind:data />
    </div>

    <div slot="controls">
        <button on:click={handleSave}>Save</button>
    </div>
</Form>

<button on:click={handleDelete}>Delete</button>
