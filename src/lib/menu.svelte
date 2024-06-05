<script>
  import { goto } from '$app/navigation'
  import menu from './menu.json'
</script>

<div class="fixed bottom-0 left-0 right-0 bg-red-50 border-t border-t-red-500 py-4 flex justify-around">
  {#each menu as item}
    <button class="text-brown-500 text-2xl" on:click={() => goto(item.page)}>
      {@html item.icon}
    </button>
  {/each}
</div>
