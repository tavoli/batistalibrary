import { getPostOrEditDeps } from "$lib/api"

export async function load() {  
  const deps = await getPostOrEditDeps()
  return { deps }
}
