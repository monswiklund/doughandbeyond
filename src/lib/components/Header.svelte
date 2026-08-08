<script lang="ts">
	import { browser } from '$app/environment';
	import { page } from '$app/state';
	import { base } from '$app/paths';
	import type { StoreStatus } from '$lib/types';

	interface Props {
		storeStatus: StoreStatus | null;
		pathname: string;
	}

	let { storeStatus, pathname }: Props = $props();

	const navItems = [
		{ href: `${base}/`, label: 'Hem' },
		{ href: `${base}/pizzor`, label: 'Pizzor' },
		{ href: `${base}/aterforsaljare`, label: 'Hitta återförsäljare' },
		{ href: `${base}/degen`, label: 'Degen' }
	];

	function normalizePath(pathname: string) {
		const normalized = pathname.replace(/\/+$/, '');
		return normalized || '/';
	}

	const currentPathname = $derived(browser ? page.url.pathname : pathname);
	const currentPath = $derived(normalizePath(currentPathname));

	function resolveRoutePath(href: string, currentPathname: string) {
		const documentPath = currentPathname.endsWith('/') ? currentPathname : `${currentPathname}/`;
		return new URL(href, `https://doughandbeyond.local${documentPath}`).pathname;
	}

	function isCurrentRoute(href: string) {
		return normalizePath(resolveRoutePath(href, currentPathname)) === currentPath;
	}
</script>

<header class="site-header">
	<div class="container header-content">
		<a href={`${base}/`} class="brand">
			<span class="brand-title">DOUGH <small>&</small> BEYOND</span>
		</a>

		<nav class="nav-links" aria-label="Huvudnavigation">
			{#each navItems as item}
				{@const isActive = isCurrentRoute(item.href)}
				<a
					href={item.href}
					class:active={isActive}
					aria-current={isActive ? 'page' : undefined}
				>
					{item.label}
				</a>
			{/each}
		</nav>
	</div>
</header>

<style>
	.site-header {
		position: sticky;
		top: 0;
		z-index: 100;
		background: rgba(15, 25, 13, 0.95);
		backdrop-filter: blur(20px);
		border-bottom: 1px solid var(--border-subtle);
		padding: 1.25rem 0;
	}

	.header-content {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.brand {
		text-decoration: none;
	}

	.brand-title {
		font-family: var(--font-brand);
		font-weight: 800;
		font-size: 1.35rem;
		letter-spacing: 0.16em;
		color: var(--color-gold);
		display: block;
		line-height: 1;
	}

	.brand-title small {
		color: var(--color-basil-light);
		font-weight: 400;
	}

	.nav-links {
		display: flex;
		align-items: center;
		gap: 2.25rem;
	}

	.nav-links a {
		color: var(--color-dough-muted);
		text-decoration: none;
		font-weight: 700;
		font-size: 0.85rem;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		transition: var(--transition);
	}

	.nav-links a:hover,
	.nav-links a:focus-visible {
		color: var(--color-gold);
	}

	.nav-links a.active {
		color: var(--color-gold);
		border-bottom: 1px solid var(--color-gold);
		padding-bottom: 0.2rem;
	}

	.nav-links a:focus-visible {
		outline: 2px solid var(--color-gold);
		outline-offset: 4px;
	}

	@media (max-width: 700px) {
		.nav-links {
			gap: 1rem;
		}

		.nav-links a {
			font-size: 0.78rem;
		}
	}

	@media (max-width: 420px) {
		.header-content {
			gap: 0.75rem;
		}

		.brand-title {
			font-size: 1.1rem;
			letter-spacing: 0.12em;
		}

		.nav-links {
			gap: 0.65rem;
		}

		.nav-links a {
			font-size: 0.68rem;
		}
	}
</style>
