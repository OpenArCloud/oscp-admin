/*
  (c) 2020 Open AR Cloud, This code is licensed under MIT license (see LICENSE.md for details)
  (c) 2024 Nokia, Licensed under the MIT License, SPDX-License-Identifier: MIT
*/

import { scr_empty, type Geopose, type Ref, type SCR, type SCRnoId } from '@oarc/scd-access';
import type { H3IndexInput } from 'h3-js';
import { writable, readable } from 'svelte/store';

export const oscpSsdUrl = writable('');
export const oscpScdUrl = writable('');

// SCR content references
export const contentRefs = writable<Ref[]>([]);

// Location properties
export const countryCode = writable('');
export const h3Index = writable('');

export const geoPose = writable<(Geopose & { h3?: H3IndexInput }) | undefined>(undefined);
export const newContentToCreate = writable<SCRnoId>(scr_empty);
export const topicName = writable<string>('');

// GeoPose Services properties
export const selectedGeoposeService = writable({
    id: null,
    isRunning: false,
});

// Content Services properties
export const selectedContentService = writable({
    id: null,
    isRunning: false,
});

// Map defaults
export const MIN_H3RESOLUTION = readable(0, () => () => {});
export const DEFAULT_H3RESOLUTION = readable(7, () => () => {});
export const MAX_H3RESOLUTION = readable(15, () => () => {});
export const H3RESOLUTION_AUTO = readable(-1, () => () => {});
export const DISPLAY_LATLON = readable('latlon', () => () => {});
export const DISPLAY_H3 = readable('h3', () => () => {});
