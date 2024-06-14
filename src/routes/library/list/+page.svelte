<script>
  import Tabs from '$lib/tabs.svelte'
  import Book from '$lib/book.svelte'
  import Search from '$lib/search.svelte'
  import { APP } from '$lib/constants'
  import { open } from '$lib/store'
  import { goto } from '$app/navigation'

  export let data;

  const [t1, t2] = ['Todos', 'Livros emprestados'];

  let active = t1;

  const handleSelect = (id) => {
    active = id;
  };

  const useImage = (book) => {
    const serverImage = `${book.imageUrl}?w=200&h=200&fit=min&fm=webp`;
    const defaultImage = 'https://placehold.co/200?text=sem foto';
    return book.imageUrl ? serverImage : defaultImage;
  }
</script>

<main>
  <Tabs tabs={[t1, t2]} {active} on:select={e => handleSelect(e.detail)}>
    <Search />

    {#if active === t1}
      <div class="flex flex-col gap-4">
        <ul class="space-y-3">
          {#each data.books.available as book}
            <Book 
              imageUrl={useImage(book)} 
              title={book.title} 
              author={book.author} 
              on:touch={() => goto(APP.ROUTE_BOOK.replace('[id]', book._id))}
              on:option={() => open({
                type: APP.POPUP,
                options: [APP.OPTION_BORROW, APP.OPTION_EDIT],
                id: book._id
              })}
            />
          {/each}
        </ul>
      </div>
    {/if}

    {#if active === t2}
      <div class="flex flex-col gap-4">
        <ul class="space-y-3">
          {#each data.books.unavailable as book}
            <Book 
              imageUrl={useImage(book)} 
              title={book.title} 
              author={book.author} 
              on:touch={() => goto(APP.ROUTE_BOOK.replace('[id]', book._id))}
              on:option={() => open({
                type: APP.POPUP,
                options: [APP.OPTION_RETURN, APP.OPTION_EDIT],
                id: book._id
              })}
            />
          {/each}
        </ul>
      </div>
    {/if}
  </Tabs>
</main>
