<script>
  import { fade, fly } from "svelte/transition";
  import { createEventDispatcher } from 'svelte';

  import { page } from '$app/stores';
  import { post, update } from '$lib/api'
  import { APP } from '$lib/constants'
  import { menu, library, close, borrowBook, NewSet, toast } from '$lib/stores'

  let user = '';
  let phoneNumber = '';
  let returnDate = '';

  const dispatch = createEventDispatcher();
  const errors = NewSet();

  function validate() {
    errors.clear();

    [['user', user], ['phoneNumber', phoneNumber], ['returnDate', returnDate]]
      .forEach(([key, value]) => {
        if (!value) {
          errors.add(key);
        }
      });

    return errors.size() === 0;
  }

  async function handleConfirm() {
    if (!validate()) {
      return;
    }

    const id = $menu.id;

    post({
      _type: 'borrows',
      user,
      phoneNumber,
      book: { _type: 'books', _ref: id },
      return_date: new Date(returnDate).toISOString(),
      borrow_date: new Date().toISOString(),
    })
    .then(async () => {
      await update(id, {
        available: false,
      })

      borrowBook(id);
      toast('Emprestado com sucesso!');
    })
    .catch((err) => {
      toast('Não foi possível emprestar o livro.');
      console.error(err);
    })

    toast('Iniciando empréstimo...');
    close(APP.POPUP);
    dispatch('borrowed');
  }

  function handleCancel() {
    close(APP.POPUP_BORROW);
  }
</script>

<div class="px-4 py-2 space-y-4 bg-white shadow-sm" in:fly={{ y: 100, duration: 300 }}>
  <h2 class="text-xl font-semibold text-red-700">Emprestar</h2>
  <div class="grid gap-2">
    <div class="col-span-1">
      <label for="user" class="block text-sm font-medium text-gray-700">Para quem?</label>
      <input type="text" id="user" bind:value={user} class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-red-500 focus:border-red-500 sm:text-sm" />
      {#if $errors.has('user')}
        <div class="text-red-500 text-xs">
          Precisa informar o nome para quem o livro será emprestado.
        </div>
      {/if}
    </div>
    <div class="col-span-1">
      <label for="phoneNumber" class="block text-sm font-medium text-gray-700">Número tel</label>
      <input type="tel" id="phoneNumber" bind:value={phoneNumber} class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-red-500 focus:border-red-500 sm:text-sm" />
      {#if $errors.has('phoneNumber')}
        <div class="text-red-500 text-xs">
          Precisa informar o número do telefone.
        </div>
      {/if}
    </div>
    <div class="col-span-2">
      <label for="returnDate" class="block text-sm font-medium text-gray-700">Entregar em</label>
      <input type="date" id="returnDate" bind:value={returnDate} class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-red-500 focus:border-red-500 sm:text-sm" />
      {#if $errors.has('returnDate')}
        <div class="text-red-500 text-xs">
          Precisa informar a data de devolução.
        </div>
      {/if}
    </div>
  </div>
  <div class="flex justify-between mx-auto w-6/12">
    <button class="text-gray-600" on:click={handleCancel}>Cancelar</button>
    <button class="text-red-700 font-semibold" on:click={handleConfirm}>Confirmar</button>
  </div>
</div>
