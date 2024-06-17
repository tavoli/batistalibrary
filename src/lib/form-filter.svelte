<script>
  import { onMount } from 'svelte'
  import { APP } from '$lib/constants'
  import { close, library } from '$lib/store'
  import { getLibrary, getCategories } from '$lib/api'

  let selectedFilter = '';
  let categories = [];

  async function confirm() {
    close(APP.POPUP)
    library.set(await getLibrary(selectedFilter))
  }

  function cancel() {
    close(APP.POPUP)
  }

  onMount(async () => {
    categories = [{ name: 'Todos' }, ...await getCategories()]
  })
</script>

<div class="space-y-4">
  <h2 class="text-xl font-semibold text-red-700 mb-1">Filtrar por</h2>
  <div class="grid items-center">
    {#each categories as category, index}
      <label>
        <input type="radio" name="filter" value={category.name} bind:group={selectedFilter} class="mr-2" />
        {category.name}
      </label>
    {/each}
  </div>
  <div class="flex justify-between">
    <button class="text-gray-600" on:click={cancel}>Cancelar</button>
    <button class="text-red-700 font-semibold" on:click={confirm}>Confirmar</button>
  </div>
</div>
