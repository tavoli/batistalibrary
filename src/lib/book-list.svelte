<script>
  import Book from './book.svelte';
  import { goto } from '$app/navigation';
  import { open } from '$lib/store';
  import { APP } from '$lib/constants';

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
      author={book.author} 
      on:touch={() => handleTouch(book.id)}
      on:option={() => handleOption(book.id, book.options)}
    />
  {/each}
</ul>
