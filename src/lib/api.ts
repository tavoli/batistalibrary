import client from "../client"
import type { Book } from "./store";

export async function getPostOrEditDeps() {
  const query = await client.fetch(`
    *[_type == "categories" || _type == "author"] { 
      _type, _id, name 
  }`)
  return { 
    categories: query.filter((q: any) => q._type === "categories"), 
    authors: query.filter((q: any) => q._type === "author") 
  }
}

export async function getLibrary(category = ''): Promise<Book[]> {
  const attrs = `
    _id,
    title,
    available,
    "imageUrl": image.asset->url,
    author-> {
      _id,
      name
    }
  `;

  const query = category && category != 'Todos'
    ? `*[_type == "books"  && "${category}" in categories[]->name] { ${attrs} }`
    : `*[_type == "books"] { ${attrs} }`;

  const result = await client.fetch(query);
  return result;
}

export async function getBookById(id: string) {
  const response = await client.fetch(`
    *[_type == "books" && _id == "${id}"] { 
      _id,
      isbn,
      title,
      pages,
      author-> {
        _id,
        name
      },
      date_published,
      description,
      available,
      "categories": categories[]->{_id, name},
      "imageUrl": image.asset->url,
    }`)

    if (response.error) {
      console.error(response.error);
      return null;
    }

    if (response.length === 0) {
      return null;
    }

    return response[0];
}

export async function getBookToUpdate(id: string) {
  const response = await client.fetch(`
    *[_type == "books" && _id == "${id}"] { 
      _id,
      isbn,
      title,
      pages,
      author-> {
        _id,
        name
      },
      date_published,
      description,
      available,
      "categories": categories[]->_id,
      "imageUrl": image.asset->url,
    }`)

    if (response.error) {
      console.error(response.error);
      return null;
    }

    if (response.length === 0) {
      return null;
    }

    return response[0];
}

export async function getCategories() {
  const query = await client.fetch(`
    *[_type == "categories"] { 
      name 
  }`)
  return query
}

export async function post(data: any) {
  const response = await client.create(data);
  return response;
}

export async function update(id: string, data: any) {
  const response = await client.patch(id).set(data).commit();
  return response;
}
