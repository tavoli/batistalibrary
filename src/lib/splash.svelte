<script lang="ts">
  import {onMount} from "svelte"
  import { get } from "svelte/store"

  import { page } from '$app/stores'
  import { goto } from "$app/navigation"
  import { getLibrary, getPostOrEditDeps } from "$lib/api";
  import { applicationDataLoaded, updateLibraryStore, updateCategoryStore, updateAuthorStore, type Book } from "$lib/stores"

  onMount(async () => {
    if (get(applicationDataLoaded)) {
      return
    }

    const books = await getLibrary($page.data.cookies.library)
    const deps = await getPostOrEditDeps()
    
    updateLibraryStore(books)
    updateCategoryStore(deps.categories)
    updateAuthorStore(deps.authors)

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
