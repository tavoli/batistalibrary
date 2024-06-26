<script>
  import { goto } from '$app/navigation';
  import { open, authorStore } from '$lib/stores';
  import { APP } from '$lib/constants';
  import Book from './book.svelte';

  export let books = [];

  const handleTouch = (id) => {
    goto(APP.ROUTE_BOOK.replace('[id]', id));
  };

  const handleOption = (id, options) => {
    open({
      type: APP.POPUP,
      options,
      id
    });
  };
</script>

<ul class="space-y-3">
  {#each books as book}
    <Book 
      imageUrl={book.imageUrl} 
      title={book.title} 
      authorName={$authorStore.author[book.author._id].name} 
      on:touch={() => handleTouch(book.id)}
      on:option={() => handleOption(book.id, book.options)}
    />
  {/each}
</ul>
