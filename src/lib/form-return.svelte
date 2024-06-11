<script>
  import { APP } from '$lib/constants'
  import { close } from '$lib/store'

  function confirm() {

  }

  function cancel() {
    close(APP.POPUP_RETURN)
  }
</script>

<div>
  <h2 class="text-xl font-semibold text-red-700 mb-1">Devolver</h2>
  <p>Você está fazendo a devolução do livro xxx em xx de xx. Ao clicar em confirmar o livro ficará disponível novamente.</p>
  <div class="flex justify-between mx-auto w-6/12 mt-4">
    <button class="text-gray-600" on:click={cancel}>Cancelar</button>
    <button class="text-red-700 font-semibold" on:click={confirm}>Confirmar</button>
  </div>
</div>
