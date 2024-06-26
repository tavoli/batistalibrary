<script>
  import { createEventDispatcher, onMount } from 'svelte';

  import { APP } from '$lib/constants'
  import { close, library, categoryStore, updateLibraryStore } from '$lib/stores'
  import { getLibrary } from '$lib/api'

  const dispatch = createEventDispatcher();
  let selectedFilter = '';

  async function confirm() {
    const books = await getLibrary(selectedFilter)
    await updateLibraryStore(books)

    dispatch('filtered');
    close(APP.POPUP)
  }

  function cancel() {
    close(APP.POPUP)
  }
</script>

<div class="space-y-4">
  <h2 class="text-xl font-semibold text-red-700 mb-1">Filtrar por</h2>

  <div class="grid items-center">
    <label>
      <input type="radio" name="filter" value={'Todos'} bind:group={selectedFilter} class="mr-2" />
      Todos
    </label>

    {#each $categoryStore.ids as id, index}
      <label>
        <input type="radio" name="filter" value={$categoryStore.category[id].name} bind:group={selectedFilter} class="mr-2" />
        {$categoryStore.category[id].name}
      </label>
    {/each}
  </div>

  <div class="flex justify-between">
    <button class="text-gray-600" on:click={cancel}>Cancelar</button>
    <button class="text-red-700 font-semibold" on:click={confirm}>Confirmar</button>
  </div>
</div>
