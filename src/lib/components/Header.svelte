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
	let menuOpen = $state(false);

	const navItems = [
		{ href: `${base}/`, label: 'Hem' },
		{ href: `${base}/pizzor`, label: 'Pizzor' },
		{ href: `${base}/aterforsaljare`, label: 'Hitta återförsäljare', centerOnSmall: true },
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

	function closeMenu() {
		menuOpen = false;
	}

	function handleWindowKeydown(event: KeyboardEvent) {
		if (event.key === 'Escape') closeMenu();
	}
</script>

<svelte:window onkeydown={handleWindowKeydown} />

<header class:menu-open={menuOpen} class="site-header">
	<div class="container header-content">
		<a href={`${base}/`} class="brand" onclick={closeMenu}>
			<span class="brand-title">DOUGH <small>&</small> BEYOND</span>
		</a>

		<button
			type="button"
			class="menu-toggle"
			aria-controls="main-navigation"
			aria-expanded={menuOpen}
			aria-label={menuOpen ? 'Stäng meny' : 'Öppna meny'}
			onclick={() => (menuOpen = !menuOpen)}
		>
			<span class="menu-icon" aria-hidden="true">
				<span></span>
				<span></span>
				<span></span>
			</span>
			<span>Meny</span>
		</button>

		<nav id="main-navigation" class:open={menuOpen} class="nav-links" aria-label="Huvudnavigation">
			{#each navItems as item}
				{@const isActive = isCurrentRoute(item.href)}
				<a
					href={item.href}
					class:active={isActive}
					class:center-on-small={item.centerOnSmall}
					aria-current={isActive ? 'page' : undefined}
					onclick={closeMenu}
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

	.menu-toggle {
		display: none;
		align-items: center;
		gap: 0.6rem;
		min-height: 44px;
		padding: 0.55rem 0 0.55rem 0.8rem;
		border: 0;
		border-left: 1px solid var(--border-subtle);
		background: transparent;
		color: var(--color-gold);
		font-family: var(--font-display);
		font-size: 0.76rem;
		font-weight: 800;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		cursor: pointer;
		transition: var(--transition);
	}

	.menu-toggle:hover,
	.menu-toggle:focus-visible {
		color: var(--color-dough);
	}

	.menu-toggle:focus-visible {
		outline: 2px solid var(--color-gold);
		outline-offset: 4px;
	}

	.menu-icon {
		position: relative;
		display: block;
		width: 1.25rem;
		height: 1rem;
	}

	.menu-icon span {
		position: absolute;
		left: 0;
		display: block;
		width: 100%;
		height: 1.5px;
		background: currentColor;
	}

	.menu-icon span:first-child {
		top: 0;
	}

	.menu-icon span:nth-child(2) {
		top: 50%;
		transform: translateY(-50%);
	}

	.menu-icon span:last-child {
		bottom: 0;
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
		.site-header {
			padding: 0.9rem 0;
		}

		.header-content {
			gap: 0.75rem;
		}

		.brand {
			min-width: 0;
		}

		.brand-title {
			font-size: clamp(0.95rem, 5vw, 1.1rem);
			letter-spacing: 0.1em;
			white-space: nowrap;
		}

		.menu-toggle {
			display: inline-flex;
			flex-shrink: 0;
		}

		.nav-links {
			position: absolute;
			top: 100%;
			right: 0;
			left: 0;
			display: flex;
			flex-direction: column;
			align-items: stretch;
			gap: 0;
			padding: 0.55rem var(--page-gutter) 1rem;
			background: rgba(15, 25, 13, 0.98);
			border-bottom: 1px solid var(--border-subtle);
			opacity: 0;
			visibility: hidden;
			pointer-events: none;
			transform: translateY(-0.5rem);
			transition: opacity 0.2s ease, transform 0.2s ease, visibility 0s linear 0.2s;
		}

		.nav-links.open {
			opacity: 1;
			visibility: visible;
			pointer-events: auto;
			transform: translateY(0);
			transition: opacity 0.2s ease, transform 0.2s ease;
		}

		.nav-links a {
			display: flex;
			align-items: center;
			min-height: 44px;
			padding: 0.65rem 0;
			border-bottom: 1px solid var(--border-subtle);
			font-size: 0.8rem;
		}

		.nav-links a.center-on-small {
			text-align: center;
		}

		.nav-links a:last-child {
			border-bottom: 0;
		}

		.nav-links a.active {
			padding-bottom: 0.65rem;
			border-bottom-color: var(--color-gold);
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.nav-links,
		.menu-toggle {
			transition: none;
		}
	}
</style>
