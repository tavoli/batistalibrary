<script>
  import { fade } from "svelte/transition";

  import { close, openedPopup } from '$lib/stores'
  import { APP } from '$lib/constants.ts'

  function handle() {
    close(APP.POPUP)
  }
</script>

{#if $openedPopup}
  <div class="fixed bg-red-700 opacity-40 h-screen w-screen inset-0 z-10" on:click={handle} in:fade />
{/if}

<div class="fixed bottom-0 left-0 right-0 z-20">
  <slot />
</div>
