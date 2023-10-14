import { redirect, type Handle } from '@sveltejs/kit';
import { verifySession } from './session.js';

export default function handleClerk({
	debug = false,
	protectedPaths = [],
	signInUrl = '/sign-in',
}: {
	debug?: boolean;
	protectedPaths?: string[];
	signInUrl?: string;
}) {
	return (async ({ event, resolve }) => {
		const sessionToken = event.cookies.get('__session');

		if (sessionToken) {
			debug && console.log('[Server Hook] Found session token in cookies.');
			try {
				const session = await verifySession(sessionToken);
				if (session) {
					debug && console.log('[Server Hook] Session verified successfully.');
					event.locals.session = session;
				} else {
					debug && console.warn('[Server Hook] Session verification returned no session.');
				}
			} catch (reason) {
				console.warn('[Server Hook] Warning during session verification:', reason);
			}
		} else {
			debug && console.log('[Server Hook] No session token found in cookies.');
		}

		if (
			!event.locals.session &&
			protectedPaths.find((path) => event.url.pathname.startsWith(path))
		) {
			debug && console.log('[Server Hook] No session found, redirecting to login screen.');
			throw redirect(302, signInUrl);
		}

		return resolve(event);
	}) satisfies Handle;
}
