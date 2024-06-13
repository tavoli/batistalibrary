import client from "../client"

export async function getBooks() {
  const books = await client.fetch(`*[_type == "books"] {
    _id,
    title,
    "imageUrl": image.asset->url,
    author-> {
      name
    }
  }`)

  return books
}

export async function postBook(book: any) {
  const result = client.create(book)
  return result
}

export async function updateBook(_id, book) {
  const result = client.patch(_id).set(book)
  return result
}
