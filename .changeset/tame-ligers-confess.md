---
'clerk-sveltekit': patch
---

If the server rejects your route due to not being signed in, you will not get an afterSignInUrl added to the URL so that you end up in your original location after signing in.
