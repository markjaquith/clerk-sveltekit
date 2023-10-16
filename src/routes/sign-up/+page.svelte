<script lang="ts">
	import SignUp from '$lib/components/SignUp.svelte'
</script>

<div>
	<SignUp afterSignUpUrl="/admin" />
</div>

<style>
	div {
		display: flex;
		justify-content: center;
		align-items: center;
		margin-top: 4rem;
	}
</style>
