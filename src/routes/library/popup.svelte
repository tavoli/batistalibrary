<script>
  import Options from './options.svelte'
  import ReturnForm from './form-return.svelte'
  import BorrowForm from './form-borrow.svelte'
  import FilterForm from './form-filter.svelte'

  import { open, openedBorrow, openedReturn, openedFilter, openedPopup, clearFilter, queryFilter } from '$lib/stores'
  import { APP } from '$lib/constants'
</script>



<div class="flex flex-col px-4 py-2">
  <hr class="w-2/12 h-1 bg-red-700 border-0 self-center" />

  {#if $openedBorrow}
    <BorrowForm on:borrowed={clearFilter} />
  {:else if $openedReturn}
    <ReturnForm on:returned={clearFilter} />
  {:else if $openedFilter}
    <FilterForm on:filtered={({ detail }) => queryFilter.set(detail)} />
  {:else}
    <Options />
  {/if}
</div>
