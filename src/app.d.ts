// See https://kit.svelte.dev/docs/types#app
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
