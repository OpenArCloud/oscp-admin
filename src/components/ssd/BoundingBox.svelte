<!--
    (c) 2020 Open AR Cloud
    This code is licensed under MIT license (see LICENSE.md for details)
-->

<style>
    .addbutton {
        background-color: transparent;
        border: 0;
    }

    .deletebutton {
        padding: 0;
        margin: 0 15px 0 -5px;
        border: 0;
        background-color: transparent;
    }
</style>

<script>
    import { AddSolidIcon, CloseSolidIcon } from 'svelte-zondicons';

    export let data;

    function addBbox(event) {
        event.preventDefault();

        if (data) {
            data = [...data, ""];
        } else {
            data = [];
        }
    }

    function deleteBbox(event, index) {
        event.preventDefault();

        data.splice(index, 1);
        data = data;
    }

    function toggleBbox(event) {
        if (event.target.checked) {
            data = [];
        } else {
            data = undefined;
        }
    }
</script>


<dl>
    <dt>
        <input type="checkbox" checked="{data !== undefined}" on:change={(event) => toggleBbox(event)} />
        <span>BBox</span>
    </dt>
    {#if data}
        <dd>
        {#each data as box, index}
            <input type="number" bind:value="{box}"/>
            <button class="deletebutton" on:click={(event) => deleteBbox(event, index)}>
                <CloseSolidIcon size="1.5rem" color="red" />
            </button>
        {/each}
        </dd>
    {/if}
</dl>

{#if data !== undefined}
    <button class="addbutton" disabled="{data === undefined}" on:click={addBbox}>
        <AddSolidIcon size="2rem" />
    </button>
{/if}