<script>
  import { close, openedPopup } from '$lib/stores'
  import { APP } from '$lib/constants.ts'

  function handle() {
    close(APP.POPUP)
  }
</script>

{#if $openedPopup}
  <div class="fixed bg-red-700 opacity-40 h-screen w-screen inset-0 z-10" on:click={handle} />
{/if}

<div class="fixed bottom-0 left-0 right-0 bg-white shadow-sm shadow-red-700 py-2 z-20">
  <slot />
</div>
