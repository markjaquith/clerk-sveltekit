<script type="ts">
	import SignIn from '$lib/client/SignIn.svelte'
</script>

<div>
	<SignIn afterSignInUrl="/admin" />
</div>

<style>
	div {
		display: flex;
		justify-content: center;
		align-items: center;
		margin-top: 4rem;
	}
</style>
