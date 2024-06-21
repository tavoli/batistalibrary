<script lang="ts">
  import { writable } from 'svelte/store';
  import Search from './search.svelte';
  import BookList from './book-list.svelte';

  export let tabActive: string;
  export let tab1: string;
  export let tab2: string;
  export let filteredBooks = [];
  export let availableBooks = [];
  export let borrowedBooks = [];
  export let queryNotFound = false;
  export let isFiltering = false;
</script>

<Search />

<div class="flex flex-col gap-4">
  <BookList books={filteredBooks} />
</div>

{#if queryNotFound}
  <span class="text-gray-500">Nenhum resultado encontrado</span>
{/if}

{#if !isFiltering}
  {#if tabActive === tab1}
    <BookList books={availableBooks} />
  {/if}

  {#if tabActive === tab2}
    <BookList books={borrowedBooks} />
  {/if}
{/if}
