<script lang="ts">
  import Tabs from '$lib/tabs.svelte';
  import Search from '$lib/search.svelte';
  import TabContent from '$lib/tab-content.svelte';
  import { APP } from '$lib/constants';
  import { goto } from '$app/navigation';
  import { derived } from 'svelte/store';
  import { 
    open, 
    library, 
    queryFilter, 
    isFiltering, 
    queryNotFound, 
    isAvailableBook, 
    isBorrowedBook, 
    getBook 
  } from '$lib/store';

  const [t1, t2] = ['Todos', 'Livros emprestados'];
  let active = t1;

  const handleSelect = (id: string) => {
    active = id;
  };

  const getImage = (book) => {
    const defaultImage = 'https://placehold.co/200?text=sem foto';
    return book?.imageUrl ? `${book.imageUrl}?w=200&h=200&fit=min&fm=webp` : defaultImage;
  };

  function renderBookList(
    bookIds: string[], 
    conditionFn: (id: string) => boolean, 
    optionsFn: (id: string) => string[]
  ) {
    return bookIds
      .filter(conditionFn)
      .map(id => ({
        id,
        imageUrl: getImage(getBook(id)),
        title: getBook(id, 'title'),
        author: getBook(id, 'author'),
        options: optionsFn(id)
      }));
  }

  function getOptions(id: string) {
    return isAvailableBook(id) 
      ? [APP.OPTION_BORROW, APP.OPTION_EDIT] 
      : [APP.OPTION_RETURN, APP.OPTION_EDIT];
  }

  const filteredBooks = derived(
    [queryFilter, isFiltering],
    ([$queryFilter, $isFiltering]) => {
      if ($isFiltering) {
        return renderBookList($queryFilter.ids, () => true, getOptions);
      } else {
        return [];
      }
    }
  );

  const availableBooks = derived(library, $library => {
    return renderBookList(
      $library.ids, 
      isAvailableBook, 
      () => [APP.OPTION_BORROW, APP.OPTION_EDIT]
    );
  });

  const borrowedBooks = derived(library, $library => {
    return renderBookList(
      $library.ids, 
      isBorrowedBook, 
      () => [APP.OPTION_RETURN, APP.OPTION_EDIT]
    );
  });
</script>

<main>
  <Tabs tabs={[t1, t2]} {active} on:select={e => handleSelect(e.detail)}>
    <TabContent 
      tabActive={active} 
      tab1={t1} 
      tab2={t2}
      filteredBooks={$filteredBooks} 
      availableBooks={$availableBooks} 
      borrowedBooks={$borrowedBooks} 
      queryNotFound={$queryNotFound} 
      isFiltering={$isFiltering} 
    />
  </Tabs>
</main>
