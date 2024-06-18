<script>
  import Tabs from '$lib/tabs.svelte'
  import Book from '$lib/book.svelte'
  import Search from '$lib/search.svelte'
  import { APP } from '$lib/constants'
  import { open, library } from '$lib/store'
  import { goto } from '$app/navigation'

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
          {#each $library.ids as id}
            {#if $library.available[id]}
              <Book 
                imageUrl={useImage($library.available[id])} 
                title={$library.available[id].title} 
                author={$library.available[id].author} 
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
            {#if $library.borrowed[id]}
              <Book 
                imageUrl={useImage($library.borrowed[id])} 
                title={$library.borrowed[id].title} 
                author={$library.borrowed[id].author} 
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
