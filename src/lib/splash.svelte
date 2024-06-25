<script lang="ts">
  import {onMount} from "svelte"

  import { goto } from "$app/navigation"
  import { getLibrary, getPostOrEditDeps } from "$lib/api";
  import { library, categories, authors, applicationDataLoaded, updateLibrary, type Book } from "$lib/store"

  function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms))
  }

  onMount(async () => {
    const books = await getLibrary()
    const deps = await getPostOrEditDeps()
    
    await updateLibrary(books)
    categories.set(deps.categories)
    authors.set(deps.authors)

    await sleep(500)

    applicationDataLoaded.set(true)
  })
</script>

{#if $applicationDataLoaded}
  <slot />
{:else}
  <main class="h-screen grid items-center justify-center bg-[#fffcf7]">
    <img src="/splash.webp" alt="Library" />
  </main>
{/if}

<style>
  img {
    filter: sepia(1) hue-rotate(300deg);
  }
</style>
