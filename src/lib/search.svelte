<script lang="ts">
  import { library, getBook, queryFilter } from '$lib/stores'

  interface Title {
    title: string;
    id: string;
  }

  const titles: Title[] = [];

  $library.ids.forEach(id => {
    titles.push({ title: getBook(id, 'title'), id });
  });

  const indexMap: { [key: string]: string[] } = {};

  function addToIndex(titleObj: Title): void {
    const title = titleObj.title.toLowerCase();
    const id = titleObj.id;
    for (let i = 0; i < title.length; i++) {
      for (let j = i + 1; j <= title.length; j++) {
        const substring = title.substring(i, j);
        if (!indexMap[substring]) {
          indexMap[substring] = [];
        }
        if (!indexMap[substring].includes(id)) {
          indexMap[substring].push(id);
        }
      }
    }
  }

  titles.forEach(addToIndex);

  function handleSearch(event: Event): void {
    const lowerQuery = event.target.value.toLowerCase();
    queryFilter.set({ 
      query: lowerQuery,
      ids: indexMap[lowerQuery] ?? [] 
    });
  }
</script>

<input 
  class="w-full text-xl py-3 border-0 text-red-500 placeholder:text-red-500 outline-none" 
  placeholder="Pesquisar livros" 
  type="search" 
  on:input={handleSearch}
  on:clear={handleSearch}
/>
