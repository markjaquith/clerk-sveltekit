import type { PageServerLoad } from './$types.js'

export const load = (() => {
	return {
		secret: "SvelteKit is awesome!",
	}
}) satisfies PageServerLoad
