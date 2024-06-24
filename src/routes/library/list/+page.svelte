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

  let tabActive = 'Todos';

  const handleSelect = (id: string) => {
    tabActive = id;
  };
</script>

<main>
  <Tabs active={tabActive} on:select={e => handleSelect(e.detail)}>
    {#if tabActive === 'Todos'}
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
