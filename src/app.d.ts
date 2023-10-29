// See https://kit.svelte.dev/docs/types#app

import type { UserResource } from "@clerk/types";

// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			session:
				| {
						userId: string
						claims: unknown
				  }
				| undefined
		}
		// interface PageData {}
		// interface Platform {}
	}
}

export {}

declare global {
  interface DocumentEventMap {
    'clerk-sveltekit:user': CustomEvent<UserResource>;
  }
}