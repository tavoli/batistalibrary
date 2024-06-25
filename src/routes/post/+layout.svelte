<script>
  import Splash from '$lib/splash.svelte'
  import TopNav from '$lib/top-nav.svelte'
</script>

<Splash>
  <TopNav title="Adicionar livro" />
  <slot />
</Splash>
