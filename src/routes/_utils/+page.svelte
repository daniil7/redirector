<script>
    import {
        NotificationDisplay,
        notifier,
    } from "@beyonk/svelte-notifications";

    import TextInput from "$lib/components/TextInput.svelte";
    /** @type {string} **/
    let foreignURL = "";
    /** @type {string} **/
    let internalRoute = "";
    /** @type {import('./$types').PageData} */
    export let data;

    async function addLink() {
        const link = {
            internal_route: internalRoute,
            foreign_url: foreignURL,
        };
        let response = await fetch("/_utils/api/add", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(link),
        });
        response = await response.json();
        if (response.status == 201) {
            data.allLinks.push(link);
            data = data;
            notifier.success("Link added successfully");
        } else {
            notifier.danger(`Error adding a link: ${response.message}`);
        }
    }

    async function deleteLink(internal_route) {
        const link = {
            internal_route: internal_route,
        };
        let response = await fetch("/_utils/api/delete", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(link),
        });
        response = await response.json();
        if (response.status == 201) {
            data.allLinks = data.allLinks.filter(
                (link) => link.internal_route != internal_route,
            );
            notifier.success("Link deleted successfully");
        } else {
            notifier.danger(`Error deleting a link: ${response.message}`);
        }
    }
</script>

<NotificationDisplay />

<div>
    <TextInput bind:value={internalRoute} title={"Internal URL"} />
    <TextInput bind:value={foreignURL} title={"Foreign URL"} />
</div>

<button on:click={addLink}>Add</button>

<div style="padding-top: 2rem;">
    {#each data.allLinks as link}
        <div>{link.internal_route}</div>
        <div class="cut-text">{link.foreign_url}</div>
        <button
            on:click={() => {
                deleteLink(link.internal_route);
            }}>remove</button
        >
        <hr />
    {/each}
</div>

<style>
    button {
        margin-top: 0.5rem;
        margin-bottom: 0.5rem;
    }

    hr {
        margin-bottom: 1rem;
    }

    .cut-text {
        text-overflow: ellipsis;
        overflow: hidden;
        width: 90%;
        height: 1.2em;
        white-space: nowrap;
    }
</style>
