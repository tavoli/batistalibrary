<script>
  import { post } from '$lib/api'
  import { APP } from '$lib/constants';
  import { NewSet, categories as categoriesStore, authors as authorsStore } from'$lib/store';
  import { get } from 'svelte/store';

  let files = '';
  let isbn = '';
  let title = '';
  let pages = '';
  let author = '';
  let date = '';
  let description = '';
  let available = true;
  let categories = [];

  const errors = NewSet();

  function validate() {
    errors.clear();

    [
      ['isbn', isbn], 
      ['title', title], 
      ['pages', pages], 
      ['author', author], 
      ['date', date], 
      ['description', description]
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

      const response = await client.assets.upload('image', arrayBuffer, {
        filename: file.name,
      });

      if (response.error) {
        console.error('Error uploading image:', response.error);
        return null;
      } else {
        return {
          _type: 'image',
          asset: { _type: 'reference', _ref: response._id },
        };
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

    const file = files[0];
    let image = null;
    if (file) {
      image = await uploadFile(file);
    }

    const data = {
      isbn,
      title,
      pages,
      author: { _type: 'author', _ref: author },
      date_published: new Date(date).toISOString(),
      categories: categories.map(_ref => ({
        _type: 'reference',
        _ref,
        _key: Math.random(),
      })),
      description,
      image,
      available,
    };

    if (image) {
      data.image = image;
    }

    const response = await post(data);

    if (res.error) {
      console.error('Error creating book:', res.error);
      return
    }

    alert('Livro adicionado com sucesso!');
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
        bind:value={isbn} 
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
          bind:value={title} 
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
          bind:value={author}>
          <option value="">Selecione</option>
          {#each $authorsStore as author}
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
        <label class="block mb-1 text-red-700" for="date">Data de publicação</label>
        <input 
          id="date" 
          type="date" 
          class="w-full p-2 border border-red-700" 
          class:border-red-500={$errors.has('date')}
          bind:value={date}
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
          {#each $categoriesStore as category}
            <div>
              <input 
                class="accent-red-700" 
                id={category._id} 
                type="checkbox" 
                bind:group={categories} 
                value={category._id} 
              />
              <label for={category._id}>{category.name}</label> 
            </div>
          {/each}

          {#if $categoriesStore.length <= 0}
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
        bind:value={description}
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
          <input type="checkbox" id="available" bind:checked={available} />
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
          bind:value={pages} 
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
