<script>
  import { createEventDispatcher } from 'svelte';

  export let tabs;
  export let active;

  const dispatch = createEventDispatcher();

  const handleSelect = (id) => {
    dispatch('select', id);
  };
</script>
<div class="flex space-x-4 sticky top-0 pb-3 mb-5 bg-white -ml-4 pl-4">
  {#each tabs as id}
    <button 
      class="py-2 border-b-4 border-transparent" 
      class:border-b-red-500={active === id}
      on:click={() => handleSelect(id)}
    >
      <span class="text-xl" class:text-red-500={active === id}>
        {id}
      </span>
    </button>
  {/each}
</div>

<div class="mb-20 grid gap-8">
  <slot />
</div>
