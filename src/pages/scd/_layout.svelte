<!--
    (c) 2020 Open AR Cloud
    This code is licensed under MIT license (see LICENSE.md for details)
-->

<!-- routify:options bundle=true -->

<style>
    a {
        color: #fff;
        margin-left: 15px;
    }

    a:last-child {
        margin-right: 15px;
    }

    a.active {
        color: #ea6237;
    }

    .inactive {
        margin-left: 15px;
    }

    nav {
        position: absolute;
        top: -40px;
        left: 0;
        width: 100vw;
    }
</style>

<script>
    import { isActive, url } from "@sveltech/routify";
    import { authStore, authenticated } from 'scd-access/authstore.js';

    const links = [
            ['/scd/', 'Home', false],
            ['/scd/admin/createservice', 'Create', false],  // TODO: change to true once login works
            ['/scd/admin/editservice', 'Edit', false],
            ['/scd/admin/importservices', 'Import', false]
        ]
</script>


<nav>
    {#each links as [path, name, needsLogin]}
        {#if $authenticated || !needsLogin}
        <a class:active={$isActive(path)} href={$url(path)}>{name}</a>
        {:else}
        <span class="inactive">{name}</span>
        {/if}
    {/each}

    {#if $authenticated}
        <a class="floatright" href="/" on:click="{authStore.logout}">Logout</a>
    {:else}
        <a class="floatright" href="/scd" on:click="{authStore.login}">Login</a>
    {/if}
</nav>

<slot/>
