<script>
  import Splash from '$lib/splash.svelte'
  import Bottom from '$lib/bottom.svelte'
  import Menu from '$lib/menu.svelte'
  import Popup from '$lib/popup.svelte'

  import {openedMenu, openedPopup} from '$lib/store.ts'
</script>

<Splash>
  <slot />

  <Bottom>
    {#if $openedMenu}
      <Menu />
    {:else if $openedPopup}
      <Popup />
    {/if}
  </Bottom>
</Splash>

