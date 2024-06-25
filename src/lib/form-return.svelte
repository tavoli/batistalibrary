<script>
  import { createEventDispatcher } from 'svelte';
  import { APP } from '$lib/constants'
  import { close, menu, library, returnBook } from '$lib/store'
  import { update } from '$lib/api'

  const dispatch = createEventDispatcher();
  const today = new Date()

  function formatHumanFriendlyDate(date) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Intl.DateTimeFormat('pt-BR', options).format(date);
  }

  const formattedDate = formatHumanFriendlyDate(today);

  async function handleConfirm() {
    try {
      await update($menu.id, { available: true })
    } catch (error) {
      console.error(error)
      return;
    }

    returnBook($menu.id)
    close(APP.POPUP)
    dispatch('returned');
    alert('Livro devolvido!')
  }

  function handleCancel() {
    close(APP.POPUP_RETURN)
  }
</script>

<div>
  <h2 class="text-xl font-semibold text-red-700 mb-1">Devolver</h2>
  <p>Você está fazendo a devolução do livro <strong>{$library.borrowed[$menu.id]?.title}</strong> em <i>{formattedDate}</i>. Ao clicar em confirmar o livro ficará disponível novamente.</p>
  <div class="flex justify-between mx-auto w-6/12 mt-4">
    <button class="text-gray-600" on:click={handleCancel}>Cancelar</button>
    <button class="text-red-700 font-semibold" on:click={handleConfirm}>Confirmar</button>
  </div>
</div>
