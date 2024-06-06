<script>
  import Bottom from '$lib/bottom.svelte'
  import Menu from '$lib/menu.svelte'
  import Popup from '$lib/popup.svelte'

  import {menu, popup} from '$lib/store.ts'
</script>

<slot />

<Bottom>
  {#if $menu}
    <Menu />
  {:else if $popup}
    <Popup />
  {:else}
      <p class="text-red-500 font-bold">
        error (neither menu nor popup is defined)
      </p>
  {/if}
</Bottom>

