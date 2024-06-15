import { createClient } from "@sanity/client";

export const ID = "fxjehb4t"
export const DATA = "production"

const client = createClient({
  projectId: ID,
  useCdn: true,
  dataset: DATA,
  apiVersion: 'v1',
  token: 'skmfIB4m1aGw4wVvoERJuVtLSRCmtzES7IVzC2cc8t5aT0t0OCp5X08xUyfardBCHOIZ3RZDgIyajNgsVdXVf9vUHEE5KZlipQERl1m9FPi4oz46WIbxRRCnAxKOB7OOWc5ypXWBwtGglMfsCbpuIeEuYMoZLjLlXKqN8viA0DmWVJYLomLs'
});

export default client;
