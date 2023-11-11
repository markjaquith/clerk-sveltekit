<script lang="ts">
  import { page } from '$app/stores'

	import '@svelteness/kit-docs/client/polyfills/index.js'
  import '@svelteness/kit-docs/client/styles/normalize.css'
  import '@svelteness/kit-docs/client/styles/fonts.css'
  import '@svelteness/kit-docs/client/styles/theme.css'
  import '@svelteness/kit-docs/client/styles/vars.css'

  import { KitDocs, KitDocsLayout, type NavbarConfig, createSidebarContext } from '@svelteness/kit-docs'

	export let data
	$: ({ meta, sidebar } = data)
	
	const { activeCategory } = createSidebarContext(sidebar)

	const navbar: NavbarConfig = {
		links: [{ title: 'Documentation', slug: '/docs', match: /\/docs/ }],
	}

  $: category = $activeCategory ? `${$activeCategory}: ` : ''
  $: title = meta ? `${category}${meta.title} | KitDocs` : null
  $: description = meta?.description
</script>

<svelte:head>
  {#key $page.url.pathname}
    {#if title}
      <title>{title}</title>
    {/if}
    {#if description}
      <meta name="description" content={description} />
    {/if}
  {/key}
</svelte:head>

<KitDocs {meta}>
  <KitDocsLayout {navbar} {sidebar}>
    <slot />
		<div slot="main-bottom" class="footer">
      <a
        href="https://markjaquith.com/"
        rel="external"
        target="_blank"
      >
        Created by Mark Jaquith
      </a>
    </div>
  </KitDocsLayout>
</KitDocs>

<style>
  :global(:root) {
    --kd-color-brand: 255 64 0;
  }

  :global(:root.dark) {
    --kd-color-brand: 255 83 26;
  }

  /* .logo :global(a) {
    margin-left: 0.375rem;
    display: flex;
    align-items: center;
    padding: 0.25rem;
  }

  .logo :global(svg) {
    width: 26px;
  }

  .socials {
    display: flex;
    margin-left: -0.25rem;
  } */

  .footer {
    display: flex;
    justify-content: center;
    margin-top: -1rem;
    padding-bottom: 2.5rem;
  }

  @media screen and (min-width: 992px) {
    :global(:root) {
      --kd-sidebar-min-width: 14rem;
    }
  }
</style>
