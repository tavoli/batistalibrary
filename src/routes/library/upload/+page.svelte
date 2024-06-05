<script>
  let isbn = '';
  let title = '';
  let author = '';
  let date = '';
  let category = '';
  let description = '';

  const post = () => {
    console.log({ isbn, title, author, date, category, description });
  };
</script>

<div class="mt-10 p-16">
  <h1 class="text-xl mb-4">ADICIONAR LIVRO</h1>

  <div class="mb-4 mt-16">
    <label class="block mb-1 text-red-700" for="isbn">ISBN</label>
    <input id="isbn" type="text" class="w-full p-2 border border-red-700" bind:value={isbn} />
  </div>

  <div class="grid grid-cols-2 gap-4 mb-4">
    <div>
      <label class="block mb-1 text-red-700" for="title">Title</label>
      <input id="title" type="text" class="w-full p-2 border border-red-700" bind:value={title} />
    </div>
    <div>
      <label class="block mb-1 text-red-700" for="author">Author</label>
      <input id="author" type="text" class="w-full p-2 border border-red-700" bind:value={author} />
    </div>
  </div>

  <div class="grid grid-cols-2 gap-4 mb-4">
    <div>
      <label class="block mb-1 text-red-700" for="date">Date</label>
      <input id="date" type="text" class="w-full p-2 border border-red-700" bind:value={date} />
    </div>
    <div>
      <label class="block mb-1 text-red-700" for="category">Category</label>
      <input id="category" type="text" class="w-full p-2 border border-red-700" bind:value={category} />
    </div>
  </div>

  <div class="mb-4">
    <label class="block mb-1 text-red-700" for="description">Descrição</label>
    <textarea id="description" rows="5" class="w-full p-2 border border-red-700" bind:value={description}></textarea>
  </div>

  <button class="btn btn-primary mt-16" on:click={post}>
    SALVAR
  </button>
</div>
