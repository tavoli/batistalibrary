import { writable } from'svelte/store';

export const applicationDataLoaded = writable<boolean>(false);
