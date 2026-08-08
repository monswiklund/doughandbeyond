<script lang="ts">
	import { base } from '$app/paths';
	import type { StoreStatus } from '$lib/types';

	interface Props {
		storeStatus?: StoreStatus | null;
		onExploreMenu?: () => void;
	}

	let { storeStatus = null, onExploreMenu }: Props = $props();
</script>

<section class="hero-section">
	<div class="container hero-container">
		<div class="hero-content">
			<div class="hero-tagline">
				<span class="badge badge-ember">• LIDKÖPINGS BAKERI & STENUGN</span>
				<span class="location-badge">Staplaregatan 6</span>
			</div>

			<h1 class="hero-title">
				Hantverksbageri <br />
				<span class="text-gold">& Frysta Pizzor</span>
			</h1>

			<p class="hero-description">
				Vi bakar äkta napolitanska surdegspizzor med 72 timmars långjäsning i Lidköping. 
				Avnjut dem färska ur bageriets stenugn eller hitta våra färdiga pizzor i fryshyllan hos din lokala matbutik.
			</p>

			<div class="hero-actions">
				<a href={`${base}/pizzor`} class="btn btn-primary btn-lg" onclick={onExploreMenu}>
					<span>Utforska Menyn & Pizzor</span>
				</a>
				<a href={`${base}/aterforsaljare`} class="btn btn-secondary btn-lg">
					<span>Hitta i Fryshyllan</span>
				</a>
			</div>

			<div class="hero-stats">
				<div class="stat-item">
					<span class="stat-number">72h</span>
					<span class="stat-label">Surdeg jäsning</span>
				</div>
				<div class="stat-item">
					<span class="stat-number">485°C</span>
					<span class="stat-label">Stenugnsbakat</span>
				</div>
				<div class="stat-item">
					<span class="stat-number">Tipo 00</span>
					<span class="stat-label">Italienskt mjöl</span>
				</div>
			</div>
		</div>

		<!-- Open Frameless Hero Visual -->
		<div class="hero-visual">
			<div class="hero-image-wrapper">
				<img
					src={`${base}/images/pizzor/diablo_1to1.jpg`}
					alt="Napolitansk Surdegspizza från Dough & Beyond"
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
	}

	.hero-tagline {
		display: flex;
		align-items: center;
		gap: 0.85rem;
		flex-wrap: wrap;
	}

	.location-badge {
		font-size: 0.78rem;
		font-weight: 700;
		color: var(--color-gold);
		letter-spacing: 0.08em;
		text-transform: uppercase;
	}

	.hero-title {
		font-size: 3.8rem;
		line-height: 1.05;
		letter-spacing: -0.03em;
		font-weight: 800;
	}

	.hero-description {
		font-size: 1.15rem;
		line-height: 1.7;
		color: var(--color-dough-muted);
		max-width: 540px;
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
	}

	.hero-visual {
		position: relative;
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
			grid-template-columns: 1fr;
			gap: 3rem;
		}

		.hero-title {
			font-size: 3rem;
		}
	}
</style>
