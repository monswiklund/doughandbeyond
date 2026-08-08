<script lang="ts">
	import { tick } from 'svelte';
	import type { MenuItem } from '$lib/types';

	interface Props {
		item: MenuItem | null;
		onClose: () => void;
	}

	let { item, onClose }: Props = $props();
	let isImageLightboxOpen = $state(false);
	let imageTrigger = $state<HTMLButtonElement | undefined>(undefined);
	let lightboxCloseButton = $state<HTMLButtonElement | undefined>(undefined);

	async function openImageLightbox() {
		isImageLightboxOpen = true;
		await tick();
		lightboxCloseButton?.focus();
	}

	function closeImageLightbox() {
		isImageLightboxOpen = false;
		requestAnimationFrame(() => imageTrigger?.focus());
	}

	function closeModal() {
		isImageLightboxOpen = false;
		onClose();
	}

	function handleWindowKeydown(event: KeyboardEvent) {
		if (event.key !== 'Escape' || !item) return;

		if (isImageLightboxOpen) {
			closeImageLightbox();
		} else {
			closeModal();
		}
	}

	function handleLightboxOverlayClick(event: MouseEvent) {
		if (event.target === event.currentTarget) closeImageLightbox();
	}

	function handleLightboxKeydown(event: KeyboardEvent) {
		if (event.key === 'Escape') {
			event.stopPropagation();
			closeImageLightbox();
		}
	}
</script>

<svelte:window onkeydown={handleWindowKeydown} />

