import type { PageServerLoad } from './$types.js'

export const load = (() => {
	return {
		secret: "SvelteKit is awesome! Okay. Maybe it's not a secret.",
	}
}) satisfies PageServerLoad
