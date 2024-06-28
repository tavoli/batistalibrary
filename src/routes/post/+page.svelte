<script>
  import { get } from 'svelte/store';

  import { post, api } from '$lib/api'
  import { APP } from '$lib/constants';
  import { NewSet, categoryStore, authorStore, addBookStore, updateBookStore, toast } from '$lib/stores';

  export let data

  let files = null;
  const book = {
    isbn: null,
    title: null,
    pages: null,
    author: {
      _id: null
    },
    date_published: null,
    description: null,
    available: true,
    categories: [],
    imageUrl: null,
    library: data.library,
  };

  const errors = NewSet();

  function validate() {
    errors.clear();

    [
      ['isbn', book.isbn], 
      ['title', book.title], 
      ['pages', parseInt(book.pages) > 0], 
      ['author', book.author._id], 
      ['date_published', book.date_published], 
      ['description', book.description],
      ['available', typeof book.available === 'boolean'],
    ].forEach(([key, value]) => {
      if (!value) {
        errors.add(key);
      }
    });

    return errors.size() === 0;
  }

  async function uploadFile(file) {
    const readFileAsArrayBuffer = (file) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onloadend = () => {
          if (reader.error) {
            reject(reader.error);
          } else {
            resolve(reader.result);
          }
        };

        reader.readAsArrayBuffer(file);
      });
    };

    try {
      const buffer = await readFileAsArrayBuffer(file);
      const arrayBuffer = new Uint8Array(buffer);

      const response = await api.assets.upload('image', arrayBuffer, {
        filename: file.name,
      });

      if (response.error) {
        console.error('Error uploading image:', response.error);
        return null;
      } else {
        return {
          url: response.url,
          image: {
            _type: 'image',
            asset: { _type: 'reference', _ref: response._id },
          },
        }
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      return null;
    }
  }

  async function handleSubmit() {
    if (!validate()) {
      return;
    }

    const newBook = {
      _type: 'books',
      _id: book.isbn,
      isbn: book.isbn,
      title: book.title,
      pages: parseInt(book.pages),
      author: { _type: 'author', _ref: book.author._id },
      date_published: new Date(book.date_published).toISOString(),
      categories: book.categories.map(_ref => ({
        _type:'reference',
        _ref,
        _key: Math.random(),
      })),
      description: book.description,
      available: book.available,
      library: book.library,
    }

    book._id = book.isbn;

    if (files?.length) {
      uploadFile(files[0])
        .then(res => {
          newBook.image = res.image;
          updateBookStore({ ...book, imageUrl: res.url });
          postBook(newBook);
        })
        .catch(err => {
          console.error('Error uploading image:', err);
          postBook(newBook);
        });
    } else {
      postBook(newBook);
    }

    toast('Salvando o novo livro...');
    addBookStore(book);
  }

  function postBook(newBook) {
    post(newBook)
      .then(() => toast('Novo livro adicionado com sucesso.'))
      .catch(err => {
        console.error('Error creating book:', err);
        toast('Ocorreu um erro ao tentar salvar o livro.');
      })
  }

  function handlePreview(event) {
    const src = URL.createObjectURL(this.files[0])
    document.getElementById('image').src = src
  }
</script>

<div class="p-4">
  <form on:submit|preventDefault={handleSubmit}>
    <label class="mb-4 block cursor-pointer" for="imageFile">
      <div class="mb-1 text-red-700 bg-red-500 text-white inline-block p-2">Capa do livro</div>
      <input 
        class="hidden"
        accept="image/png, image/jpeg" 
        type="file" 
        id="imageFile" 
        on:change={handlePreview} 
        bind:files 
      />
      <img id="image" class="h-[200px] mt-4" src={APP.NO_IMAGE} />
    </label>

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
          {#each $authorStore.ids as id}
            <option value={$authorStore.author[id]._id}>{$authorStore.author[id].name}</option>
          {/each}
        </select>
        {#if $errors.has('author')}
          <div class="text-red-500 text-xs">
            Selecione um autor
          </div>
        {/if}
      </div>
      <div>
        <label class="block mb-1 text-red-700" for="date">Data de publicação</label>
        <input 
          id="date" 
          type="date" 
          class="w-full p-2 border border-red-700" 
          class:border-red-500={$errors.has('date')}
          bind:value={book.date_published}
        />
        {#if $errors.has('date')}
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
          {#each $categoryStore.ids as id}
            <div>
              <input 
                class="accent-red-700" 
                id={$categoryStore.category[id].name} 
                type="checkbox" 
                bind:group={book.categories} 
                value={$categoryStore.category[id]._id} 
              />
              <label for={$categoryStore.category[id].name}>
                {$categoryStore.category[id].name}
              </label> 
            </div>
          {/each}

          {#if $categoryStore.ids.length <= 0}
            <span class="text-red-700 text-sm">--</span>
          {/if}
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
          <input type="radio" id="available" bind:group={book.available} value={true} />
          <label for="available">Sim</label>
        </div>
        <div>
          <input type="radio" id="unavailable" bind:group={book.available} value={false} />
          <label for="unavailable" class="text-red-800">Não</label>
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
