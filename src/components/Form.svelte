<!--
    (c) 2020 Open AR Cloud
    This code is licensed under MIT license (see LICENSE.md for details)
-->

<style>
    :global(form label, form dt) {
        display: inline-block;
        width: 7rem;
        text-align: right;
        margin-right: 10px;
    }

    :global(form dd input) {
        margin-right: 10px;
    }

    :global(form label::after, form dt::after) {
        content: ":";
    }

    :global(form dd) {
        display: flex;
        justify-content: flex-start;
        flex-wrap: wrap;
    }

    :global(form dd span) {
        margin-right: 20px;
    }

    :global(form dd label) {
        width: initial;
    }

    :global(form .growable) {
        display: flex;
        align-items: baseline;
    }

    :global(form .growable input) {
        flex-grow: 2;
    }

    fieldset {
        border: 2px solid #0000;
        margin: 10px 0 10px;
    }

    :global(fieldset div) {
        margin: 20px;
    }

    :global(legend) {
        font-weight: 700;
    }

    :global(details) {
        border: 1px solid lightgray;
        margin-bottom: 15px;
        background-color: white;
    }

    :global(summary) {
        cursor: pointer;
        background: lightgray;
        padding: 15px 5px;
    }

    #roottype {
        font-weight: bold;
    }
</style>

<script>
    import Services from './Services.svelte';
    import Geometry from './Geometry.svelte';

    export let data;

    console.log(data);
</script>


<slot name="intro" />

<form>
    <fieldset>
        {#if data.id}
        <div>
            <label for="rootid">ID</label>
            <span id="rootid">{data.id}</span>
        </div>
        {/if}

        <div>
            <label for="roottype">Type</label>
            <span id="roottype">{data.type.toUpperCase()}</span>
        </div>

        {#if data.provider}
        <div>
            <label for="rootprovider">Provider</label>
            <span id="rootprovider">{data.provider}</span>
        </div>
        {/if}

        <slot name="extras" />
    </fieldset>

    <fieldset class="container">
        <legend>Services</legend>
        <Services data="{data.services}"/>
    </fieldset>

    <fieldset class="container">
        <legend>Coverage</legend>
        <Geometry data="{data.geometry}"/>
    </fieldset>

    <fieldset>
        <div>
            <label for="rootaltitude">Altitude</label>
            <input id="rootaltitude" type="number" step="0.1" bind:value="{data.altitude}"/>
        </div>

        {#if data.timestamp}
        <div>
            <label for="roottimestamp">Last edited</label>
            <span id="roottimestamp">{data.timestamp}</span>
        </div>
        {/if}
    </fieldset>

    <slot name="controls" />
</form>