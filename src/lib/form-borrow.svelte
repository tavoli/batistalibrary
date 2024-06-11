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

<div class="space-y-4">
  <h2 class="text-xl font-semibold text-red-700">Emprestar</h2>
  <div class="grid gap-2">
    <div class="col-span-1">
      <label for="recipient" class="block text-sm font-medium text-gray-700">Para quem?</label>
      <input type="text" id="recipient" bind:value={recipient} class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-red-500 focus:border-red-500 sm:text-sm" />
    </div>
    <div class="col-span-1">
      <label for="phone" class="block text-sm font-medium text-gray-700">Número tel</label>
      <input type="tel" id="phone" bind:value={phone} class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-red-500 focus:border-red-500 sm:text-sm" />
    </div>
    <div class="col-span-2">
      <label for="deliveryDate" class="block text-sm font-medium text-gray-700">Entregar em</label>
      <input type="date" id="deliveryDate" bind:value={deliveryDate} class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-red-500 focus:border-red-500 sm:text-sm" />
    </div>
  </div>
  <div class="flex justify-between mx-auto w-6/12">
    <button class="text-gray-600" on:click={cancel}>Cancelar</button>
    <button class="text-red-700 font-semibold" on:click={confirm}>Confirmar</button>
  </div>
</div>
