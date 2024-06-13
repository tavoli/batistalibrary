import { getBooks } from "$lib/api"

/** @type {import('./$types').PageLoad} */
export async function load() {  
  const books = await getBooks()
  return { books }
}
