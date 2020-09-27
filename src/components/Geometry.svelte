<!--
    (c) 2020 Open AR Cloud
    This code is licensed under MIT license (see LICENSE.md for details)
-->

<script>
    import BoundingBox from './BoundingBox.svelte';
    import Coordinate from './Coordinate.svelte';

    export let data;
</script>


<details>
    <summary>{data.type}</summary>

    <Coordinate data="{data.coordinates}" />
    <BoundingBox data="{data.bbox}" />
</details>

