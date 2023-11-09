import { writable, type Writable } from 'svelte/store'
import type Clerk from '@clerk/clerk-js'
import type ClerkHeadless from '@clerk/clerk-js/headless'

// Create a writable store for Clerk.
const clerk: Writable<Clerk | ClerkHeadless | null> = writable(null)
export default clerk
