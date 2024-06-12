<script>
  import Tabs from '$lib/tabs.svelte'
  import Book from '$lib/book.svelte'
  import Search from '$lib/search.svelte'
  import data from '$lib/books.json'

  const [t1, t2] = ['Todos', 'Livros emprestados'];

  let active = t1;

  const handleSelect = (id) => {
    active = id;
  };
</script>

<main>
  <Tabs tabs={[t1, t2]} {active} on:select={e => handleSelect(e.detail)}>
    <Search />

    {#if active === t1}
      <div class="flex flex-col gap-4">
        <ul class="space-y-3">
          {#each data as book}
            <Book {...book} />
          {/each}
        </ul>
      </div>
    {/if}

    {#if active === t2}
      <div>
        <h2>Livros emprestados</h2>
        <p>This is the content for Livros emprestados.</p>
      </div>
    {/if}
  </Tabs>
</main>
