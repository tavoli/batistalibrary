<script>
  import { onMount, onDestroy } from 'svelte';

  onMount(() => {
    unsetScroll()

    return () => resetScroll()
  })

  function unsetScroll() {
    const body = document.querySelector('body')
    body.style.overflow = 'hidden'
  }

  function resetScroll() {
    const body = document.querySelector('body')
    body.style.overflow = 'auto'
  }
</script>

<div class="mb-20 flex flex-col gap-8 p-4">
  <slot />
</div>

<style>
  :global(body) {
    overflow: hidden;
  }

  div {
    height: calc(100vh - 48px - 64px);
    overflow-y: scroll;
  }
</style>
