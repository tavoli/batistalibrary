<script>
  import Options from '$lib/options.svelte'
  import ReturnForm from '$lib/form-return.svelte'
  import BorrowForm from '$lib/form-borrow.svelte'
  import FilterForm from '$lib/form-filter.svelte'

  import { open, openedBorrow, openedReturn, openedFilter, openedPopup, clearFilter } from '$lib/store'
  import { APP } from '$lib/constants'
</script>



<div class="flex flex-col px-4 py-2">
  <hr class="w-2/12 h-1 bg-red-700 border-0 self-center" />

  {#if $openedBorrow}
    <BorrowForm on:borrowed={clearFilter} />
  {:else if $openedReturn}
    <ReturnForm on:returned={clearFilter} />
  {:else if $openedFilter}
    <FilterForm on:filtered={clearFilter} />
  {:else}
    <Options />
  {/if}
</div>
