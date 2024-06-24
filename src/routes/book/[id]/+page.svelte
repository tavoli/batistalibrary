<script>
  import { onMount } from 'svelte';
  import { page } from '$app/stores';
  import { APP } from '$lib/constants';
  import { menu, library, getBook } from '$lib/store'
  import { update, getBookById } from '$lib/api'
  import { NewSet } from'$lib/store';
  import { get } from 'svelte/store';

  const book = getBook($page.params.id);

  function handleBack() {
    window.history.back();
  }

  function formatHumanFriendlyDate(date) {
    if (!date) return '---';
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Intl.DateTimeFormat('pt-BR', options).format(new Date(date));
  }
</script>

<div class="p-4 flex flex-col h-screen">
  <a href="#" class="text-red-700 font-bold underline" on:click|preventDefault={handleBack}>voltar</a>

  <div class="bg-red-200 mt-24 h-92">
    <div class="flex justify-center h-40 mt-4">
      <div class="w-full flex justify-center relative">
        <div class="bg-gray-50 absolute -top-20 shadow-lg">
          <img id="image" class="h-[200px]" src={book?.imageUrl ?? APP.NO_IMAGE} />
        </div>
      </div>
    </div>

    <h2 class="text-center text-red-700 font-bold text-lg">{book?.title}</h2>
    <p class="text-center text-gray-600">by {book?.author.name ?? '---'}</p>

    <div class="grid grid-cols-[1fr,1fr,1fr] my-8">


      <div class="text-center text-xs border-r border-r-red-700">
        <p class="text-gray-600">Categorias</p>
        <p class="text-red-700 font-bold flex flex-col">
          {#if book?.categories}
            {#each book.categories as category}
              <span>{category.name}</span>
            {/each}
          {:else}
            ---
          {/if}
        </p>
      </div>
      <div class="text-center text-xs border-r border-r-red-700">
        <p class="text-gray-600">Publicação</p>
        <p class="text-red-700 font-bold">{formatHumanFriendlyDate(book?.date_published)}</p>
      </div>
      <div class="text-center text-xs">
        <p class="text-gray-600">Pages</p>
        <p class="text-red-700 font-bold">{book?.pages ?? '---'}</p>
      </div>

    </div>
  </div>

  <div class="flex-1 mt-10">
    <h3 class="text-red-700 font-bold">Descrição</h3>
    <p class="text-gray-600 mt-2">{book?.description ?? '---'}</p>
  </div>

  <div class="flex items-center mt-4 gap-4 bg-red-200 -m-4 p-4">
    {#if book?.available}
      <div class="w-4 h-4 bg-green-500 rounded-full"></div>
      <p class="text-red-700 font-semibold">Disponível na estante</p>
    {:else}
      <div class="w-4 h-4 bg-red-500 rounded-full"></div>
      <p class="text-red-700 font-semibold">Não disponível na estante</p>
    {/if}
  </div>
</div>
