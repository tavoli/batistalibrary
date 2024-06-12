<script>
  import { APP } from '$lib/constants'
  import { close } from '$lib/store'

  let selectedFilter = '';

  function confirm() {
    close(APP.POPUP)
  }

  function cancel() {
    close(APP.POPUP)
  }
</script>

<div class="space-y-4">
  <h2 class="text-xl font-semibold text-red-700 mb-1">Filtrar por</h2>
  <div class="grid items-center">
    <label class="col-start-1 row-start-1">
      <input type="radio" name="filter" value="teologia1" bind:group={selectedFilter} class="mr-2" />
      teologia
    </label>
    <label class="col-start-1 row-start-2">
      <input type="radio" name="filter" value="teologia2" bind:group={selectedFilter} class="mr-2" />
      teologia
    </label>
    <label class="col-start-2 row-start-1">
      <input type="radio" name="filter" value="teologia3" bind:group={selectedFilter} class="mr-2" />
      teologia
    </label>
    <label class="col-start-2 row-start-2">
      <input type="radio" name="filter" value="teologia4" bind:group={selectedFilter} class="mr-2" />
      teologia
    </label>
  </div>
  <div class="flex justify-between">
    <button class="text-gray-600" on:click={cancel}>Cancelar</button>
    <button class="text-red-700 font-semibold" on:click={confirm}>Confirmar</button>
  </div>
</div>
