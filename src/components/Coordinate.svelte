<!--
    (c) 2020 Open AR Cloud
    This code is licensed under MIT license (see LICENSE.md for details)
-->

<script>
    export let data;
</script>


<dl>
    <dt>Coordinates</dt>
    {#each data[0] as coordinate}
        <dd>
            <span>
                <label for="coordlon1">Lat</label>
                <input id="coordlon1" type="number" step="any" required bind:value="{coordinate[1]}"/>
            </span>
            <span>
                <label for="coordlat1">Lon</label>
                <input id="coordlat1" type="number" step="any" required bind:value="{coordinate[0]}"/>
            </span>
        </dd>
    {/each}
</dl>
