# clerk-sveltekit

## 0.3.0

### Minor Changes

- c1eaf3f: Added the three organization components
- d3d1aa6: Add a headless mode for slimmer builds that do not need Clerk components

## 0.2.0

### Minor Changes

- 2e37e7d: Fix protected route redirection

## 0.1.6

### Patch Changes

- 92e5ec8: Refreshed demo site

## 0.1.5

### Patch Changes

- 7d4973f: Allow functions (which accept an event and return boolean) to be passed to `protectedRoutes`
- 24fcbe9: Added `<SignUpButton>`, `<SignInButton>` and `<SignOutButton>` components
- 2967343: Added `<UserProfile />` component

## 0.1.4

### Patch Changes

- cf5056c: Made the OAuth flow more reliable
- 8ffa048: Added .env.example
- 9e5f800: If the server rejects your route due to not being signed in, you will not get an afterSignInUrl added to the URL so that you end up in your original location after signing in.
- cf5056c: Added support for ?redirectUrl

## 0.1.3

### Patch Changes

- c775aae: Improved documentation and tests

## 0.1.2

### Patch Changes

- ff45ec6: Remove debug code for default redirects
- 2e3e0b6: Fix the release process

## 0.1.1

### Patch Changes

- 6089dad: Scaffold the structure
- 8c02e14: Moved secret key to first argument of handleClerk()
- 98d162d: Handle afterSignInUrl and afterSignUpUrl for OAuth flows
