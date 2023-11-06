import type { PageServerLoad } from './$types.js'

export const load = (() => {
	return {
		secret: 'SvelteKit is awesome! Here is a random number from the server: ' + Math.random(),
	}
}) satisfies PageServerLoad
