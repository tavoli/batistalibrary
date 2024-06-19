<script>
  import Tabs from '$lib/tabs.svelte'
  import Book from '$lib/book.svelte'
  import Search from '$lib/search.svelte'
  import { APP } from '$lib/constants'
  import { open, library, isAvailableBook, isBorrowedBook, getBook } from '$lib/store'
  import { goto } from '$app/navigation'

  const [t1, t2] = ['Todos', 'Livros emprestados'];

  let active = t1;

  const handleSelect = (id) => {
    active = id;
  };

  const getImage = (book) => {
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
          {#each $library.ids as id}
            {#if isAvailableBook(id)}
              <Book 
                imageUrl={getImage(getBook(id))} 
                title={getBook(id, 'title')} 
                author={getBook(id, 'author')} 
                on:touch={() => goto(APP.ROUTE_BOOK.replace('[id]', id))}
                on:option={() => open({
                  type: APP.POPUP,
                  options: [APP.OPTION_BORROW, APP.OPTION_EDIT],
                  id
                })}
              />
            {/if}
          {/each}
        </ul>
      </div>
    {/if}

    {#if active === t2}
      <div class="flex flex-col gap-4">
        <ul class="space-y-3">
          {#each $library.ids as id}
            {#if isBorrowedBook(id)}
              <Book 
                imageUrl={getImage(getBook(id))} 
                title={getBook(id, 'title')} 
                author={getBook(id, 'author')} 
                on:touch={() => goto(APP.ROUTE_BOOK.replace('[id]', id))}
                on:option={() => open({
                  type: APP.POPUP,
                  options: [APP.OPTION_RETURN, APP.OPTION_EDIT],
                  id
                })}
              />
            {/if}
          {/each}
        </ul>
      </div>
    {/if}
  </Tabs>
</main>
