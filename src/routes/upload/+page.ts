import { getPostDeps } from "$lib/api"

export async function load() {  
  const deps = await getPostDeps()
  return { deps }
}
