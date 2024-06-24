<script lang="ts">
  import {onMount} from "svelte"
  import { page } from "$app/stores";

  import { goto } from "$app/navigation"
  import { getLibrary, getPostOrEditDeps } from "$lib/api";
  import { library, categories, authors, applicationDataLoaded, type Book } from "$lib/store"

  onMount(async () => {
    const books = await getLibrary()
    const deps = await getPostOrEditDeps()
    
    const available: Record<string, Book> = {}
    const borrowed: Record<string, Book> = {}
    const ids: string[] = []

    for (const book of books) {
      ids.push(book._id)
      if (book.available) {
        available[book._id] = book
      } else {
        borrowed[book._id] = book
      }
    }

    library.set({ 
      available, 
      borrowed,
      ids
    })

    categories.set(deps.categories)
    authors.set(deps.authors)
    applicationDataLoaded.set(true)

    const redirect = $page.url.searchParams.get('redirect') ?? 'library/list'
    goto(redirect)
  })
</script>

<main class="h-screen grid items-center justify-center bg-[#fffcf7]">
  <img src="/splash.webp" alt="Library" />
</main>

<style>
  img {
    filter: sepia(1) hue-rotate(300deg);
  }
</style>
