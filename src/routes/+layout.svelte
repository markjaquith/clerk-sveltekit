<script lang="ts">
	import UserButton from '$lib/components/UserButton.svelte'
	import { clerk } from '$lib/clerk.js'
</script>

<header>
	<h1>Clerk SvelteKit</h1>
	<div>
		<a href="/">Front Page</a>
		<span>|</span>
		<a href="/admin">Admin Panel</a>
	</div>
	<div>
		{#if $clerk?.user}
			<UserButton afterSignOutUrl="/" />
		{:else}
			<a href="/sign-in">Sign in</a> <span>|</span> <a href="/sign-up">Sign up</a>
		{/if}
	</div>
</header>

<main>
	<slot />
</main>

<style>
	:global(html, body) {
		font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu,
			Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
		margin: 0;
		padding: 0;
	}

	:global(a, a:visited) {
		color: blue;
	}

	header {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		background: #ddd;
		padding: 1rem;
	}

	main {
		padding: 1rem;
		margin: auto;
		max-width: 800px;
	}

	h1 {
		margin: 0;
		padding: 0;
	}

	header span {
		color: #aaa;
	}
</style>
