<script lang="ts">
    import type { CheckAuthorizationWithCustomPermissions, OrganizationCustomPermissionKey, OrganizationCustomRoleKey } from '@clerk/types'
    import ClerkLoaded from './ClerkLoaded.svelte'
    import { user, organization } from './store.js'

    export let condition: ((has: CheckAuthorizationWithCustomPermissions) => boolean) | undefined = undefined
    export let role: OrganizationCustomRoleKey | undefined = undefined
    export let permission: OrganizationCustomPermissionKey | undefined = undefined

	$: membership = $organization ? $user?.organizationMemberships?.find(om => om.organization.id === $organization.id) : $organization

	const has = (params: Parameters<CheckAuthorizationWithCustomPermissions>[0]) => {
      if (!params?.permission && !params?.role)
        throw new Error('Missing parameters. The prop permission or role is required to be passed. Example usage: `has({permission: "org:posts:edit"`')
      if (!$organization?.id || !$user?.id || !membership?.role || !membership?.permissions)
        return false

      if (params.permission)
        return membership.permissions.includes(params.permission)

      if (params.role)
        return membership.role === params.role

      return false
    }

	$: isAuthorized = () => {
      if (typeof condition === 'function') {
        return condition(has);
      }
      if (role || permission) {
        return has?.({ role: membership.role, permission });
      }
      return true
    };
</script>


<ClerkLoaded>
  {#if $user?.id}
    {#if isAuthorized()}
      <slot />
    {:else}
      <slot name="fallback" />
    {/if}
  {:else}
    <slot name="fallback" />
  {/if}
</ClerkLoaded>
