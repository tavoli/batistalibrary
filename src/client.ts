import { createClient } from "@sanity/client";

export const ID = "fxjehb4t"
export const DATA = "production"

const client = createClient({
  projectId: ID,
  useCdn: true,
  dataset: DATA
});

export default client;
