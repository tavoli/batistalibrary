import { getLibrary } from "$lib/api"
import { library, type Book } from "$lib/store"

export async function load() {  
  const result = await getLibrary()
  
  const available: Record<string, Book> = {}
  const borrowed: Record<string, Book> = {}
  const ids: string[] = []

  for (const book of result) {
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
    ids,
  })
}
