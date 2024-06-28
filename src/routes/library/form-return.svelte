<script>
  import { fade, fly } from "svelte/transition";
  import { createEventDispatcher } from 'svelte';

  import { update } from '$lib/api'
  import { APP } from '$lib/constants'
  import { close, menu, library, returnBook, toast } from '$lib/stores'

  const dispatch = createEventDispatcher();
  const today = new Date()

  function formatHumanFriendlyDate(date) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Intl.DateTimeFormat('pt-BR', options).format(date);
  }

  const formattedDate = formatHumanFriendlyDate(today);

  async function handleConfirm() {
    const id = $menu.id;

    update(id, { available: true })
      .then(() => {
        returnBook(id)
        toast('Livro devolvido!')
      })
      .catch((error) => {
        console.error(error)
        toast('Não foi possível devolver o livro.')
      })
    
    toast('Iniciando devolução...');
    close(APP.POPUP);
    dispatch('returned');
  }

  function handleCancel() {
    close(APP.POPUP_RETURN)
  }
</script>

<div class="px-4 py-2 grid gap-3 bg-white" in:fly={{ y: 100, duration: 200 }}>
  <h2 class="text-xl font-semibold text-red-700 mb-1">Devolver</h2>

  <p>
    Você está fazendo a devolução do livro 
    <strong>{$library.borrowed[$menu.id]?.title}</strong> 
    em <i>{formattedDate}</i>. 
    Ao clicar em confirmar o livro ficará disponível novamente.
  </p>

  <div class="flex justify-between mx-auto w-6/12 mt-4">
    <button class="text-gray-600" on:click={handleCancel}>Cancelar</button>
    <button class="text-red-700 font-semibold" on:click={handleConfirm}>Confirmar</button>
  </div>
</div>
