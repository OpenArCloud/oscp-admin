<!--
    (c) 2020 Open AR Cloud
    This code is licensed under MIT license (see LICENSE.md for details)
-->

<script>
    import { onMount } from 'svelte';
    import { url, route, params, goto } from '@sveltech/routify';

    import {getServiceWithId, deleteWithId, validateScr, putService} from 'scd-access';
    import { scr_empty } from 'scd-access';
    import { authStore } from 'scd-access/authstore.js';

    import Form from '../../../components/Form.svelte';
    import SCR from '../../../components/scd/SCR.svelte';

    import { CheveronLeftIcon } from 'svelte-zondicons';


    let data = scr_empty;
    let returnPath = $route.last ? $route.last.path : '/scd/admin/editservice';

    onMount(() => {
        getServiceWithId($params.topic, $params.id)
            .then((services) => data = services)
            .catch(error => console.log(`Server access error: ${error}`))
    })

    function handleDelete() {
        // TODO: Show dialog - maybe

        authStore.getToken()
            .then(token => { deleteWithId($params.topic, $params.id, token)})
            .then(() => $goto(returnPath))
            .catch(error => console.error(`Failed to delete: ${error}`))
    }

    function handleSave(event) {
        event.preventDefault();

        const dataString = JSON.stringify(data);
        validateScr(dataString)
            .then(() => authStore.getToken())
            .then(token => putService($params.topic, dataString, data.id, token))
            .then(response => {
                console.log(`Record created: ${response}`);
                $goto(returnPath);
            })
            .catch(error => {
                console.log(`New SCR not sent - ${error}`);
            });
    }
</script>


<h2>
    <a href="{$url(returnPath)}">
        <CheveronLeftIcon />
    </a>
    <span>SCR record detail</span>
</h2>

<Form {data}>
    <p slot="intro">Edit SCR record.</p>

    <div slot="form">
        <SCR bind:data/>
    </div>

    <div slot="controls">
        <button on:click={handleSave}>Save</button>
    </div>
</Form>

<button on:click={handleDelete}>Delete</button>
