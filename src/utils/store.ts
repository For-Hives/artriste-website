import { writable } from 'svelte/store'
import type { Oeuvre } from '../interfaces/oeuvre'

// Create a writable store of Oeuvre objects
export const oeuvres = writable<Oeuvre[]>([])