{#if item}
	<div 
		class="overlay" 
		onclick={closeModal}
		role="presentation"
	>
		<div 
			class="modal-card glass-panel" 
			onclick={(e) => e.stopPropagation()} 
			onkeydown={(e) => e.stopPropagation()} 
			role="dialog" 
			aria-modal="true" 
			tabindex="-1"
		>
			<button class="close-btn" onclick={closeModal} aria-label="Stäng detaljer">
				<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true">
					<line x1="18" y1="6" x2="6" y2="18" />
					<line x1="6" y1="6" x2="18" y2="18" />
				</svg>
			</button>

			<div class="modal-grid">
				<div class="modal-media">
					<button
						bind:this={imageTrigger}
						type="button"
						class="image-trigger"
						onclick={openImageLightbox}
						aria-label={`Visa ${item.name} i större format`}
					>
						<img src={item.image} alt={item.name} class="modal-img" />
						<span class="image-zoom-hint" aria-hidden="true">
							<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true">
								<circle cx="11" cy="11" r="7" />
								<line x1="20" y1="20" x2="16.1" y2="16.1" />
								<line x1="11" y1="8" x2="11" y2="14" />
								<line x1="8" y1="11" x2="14" y2="11" />
							</svg>
							<span>Visa större</span>
						</span>
					</button>
					{#if item.badge}
						<span class="badge badge-gold modal-badge">{item.badge}</span>
					{/if}
				</div>

				<div class="modal-body">
					<div class="header-tag">
						<span class="price-tag">{item.price} SEK</span>
					</div>

					<h2 class="modal-title">{item.name}</h2>
					<p class="modal-desc">{item.description}</p>

					<div class="craft-specs">
						<div class="spec-item">
							<span class="spec-lbl">Deg</span>
							<strong>72 timmars långjäsning</strong>
						</div>
						<div class="spec-item">
							<span class="spec-lbl">Ugnstemp</span>
							<strong>485°C i Pizzaluckan</strong>
						</div>
						<div class="spec-item">
							<span class="spec-lbl">Mjöl</span>
							<strong>Högkvalitativa italienska mjölsorter</strong>
						</div>
					</div>

					<div class="section-block">
						<h4>Ingredienser & Råvaror</h4>
						<div class="ingredients-chips">
							{#each item.ingredients as ing}
								<span class="ing-chip">{ing}</span>
							{/each}
						</div>
					</div>

					{#if item.allergens}
						<div class="section-block">
							<small class="allergens">Allergener: {item.allergens.join(', ')}</small>
						</div>
					{/if}

					<div class="modal-actions">
						<a href="#aterforsaljare" class="btn btn-primary" onclick={closeModal}>
							<span>Hitta närmsta återförsäljare</span>
						</a>
					</div>
				</div>
			</div>
		</div>
	</div>

	{#if isImageLightboxOpen}
		<div
			class="lightbox-overlay"
			role="dialog"
			aria-modal="true"
			aria-label={`Stor bild av ${item.name}`}
			tabindex="-1"
			onclick={handleLightboxOverlayClick}
			onkeydown={handleLightboxKeydown}
		>
			<div class="lightbox-content">
				<button
					bind:this={lightboxCloseButton}
					type="button"
					class="lightbox-close"
					onclick={closeImageLightbox}
					aria-label="Stäng bildvisning"
				>
					<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true">
						<line x1="18" y1="6" x2="6" y2="18" />
						<line x1="6" y1="6" x2="18" y2="18" />
					</svg>
				</button>

				<figure class="lightbox-figure">
					<img src={item.image} alt={item.name} class="lightbox-img" />
					<figcaption>{item.name}<span>• Klicka utanför eller tryck Esc för att stänga</span></figcaption>
				</figure>
			</div>
		</div>
	{/if}
{/if}

<style>
	.overlay {
		position: fixed;
		inset: 0;
		background: rgba(0, 0, 0, 0.85);
		backdrop-filter: blur(12px);
		z-index: 200;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 1.5rem;
	}

	.modal-card {
		position: relative;
		width: 100%;
		max-width: 820px;
		max-height: 90vh;
		overflow-y: auto;
		border-radius: var(--radius-md);
		border: 1px solid var(--border-ember);
		box-shadow: var(--shadow-lg), var(--shadow-ember);
		padding: 0;
		background: var(--bg-surface-elevated);
	}

	.close-btn {
		position: absolute;
		top: 1.25rem;
		right: 1.25rem;
		z-index: 10;
		width: 34px;
		height: 34px;
		border-radius: var(--radius-sm);
		background: rgba(0, 0, 0, 0.6);
		border: 1px solid var(--border-subtle);
		color: var(--color-dough);
		font-size: 1rem;
		cursor: pointer;
		display: flex;
		align-items: center;
		justify-content: center;
		transition: var(--transition);
	}

	.close-btn:hover {
		background: var(--color-ember);
		border-color: var(--color-ember);
	}

	.close-btn svg,
	.lightbox-close svg,
	.image-zoom-hint svg {
		display: block;
		flex: 0 0 auto;
	}

	.modal-grid {
		display: grid;
		grid-template-columns: 1fr 1.2fr;
	}

	.modal-media {
		position: relative;
		height: 100%;
		min-height: 320px;
	}

	.image-trigger {
		position: relative;
		display: block;
		width: 100%;
		height: 100%;
		min-height: 320px;
		padding: 0;
		border: 0;
		background: transparent;
		cursor: zoom-in;
		overflow: hidden;
	}

	.image-trigger:focus-visible {
		outline: 2px solid var(--color-gold);
		outline-offset: -4px;
	}

	.modal-img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
	}

	.image-trigger:hover .modal-img,
	.image-trigger:focus-visible .modal-img {
		transform: scale(1.035);
	}

	.image-zoom-hint {
		position: absolute;
		left: 1.25rem;
		bottom: 1.25rem;
		display: inline-flex;
		align-items: center;
		gap: 0.45rem;
		padding: 0.55rem 0.75rem;
		background: rgba(15, 25, 13, 0.86);
		border: 1px solid var(--border-gold);
		border-radius: var(--radius-sm);
		color: var(--color-dough);
		font-family: var(--font-display);
		font-size: 0.72rem;
		font-weight: 800;
		letter-spacing: 0.06em;
		text-transform: uppercase;
		pointer-events: none;
		transition: var(--transition);
	}

	.image-trigger:hover .image-zoom-hint,
	.image-trigger:focus-visible .image-zoom-hint {
		background: var(--color-ember);
		border-color: var(--color-ember);
	}

	.modal-badge {
		position: absolute;
		top: 1.5rem;
		left: 1.5rem;
	}

	.modal-body {
		padding: 2.5rem;
		display: flex;
		flex-direction: column;
		gap: 1.25rem;
	}

	.header-tag {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.price-tag {
		font-family: var(--font-brand);
		font-weight: 900;
		font-size: 1.5rem;
		color: var(--color-crust);
	}

	.modal-title {
		font-size: 2rem;
		line-height: 1.1;
	}

	.modal-desc {
		font-size: 0.95rem;
		line-height: 1.6;
	}

	.craft-specs {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 0.75rem;
		padding: 1rem;
		background: rgba(0, 0, 0, 0.4);
		border-radius: var(--radius-sm);
		border: 1px solid var(--border-subtle);
	}

	.spec-item {
		display: flex;
		flex-direction: column;
	}

	.spec-lbl {
		font-size: 0.72rem;
		color: var(--color-dough-muted);
		text-transform: uppercase;
	}

	.spec-item strong {
		font-size: 0.85rem;
		color: var(--color-dough);
	}

	.section-block h4 {
		font-size: 0.85rem;
		text-transform: uppercase;
		letter-spacing: 0.06em;
		margin-bottom: 0.5rem;
		color: var(--color-dough);
	}

	.ingredients-chips {
		display: flex;
		flex-wrap: wrap;
		gap: 0.4rem;
	}

	.ing-chip {
		font-size: 0.78rem;
		padding: 0.3rem 0.7rem;
		background: rgba(246, 239, 230, 0.06);
		border-radius: var(--radius-sm);
		color: var(--color-dough-muted);
	}

	.allergens {
		font-size: 0.78rem;
		color: #888;
	}

	.modal-actions {
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
		margin-top: 0.5rem;
	}

	.lightbox-overlay {
		position: fixed;
		inset: 0;
		z-index: 300;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: clamp(1rem, 4vw, 3rem);
		background: rgba(6, 10, 6, 0.95);
		backdrop-filter: blur(14px);
		-webkit-backdrop-filter: blur(14px);
	}

	.lightbox-content {
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;
		width: min(1200px, 100%);
		max-height: 100%;
	}

	.lightbox-close {
		position: fixed;
		top: clamp(1rem, 3vw, 2rem);
		right: clamp(1rem, 3vw, 2rem);
		z-index: 2;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 44px;
		height: 44px;
		padding: 0;
		border: 1px solid var(--border-gold);
		border-radius: var(--radius-sm);
		background: rgba(15, 25, 13, 0.86);
		color: var(--color-dough);
		cursor: pointer;
		transition: var(--transition);
	}

	.lightbox-close:hover,
	.lightbox-close:focus-visible {
		background: var(--color-ember);
		border-color: var(--color-ember);
		outline: none;
	}

	.lightbox-figure {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.75rem;
		max-width: 100%;
		max-height: calc(100vh - 3rem);
		margin: 0;
	}

	.lightbox-img {
		display: block;
		width: auto;
		max-width: min(1200px, calc(100vw - 2rem));
		max-height: calc(100vh - 6rem);
		object-fit: contain;
		border: 1px solid var(--border-gold);
		box-shadow: 0 24px 80px rgba(0, 0, 0, 0.5);
	}

	.lightbox-figure figcaption {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		gap: 0.5rem;
		color: var(--color-dough);
		font-family: var(--font-display);
		font-size: 0.85rem;
		font-weight: 700;
		text-align: center;
	}

	.lightbox-figure figcaption span {
		color: var(--color-dough-muted);
		font-family: var(--font-sans);
		font-size: 0.75rem;
		font-weight: 400;
	}

	@media (max-width: 750px) {
		.modal-grid {
			grid-template-columns: 1fr;
		}
		.modal-media {
			height: 240px;
		}

		.image-trigger {
			min-height: 240px;
		}

		.image-zoom-hint {
			left: 0.75rem;
			bottom: 0.75rem;
		}

		.lightbox-overlay {
			padding: 0.75rem;
		}

		.lightbox-close {
			top: 0.75rem;
			right: 0.75rem;
		}

		.lightbox-img {
			max-width: calc(100vw - 1.5rem);
			max-height: calc(100vh - 6rem);
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.modal-img,
		.image-zoom-hint {
			transition: none;
		}
	}
</style>
