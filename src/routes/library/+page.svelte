<script lang="ts">
  import { derived } from 'svelte/store';
  import { fade, fly } from "svelte/transition";

  import Tabs from './tabs.svelte';
  import Bottom from './bottom.svelte'
  import Menu from './menu.svelte'
  import Popup from './popup.svelte';
  import Search from './search.svelte';
  import TabContent from './tab-content.svelte';
  import { APP } from '$lib/constants';
  import { goto } from '$app/navigation';
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
    filteredBooks,
    clearFilter,
    openedMenu,
    openedPopup
  } from '$lib/stores';

  let tabActive = 'Todos';

  const handleSelect = (id: string) => {
    tabActive = id;
    clearFilter();
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
  <Bottom>
    {#if $openedMenu}
      <Menu />
    {:else if $openedPopup}
      <Popup />
    {/if}
  </Bottom>
</main>
