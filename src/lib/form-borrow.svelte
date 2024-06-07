<script>
  import { APP } from '$lib/constants'
  import { close } from '$lib/store'

  let recipient = '';
  let phone = '';
  let deliveryDate = '';

  function confirm() {

  }

  function cancel() {
    close(APP.POPUP_BORROW);
  }
</script>

<div class="p-2 bg-white space-y-4">
  <h2 class="text-xl font-medium text-red-600">Emprestar</h2>
  <div class="space-y-2">
    <div>
      <label for="recipient" class="block text-sm font-medium text-gray-700">Para quem?</label>
      <input type="text" id="recipient" bind:value={recipient} class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-red-500 focus:border-red-500 sm:text-sm" />
    </div>
    <div>
      <label for="phone" class="block text-sm font-medium text-gray-700">Número tel</label>
      <input type="text" id="phone" bind:value={phone} class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-red-500 focus:border-red-500 sm:text-sm" />
    </div>
    <div>
      <label for="deliveryDate" class="block text-sm font-medium text-gray-700">Entregar em</label>
      <input type="date" id="deliveryDate" bind:value={deliveryDate} class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-red-500 focus:border-red-500 sm:text-sm" />
    </div>
  </div>
  <div class="flex justify-between">
    <button class="text-gray-600" on:click={cancel}>Cancelar</button>
    <button class="text-red-600" on:click={confirm}>Confirmar</button>
  </div>
</div>
