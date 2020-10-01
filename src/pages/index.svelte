<!--
    (c) 2020 Open AR Cloud
    This code is licensed under MIT license (see LICENSE.md for details)
-->

<script>
    import { goto } from '@sveltech/routify';

    function loadSsd() {
        import('./ssd/index.svelte')
            .then(() => $goto('/ssd'))
            .catch((error) => console.log(`ssd not loaded: ${error}`));
    }

    function loadScd() {
        import('./scd/index.svelte')
            .then(() => $goto('/scd'))
            .catch((error) => console.log(`scd not loaded: ${error}`));
    }
</script>


<h2>Welcome</h2>

<p>Sample admin app for the services offered by Open Spatial Computing Platform of Open AR Cloud. The idea is to offer
main functionality available as standard web components, to make it as easy as possible to integrate access to the
services into existing cms already in use by companies.</p>

<button on:click={loadSsd}>Start SSD admin</button>
<button on:click={loadScd}>Start SCD admin</button>