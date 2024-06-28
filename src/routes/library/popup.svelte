<script>
  import { fly } from "svelte/transition";

  import Options from './options.svelte'
  import ReturnForm from './form-return.svelte'
  import BorrowForm from './form-borrow.svelte'
  import FilterForm from './form-filter.svelte'

  import { open, openedBorrow, openedReturn, openedFilter, openedPopup, clearFilter, queryFilter } from '$lib/stores'
  import { APP } from '$lib/constants'
</script>



<div class="flex flex-col" in:fly={{ y: 100, duration: 300 }}>
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
