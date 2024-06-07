<script>
  import { APP } from '$lib/constants'
  import { close } from '$lib/store'

  let selectedFilter = '';

  function confirm() {

  }

  function cancel() {
    close(APP.POPUP_FILTER)
  }
</script>

<div class="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-md space-y-4">
  <h2 class="text-xl font-medium text-red-600">Filtrar por</h2>
  <div class="space-y-2">
    <label class="block">
      <input type="radio" name="filter" value="teologia1" bind:group={selectedFilter} class="mr-2" />
      teologia
    </label>
    <label class="block">
      <input type="radio" name="filter" value="teologia2" bind:group={selectedFilter} class="mr-2" />
      teologia
    </label>
    <label class="block">
      <input type="radio" name="filter" value="teologia3" bind:group={selectedFilter} class="mr-2" />
      teologia
    </label>
    <label class="block">
      <input type="radio" name="filter" value="teologia4" bind:group={selectedFilter} class="mr-2" />
      teologia
    </label>
  </div>
  <div class="flex justify-between">
    <button class="text-gray-600" on:click={cancel}>Cancelar</button>
    <button class="text-red-600" on:click={confirm}>Confirmar</button>
  </div>
</div>
