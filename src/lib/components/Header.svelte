<script lang="ts">
	import { base } from '$app/paths';
	import type { StoreStatus } from '$lib/types';

	interface Props {
		storeStatus: StoreStatus | null;
	}

	let { storeStatus }: Props = $props();
</script>

<header class="site-header">
	<div class="container header-content">
		<a href={`${base}/`} class="brand">
			<span class="brand-title">DOUGH <small>&</small> BEYOND</span>
		</a>

		<nav class="nav-links">
			<a href={`${base}/`}>Hem</a>
			<a href={`${base}/pizzor`}>Pizzor & Meny</a>
			<a href={`${base}/aterforsaljare`} class="highlight-link">Hitta i Fryshyllan</a>
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

	.nav-links a:hover {
		color: var(--color-gold);
	}

	.nav-links a.highlight-link {
		color: var(--color-gold);
		border-bottom: 1px solid var(--color-gold);
		padding-bottom: 0.2rem;
	}

	.nav-links a.highlight-link:hover {
		color: #FFF;
		border-color: #FFF;
	}
</style>
