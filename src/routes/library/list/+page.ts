import { getLibrary } from "$lib/api"
import { library } from "$lib/store"

export async function load() {  
  library.set(await getLibrary())
}
