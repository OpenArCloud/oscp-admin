<!--
    (c) 2020 Open AR Cloud
    This code is licensed under MIT license (see LICENSE.md for details)
-->

<script>
    export let data;
</script>


<dl>
    <dt>Bounding Box</dt>
    <dd>
    {#each data as box, i}
        <input type="number" bind:value="{box}"/>
    {/each}
    </dd>
</dl>
