<script>
  import { createEventDispatcher } from 'svelte';

  import ScrollContent from './scroll-content.svelte';

  export let tabs = ['Todos', 'Livros emprestados'];
  export let active;

  const dispatch = createEventDispatcher();

  const handleSelect = (id) => {
    dispatch('select', id);
  };
</script>

<div class="flex sticky top-0 bg-white shadow-md">
  {#each tabs as id}
    <button 
      class="py-2 border-b-4 border-transparent flex-1" 
      class:border-b-red-500={active === id}
      on:click={() => handleSelect(id)}
    >
      <span class="text-xl" class:text-red-500={active === id}>
        {id}
      </span>
    </button>
  {/each}
</div>

<ScrollContent>
  <slot />
</ScrollContent>
