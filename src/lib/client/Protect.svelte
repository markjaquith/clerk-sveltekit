<script lang="ts">
    import type { CheckAuthorizationWithCustomPermissions, OrganizationCustomPermissionKey, OrganizationCustomRoleKey } from '@clerk/types'
    import ClerkLoaded from './ClerkLoaded.svelte'
    import { auth } from './store.js'

    export let condition: ((has: CheckAuthorizationWithCustomPermissions) => boolean) | undefined = undefined
    export let role: OrganizationCustomRoleKey | undefined = undefined
    export let permission: OrganizationCustomPermissionKey | undefined = undefined

	const has = (params: Parameters<CheckAuthorizationWithCustomPermissions>[0]) => {
      if (!params?.permission && !params?.role)
        throw new Error('Missing parameters. The prop permission or role is required to be passed. Example usage: `has({permission: "org:posts:edit"})`')
      if (!$auth.orgId || !$auth.userId || !$auth.orgRole || !$auth.orgPermissions)
        return false

      if (params.permission)
        return $auth.orgPermissions.includes(params.permission)

      if (params.role)
        return $auth.orgRole === params.role

      return false
    }

	$: isAuthorized = () => {
	  if (!$auth.userId) return false;

      if (typeof condition === 'function') {
        return condition(has);
      }

      if (role || permission) {
        return has?.({ role, permission } as Parameters<CheckAuthorizationWithCustomPermissions>[0]);
      }

      return true
    };
</script>


<ClerkLoaded>
    {#if isAuthorized()}
        <slot />
    {:else}
        <slot name="fallback" />
    {/if}
</ClerkLoaded>
