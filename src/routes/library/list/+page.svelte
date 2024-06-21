<script lang="ts">
  import Tabs from '$lib/tabs.svelte';
  import Search from '$lib/search.svelte';
  import TabContent from '$lib/tab-content.svelte';
  import { APP } from '$lib/constants';
  import { goto } from '$app/navigation';
  import { derived } from 'svelte/store';
  import {
    open,
    library,
    queryFilter,
    isFiltering,
    queryNotFound,
    isAvailableBook,
    isBorrowedBook,
    getBook,
    availableBooks,
    borrowedBooks,
    filteredBooks
  } from '$lib/store';

  const [tab1, tab2] = ['Todos', 'Livros emprestados'];
  let tabActive = tab1;

  const handleSelect = (id: string) => {
    tabActive = id;
  };
</script>

<main>
  <Tabs tabs={[tab1, tab2]} active={tabActive} on:select={e => handleSelect(e.detail)}>
    {#if tabActive === tab1}
      <TabContent
        books={$availableBooks}
        filteredBooks={$filteredBooks}
        queryNotFound={$queryNotFound}
        isFiltering={$isFiltering}
      />
    {:else}
      <TabContent
        books={$borrowedBooks}
        filteredBooks={$filteredBooks}
        queryNotFound={$queryNotFound}
        isFiltering={$isFiltering}
      />
    {/if}
  </Tabs>
</main>
