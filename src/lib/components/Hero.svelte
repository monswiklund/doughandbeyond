<script lang="ts">
	import { base } from '$app/paths';
	import { onMount } from 'svelte';
	import type { StoreStatus } from '$lib/types';

	interface Props {
		storeStatus?: StoreStatus | null;
		onExploreMenu?: () => void;
	}

	let { storeStatus = null, onExploreMenu }: Props = $props();

	const TARGET_TEMP = 485;
	const DURATION = 2200; // ms

	let displayTemp = $state(0);

	// Ease-out exponential: fast start, heavy deceleration near the end
	function easeOutExpo(t: number): number {
		return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
	}

	onMount(() => {
		let startTime: number | null = null;
		let rafId: number;

		function step(timestamp: number) {
			if (!startTime) startTime = timestamp;
			const elapsed = timestamp - startTime;
			const progress = Math.min(elapsed / DURATION, 1);
			displayTemp = Math.round(easeOutExpo(progress) * TARGET_TEMP);

			if (progress < 1) {
				rafId = requestAnimationFrame(step);
			} else {
				displayTemp = TARGET_TEMP;
			}
		}

		rafId = requestAnimationFrame(step);
		return () => cancelAnimationFrame(rafId);
	});
</script>

<section class="hero-section">
	<div class="container hero-container">
		<div class="hero-content">
			<h1 class="hero-slogan">“Vi gör mer än bara deg”</h1>

			<p class="hero-description">
				Vi skapar en äkta napolitansk pizzaupplevelse på vårt vis – med 72 timmars långjäsning i Lidköping.
				På plats gräddar vi pizzorna i vår Pizzalucka. I butik säljs de färdiga att baka av hemma.
			</p>

			<div class="hero-actions">
				<a href={`${base}/pizzor`} class="btn btn-primary btn-lg" onclick={onExploreMenu}>
					<span>Utforska Menyn & Pizzor</span>
				</a>
				<a href={`${base}/aterforsaljare`} class="btn btn-secondary btn-lg">
					<span>Hitta närmsta återförsäljare</span>
				</a>
			</div>

			<div class="hero-stats">
				<div class="stat-item">
					<span class="stat-number">72h</span>
					<span class="stat-label">Långjäsning</span>
				</div>
				<div class="stat-item">
					<span class="stat-number">{displayTemp}°C</span>
					<span class="stat-label">Pizzaluckan på plats</span>
				</div>
				<div class="stat-item">
					<span class="stat-number">Högkvalitativa</span>
					<span class="stat-label">Italienska mjölsorter</span>
				</div>
			</div>
		</div>

		<!-- Open Frameless Hero Visual -->
		<div class="hero-visual">
			<div class="hero-image-wrapper media-bleed">
				<img
					src={`${base}/images/pizzor/diablo_1to1.jpg`}
					alt="Napolitansk pizza från Dough & Beyond"
					class="hero-image"
				/>
			</div>
		</div>
	</div>
</section>

<style>
	.hero-section {
		position: relative;
		padding: 5rem 0 6rem 0;
		overflow: hidden;
	}

	.hero-container {
		display: grid;
		grid-template-columns: 1.1fr 0.9fr;
		gap: 5rem;
		align-items: center;
	}

	.hero-content {
		display: flex;
		flex-direction: column;
		gap: 1.75rem;
		min-width: 0;
	}

	.hero-description {
		font-size: 1.15rem;
		line-height: 1.7;
		color: var(--color-dough-muted);
		max-width: 540px;
	}

	.hero-slogan {
		font-family: var(--font-display);
		font-size: clamp(1.2rem, 2vw, 1.55rem);
		font-weight: 600;
		line-height: 1.3;
		letter-spacing: -0.01em;
		color: var(--color-gold);
		max-width: 28ch;
	}

	.hero-actions {
		display: flex;
		gap: 1rem;
		flex-wrap: wrap;
		margin-top: 0.5rem;
	}

	.hero-stats {
		display: flex;
		align-items: center;
		gap: 2.5rem;
		margin-top: 1.5rem;
		padding-top: 1.75rem;
		border-top: 1px solid var(--border-subtle);
	}

	.stat-item {
		display: flex;
		flex-direction: column;
		min-width: 0;
	}

	.stat-number {
		font-family: var(--font-display);
		font-weight: 900;
		font-size: 1.6rem;
		color: var(--color-gold);
		line-height: 1.1;
	}

	.stat-label {
		font-size: 0.75rem;
		color: var(--color-dough-muted);
		text-transform: uppercase;
		letter-spacing: 0.04em;
		overflow-wrap: anywhere;
	}

	.hero-visual {
		position: relative;
		min-width: 0;
	}

	.hero-image-wrapper {
		position: relative;
		border-radius: var(--radius-sm);
		overflow: hidden;
		border: none;
		box-shadow: none !important;
	}

	.hero-image {
		width: 100%;
		height: 100%;
		object-fit: cover;
		display: block;
		aspect-ratio: 1 / 1;
		transition: transform 0.7s cubic-bezier(0.16, 1, 0.3, 1);
	}

	.hero-image-wrapper:hover .hero-image {
		transform: scale(1.03);
	}

	@media (max-width: 1024px) {
		.hero-container {
			grid-template-columns: minmax(0, 1fr);
			gap: 3rem;
		}

		.hero-stats {
			flex-wrap: wrap;
			gap: 1.25rem 1.5rem;
		}

		.stat-item {
			flex: 1 1 10rem;
		}

		.media-bleed {
			width: calc(100% + (var(--page-gutter) * 2));
			margin-left: calc(var(--page-gutter) * -1);
			border-radius: 0;
		}
	}
</style>
