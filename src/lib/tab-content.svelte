<script lang="ts">
  import { writable } from 'svelte/store';
  import Search from './search.svelte';
  import BookList from './book-list.svelte';

  export let books = [];
  export let filteredBooks = [];
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
  <BookList {books} />
{/if}
