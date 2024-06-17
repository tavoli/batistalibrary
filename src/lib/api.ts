import client from "../client"

export async function getPostDeps() {
  const query = await client.fetch(`
    *[_type == "categories" || _type == "author"] { 
      _type, _id, name 
  }`)
  return { 
    categories: query.filter((q: any) => q._type === "categories"), 
    authors: query.filter((q: any) => q._type === "author") 
  }
}

export async function getLibrary(category = '') {
  const attrs = `
    _id,
    title,
    available,
    "imageUrl": image.asset->url,
    author-> {
      name
    },
    category-> {
      name
    }
  `;

  const query = category && category != 'Todos'
    ? `*[_type == "books"  && "${category}" in categories[]->name] { ${attrs} }`
    : `*[_type == "books"] { ${attrs} }`;

  const result = await client.fetch(query);

  return {
    available: result.filter((b: any) => b.available),
    borrowed: result.filter((b: any) => !b.available)
  };
}

export async function getCategories() {
  const query = await client.fetch(`
    *[_type == "categories"] { 
      name 
  }`)
  return query
}
