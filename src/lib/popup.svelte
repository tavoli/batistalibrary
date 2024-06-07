<script>
  import Options from '$lib/options.svelte'
  import ReturnForm from '$lib/form-return.svelte'
  import BorrowForm from '$lib/form-borrow.svelte'
  import FilterForm from '$lib/form-filter.svelte'

  import { open, openedBorrow, openedReturn, openedFilter } from '$lib/store'
  import { APP } from '$lib/constants'
</script>

<div class="flex justify-around flex flex-col px-4 py-2">
  <hr class="w-2/12 h-1 bg-red-700 border-0 self-center" />

  {#if $openedBorrow}
    <BorrowForm />
  {:else if $openedReturn}
    <ReturnForm />
  {:else if $openedFilter}
    <FilterForm />
  {:else}
    <Options />
  {/if}
</div>
