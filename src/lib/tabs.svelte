<script>
  import { createEventDispatcher } from 'svelte';

  export let tabs;
  export let active;

  const dispatch = createEventDispatcher();

  const handleSelect = (id) => {
    dispatch('select', id);
  };
</script>

<div class="flex space-x-4">
  {#each tabs as id}
    <button 
      class="py-2 border-b-2 border-transparent" 
      class:border-b-red-500={active === id}
      on:click={() => handleSelect(id)}
    >
      {id}
    </button>
  {/each}
</div>

<div class="mt-4">
  <slot />
</div>
