import client from "../client"

export async function getBooks() {
  const attrs = `
    _id,
    title,
    available,
    "imageUrl": image.asset->url,
    author-> {
      name
    }
  `;

  const query = `*[_type == "books"] { ${attrs} }`

  const result = await client.fetch(query);
  return { 
    available: result.filter((b: any) => b.available),
    unavailable : result.filter((b: any) =>!b.available)
  };
}

export async function postBook(book: any) {
  const result = client.create(book)
  return result
}

export async function updateBook(_id, book) {
  const result = client.patch(_id).set(book)
  return result
}
