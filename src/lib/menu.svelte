<script>
  import { goto } from '$app/navigation'
  import menu from './menu.json'
</script>

<div class="flex justify-around">
  {#each menu as item}
    <button class="text-brown-500 text-2xl" on:click={() => goto(item.page)}>
      {@html item.icon}
    </button>
  {/each}
</div>
