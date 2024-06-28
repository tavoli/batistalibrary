<script>
  import { createEventDispatcher, onMount } from 'svelte';

  import { APP } from '$lib/constants'
  import { close, categoryStore, queryFilter, filterBooksByCategory } from '$lib/stores'

  const dispatch = createEventDispatcher();

  const options = []
  for (const id of $categoryStore.ids) {
    options.push($categoryStore.category[id].name)
  }

  let query = options.includes($queryFilter.query) ? $queryFilter.query : ''

  async function confirm() {
    const ids = filterBooksByCategory(query)
    dispatch('filtered', { query, ids });
    close(APP.POPUP)
  }

  function cancel() {
    close(APP.POPUP)
  }
</script>

<div class="px-4 py-2 space-y-4 bg-white shadow-sm">
  <h2 class="text-xl font-semibold text-red-700 mb-1">Filtrar por</h2>

  <div class="grid items-center">
    <label>
      <input type="radio" name="filter" value={''} bind:group={query} class="mr-2" />
      <span>Todos</span>
    </label>

    {#each options as option, index}
      <label>
        <input type="radio" name="filter" value={option} bind:group={query} class="mr-2" />
        <span>{option}</span>
      </label>
    {/each}
  </div>

  <div class="flex justify-between">
    <button class="text-gray-600" on:click={cancel}>Cancelar</button>
    <button class="text-red-700 font-semibold" on:click={confirm}>Confirmar</button>
  </div>
</div>
