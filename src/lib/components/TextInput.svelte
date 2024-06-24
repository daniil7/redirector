
<script>

/** @type {string} **/
export let value = "";
/** @type {string|null} **/
export let title = null;

</script>

{#if title}
<span>{title}</span>
{/if}
<input type="text" bind:value={value}>

<style>

input {
    padding-left: 1rem;
    padding-right: 1rem;
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
    border: 1px solid #707070;
    background-color: #e0e0e0;
    width: 100%;
    box-sizing: border-box;
}

input:focus {
    border-color: #505050;
}

</style>
