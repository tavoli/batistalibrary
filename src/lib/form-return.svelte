<script>
  import { APP } from '$lib/constants'
  import { close } from '$lib/store'

  function confirm() {

  }

  function cancel() {
    close(APP.POPUP_RETURN)
  }
</script>

<div class="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-md space-y-4">
  <h2 class="text-xl font-medium text-red-600">Devolver</h2>
  <p>Você está fazendo a devolução do livro xxx em xx de xx. Ao clicar em confirmar o livro ficará disponível novamente.</p>
  <div class="flex justify-between">
    <button class="text-gray-600" on:click={cancel}>Cancelar</button>
    <button class="text-red-600" on:click={confirm}>Confirmar</button>
  </div>
</div>
