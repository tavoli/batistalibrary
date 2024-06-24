<script>
  import { page } from '$app/stores';
  import { APP } from '$lib/constants';
  import { menu, library, getBook, categories, authors } from '$lib/store'
  import { update, getBookToUpdate } from '$lib/api'
  import { NewSet } from'$lib/store';
  import { get } from 'svelte/store';

  const _book = getBook($page.params.id);
  const book = {
    ..._book,
    categories: _book.categories.map(c => c._id)
  }

  const errors = NewSet();

  function validate() {
    errors.clear();

    [
      ['isbn', book.isbn], 
      ['title', book.title], 
      ['pages', Number(book.pages) >= 0], 
      ['author', book.author._id], 
      ['date_published', book.date_published], 
      ['description', book.description],
      ['available', book.available],
      ['categories', book.categories.length],
    ].forEach(([key, isValid]) => {
      if (!isValid) {
        errors.add(key);
      }
    });

    return errors.size() === 0;
  }

  async function handleSubmit() {
    if (!validate()) {
      return;
    }

    const response = await update($page.params.id, {
      isbn: book.isbn,
      title: book.title,
      pages: book.pages,
      author: { _type: 'author', _ref: book.author._id },
      date_published: book.date_published,
      categories: book.categories.map(_ref => ({
        _type: 'reference',
        _ref,
        _key: Math.random(),
      })),
      description: book.description,
      available: book.available,
    })

    if (response.error) {
      console.error(response.error);
      return;
    }

    alert('Livro atualizado com sucesso!');
  }
</script>

<div class="mt-10 p-4">
  <h1 class="text-xl mb-4">EDITAR LIVRO</h1>

  <form on:submit|preventDefault={handleSubmit}>
    <div class="mb-4 mt-16">
      <img id="image" class="h-[200px]" src={book.imageUrl ?? APP.NO_IMAGE} />
    </div>

    <div class="mb-4">
      <label class="block mb-1 text-red-700" for="isbn">ISBN</label>
      <input 
        id="isbn" 
        type="text" 
        class="w-full p-2 border border-red-700"
        class:border-red-500={$errors.has('isbn')}
        bind:value={book.isbn} 
      />
      {#if $errors.has('isbn')}
        <div class="text-red-500 text-xs">
          Código ISBN requerido
        </div>
      {/if}
    </div>

    <div class="grid grid-cols-1 gap-4 mb-4">
      <div>
        <label class="block mb-1 text-red-700" for="title">Título</label>
        <input 
          id="title" 
          type="text" 
          class="w-full p-2 border border-red-700"
          class:border-red-500={$errors.has('title')}
          bind:value={book.title} 
        />
        {#if $errors.has('title')}
          <div class="text-red-500 text-xs">
            Título do livro requerido
          </div>
        {/if}
      </div>
    </div>

    <div class="grid grid-cols-2 gap-4 mb-4">
      <div>
        <label class="block mb-1 text-red-700" for="author">Autor</label>
        <select 
          id="author" 
          class="w-full p-2 border border-red-700" 
          class:border-red-500={$errors.has('author')}
          bind:value={book.author._id}>
          <option value="">Selecione</option>
          {#each $authors as author}
            <option value={author._id}>{author.name}</option>
          {/each}
        </select>
        {#if $errors.has('author')}
          <div class="text-red-500 text-xs">
            Selecione um autor
          </div>
        {/if}
      </div>
      <div>
        <label class="block mb-1 text-red-700" for="date_published">Data de publicação</label>
        <input 
          id="date_published" 
          type="datetime-local" 
          class="w-full p-2 border border-red-700" 
          class:border-red-500={$errors.has('date_published')}
          bind:value={book.date_published}
        />
        {#if $errors.has('date_published')}
          <div class="text-red-500 text-xs">
            Data de publicação requerida
          </div>
        {/if}
      </div>
    </div>

    <div class="grid grid-cols-1 gap-4 mb-4">
      <div>
        <label class="block mb-1 text-red-700" for="category">Categorias</label>
        <div class="flex gap-2">
          {#each $categories as category}
            <div>
              {#if book?.categories?.length > 0}
                <input 
                  class="accent-red-700" 
                  id={category._id} 
                  type="checkbox" 
                  bind:group={book.categories} 
                  value={category._id} 
                />
              {:else}
                <input 
                  class="accent-red-700" 
                  id={category._id} 
                  type="checkbox" 
                  bind:group={book.categories} 
                />
              {/if}
              <label for={category._id}>{category.name}</label> 
            </div>
          {/each}
        </div>
        {#if $errors.has('category')}
          <div class="text-red-500 text-xs">
            Selecione ao menos uma categoria
          </div>
        {/if}
      </div>
    </div>

    <div class="mb-4">
      <label class="block mb-1 text-red-700" for="description">Descrição</label>
      <textarea 
        id="description" 
        rows="5" 
        class="w-full p-2 border border-red-700" 
        class:border-red-500={$errors.has('description')}
        bind:value={book.description}
      />
      {#if $errors.has('description')}
        <div class="text-red-500 text-xs">
          Descrição do livro requerida
        </div>
      {/if}
    </div>

    <div class="grid grid-cols-2 gap-4 mb-4">
      <div>
        <label class="block mb-1 text-red-700" for="available">Livro disponível</label>
        <div>
          <input type="checkbox" id="available" bind:checked={book.available} />
          <label for="available">Sim</label>
        </div>
      </div>
      <div>
        <label class="block mb-1 text-red-700" for="isbn">Número de Páginas</label>
        <input 
          id="pages" 
          type="text" 
          class="w-full p-2 border border-red-700"
          class:border-red-500={$errors.has('pages')}
          bind:value={book.pages} 
        />
        {#if $errors.has('pages')}
          <div class="text-red-500 text-xs">
            Número de páginas requerido
          </div>
        {/if}
      </div>
    </div>

    <button type="submit" class="btn btn-primary mt-16">
      SALVAR
    </button>
  </form>
</div>
