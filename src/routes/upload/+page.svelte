<script>
  import client from '../../client.ts'

  let files = '';
  let isbn = '';
  let title = '';
  let author = '';
  let date = '';
  let description = '';
  let available = true;
  let categories = [];

  export let data

  async function post(data) {
    const response = await client.create({
      _type: 'books',
      ...data
    });

    if (response.error) {
      console.error('Error creating book:', response.error);
      return;
    }

    console.log('Book created:', response.document);
  }

  async function handleSubmit() {
    const file = files[0];

    try {
      const reader = new FileReader();

      reader.onloadend = async () => {
        const buffer = reader.result;
        const arrayBuffer = new Uint8Array(buffer);

        const response = await client.assets.upload('image', arrayBuffer, {
          filename: file.name
        });

        if (response.error) {
          console.error('Error uploading image:', response.error);
          return;
        }

        post({
          isbn,
          title,
          author: { _type: 'author', _ref: author },
          date_published: new Date(date).toISOString(),
          categories: categories.map(_ref => ({ 
            _type: 'reference',
            _ref, 
            _key: Math.random() 
          })),
          description,
          image: {
            type: 'image',
            asset: { _type: 'reference', _ref: response._id }
          },
          available
        })
      };

      reader.readAsArrayBuffer(file);
    } catch (error) {
      console.error('Error uploading image:', error);
    }

  };

  function handlePreview(event) {
    const src = URL.createObjectURL(this.files[0])
    document.getElementById('image').src = src
  }
</script>

<div class="mt-10 p-4">
  <h1 class="text-xl mb-4">ADICIONAR LIVRO</h1>

  <form on:submit|preventDefault={handleSubmit}>
    <label class="mb-4 mt-16 block cursor-pointer" for="imageFile">
      <div class="mb-1 text-red-700 bg-red-500 text-white inline-block p-2">Capa do livro</div>
      <input class="hidden" accept="image/png, image/jpeg" type="file" id="imageFile" on:change={handlePreview} bind:files />
      <img id="image" class="h-[200px] mt-4" src="https://placehold.co/200?text=sem capa" />
    </label>

    <div class="mb-4">
      <label class="block mb-1 text-red-700" for="isbn">ISBN</label>
      <input id="isbn" type="text" class="w-full p-2 border border-red-700" bind:value={isbn} />
    </div>

    <div class="grid grid-cols-1 gap-4 mb-4">
      <div>
        <label class="block mb-1 text-red-700" for="title">Título</label>
        <input id="title" type="text" class="w-full p-2 border border-red-700" bind:value={title} />
      </div>
    </div>

    <div class="grid grid-cols-2 gap-4 mb-4">
      <div>
        <label class="block mb-1 text-red-700" for="author">Autor</label>
        <select id="author" class="w-full p-2 border border-red-700" bind:value={author}>
          <option value="">Selecione</option>
          {#each data.deps.authors as author}
            <option value={author._id}>{author.name}</option>
          {/each}
        </select>
      </div>
      <div>
        <label class="block mb-1 text-red-700" for="date">Data de publicação</label>
        <input id="date" type="date" class="w-full p-2 border border-red-700" bind:value={date} />
      </div>
    </div>

    <div class="grid grid-cols-1 gap-4 mb-4">
      <div>
        <label class="block mb-1 text-red-700" for="category">Categorias</label>
        <div class="flex gap-2">
          {#each data.deps.categories as category}
            <div>
              <input class="accent-red-700" id={category._id} type="checkbox" bind:group={categories} value={category._id} />
              <label for={category._id}>{category.name}</label>
            </div>
          {/each}
        </div>
      </div>
    </div>

    <div class="mb-4">
      <label class="block mb-1 text-red-700" for="description">Descrição</label>
      <textarea id="description" rows="5" class="w-full p-2 border border-red-700" bind:value={description}></textarea>
    </div>

    <div class="mb-4">
      <label class="block mb-1 text-red-700" for="available">Livro disponível</label>
      <div>
        <input type="checkbox" id="available" bind:checked={available} />
        <label for="available">Sim</label>
      </div>
    </div>

    <button type="submit" class="btn btn-primary mt-16">
      SALVAR
    </button>
  </form>
</div>
