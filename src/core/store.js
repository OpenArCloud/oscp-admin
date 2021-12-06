import { writable, readable } from 'svelte/store';


export const oscpSsdUrl = writable('');
export const oscpScdUrl = writable('');

// SCR content references
export const contentRefs = writable([]);


// Location properties
export const countryCode = writable('');
export const h3Index = writable('');

export const geoPose = writable({});


// GeoPose Services properties
export const selectedGeoposeService = writable({
    id: null,
    isRunning: false
});


// Content Services properties
export const selectedContentService = writable({
    id: null,
    isRunning: false
})

// Map defaults
export const MIN_H3RESOLUTION = readable(0, () => () => {});
export const DEFAULT_H3RESOLUTION = readable(7, () => () => {});
export const MAX_H3RESOLUTION = readable(15, () => () => {});
export const H3RESOLUTION_AUTO = readable(-1, () => () => {});
export const DISPLAY_LATLON = readable('latlon', () => () => {});
export const DISPLAY_H3 = readable('h3', () => () => {});
