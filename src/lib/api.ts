import client from "../client"

export async function getPostDeps() {
  const categories = await client.fetch(`*[_type == "categories"] { _id, name }`)
  const authors = await client.fetch(`*[_type == "author"] { _id, name }`)
  return { categories, authors }
}

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

export async function updateBookAvailability(id: string, available: boolean) {
  const result = client.patch(id).set({ available })
  return result
}

export async function updateBookTitle(id: string, title: string) {
  const result = client.patch(id).set({ title })
  return result
}

export async function updateBookAuthor(id: string, author: string) {
  const result = client.patch(id).set({ author })
  return result
}

export async function updateBookDescription(id: string, description: string) {
  const result = client.patch(id).set({ description })
  return result
}
