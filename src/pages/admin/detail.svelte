<!--
    (c) 2020 Open AR Cloud
    This code is licensed under MIT license (see LICENSE.md for details)
-->

<script>
    import { onMount } from 'svelte';
    import { url, route, params, goto } from '@sveltech/routify';

    import { getServiceWithId, deleteWithId } from 'ssd-access';
    import { ssr_empty } from 'ssd-access';
    import { authStore } from 'ssd-access/authstore.js';

    import Form from '../../components/Form.svelte';


    let data = ssr_empty;
    let returnPath = $route.last ? $route.last.path : '';

    onMount(() => {
        getServiceWithId($params.countryCode, $params.id)
        .then((services) => data = services)
        .catch(error => console.log(`Server access error: ${error}`))
    })

    function handleDelete() {
        // TODO: Show dialog - maybe

        authStore.getToken()
        .then(token => { deleteWithId($params.countryCode, $params.id, token)})
        .then(() => $goto(returnPath))
        .catch(error => console.error(`Failed to delete: ${error}`))
    }
</script>


<h2>
    <a href="{$url(returnPath)}"><img alt="back navigation arrow" src="/arrow_back_ios-24px.svg"/></a>
    <span>SSR record detail</span>
</h2>

<Form {data}></Form>

<button on:click={handleDelete}>Delete</button>
<button disabled>Save</button>

