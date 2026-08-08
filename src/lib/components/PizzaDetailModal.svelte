<script lang="ts">
	import type { MenuItem } from '$lib/types';

	interface Props {
		item: MenuItem | null;
		onClose: () => void;
	}

	let { item, onClose }: Props = $props();
</script>

{#if item}
	<div 
		class="overlay" 
		onclick={onClose} 
		onkeydown={(e) => e.key === 'Escape' && onClose()} 
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
			<button class="close-btn" onclick={onClose} aria-label="Stäng detaljer">✕</button>

			<div class="modal-grid">
				<div class="modal-media">
					<img src={item.image} alt={item.name} class="modal-img" />
					{#if item.badge}
						<span class="badge badge-gold modal-badge">{item.badge}</span>
					{/if}
				</div>

				<div class="modal-body">
					<div class="header-tag">
						<span class="badge badge-ember">Artisan Neapolitan</span>
						<span class="price-tag">{item.price} SEK</span>
					</div>

					<h2 class="modal-title">{item.name}</h2>
					<p class="modal-desc">{item.description}</p>

					<div class="craft-specs">
						<div class="spec-item">
							<span class="spec-lbl">Deg</span>
							<strong>72-Timmar Surdeg</strong>
						</div>
						<div class="spec-item">
							<span class="spec-lbl">Ugnstemp</span>
							<strong>485°C Stenugn</strong>
						</div>
						<div class="spec-item">
							<span class="spec-lbl">Mjöl</span>
							<strong>Italienskt Tipo 00</strong>
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
						<a href="#aterforsaljare" class="btn btn-primary" onclick={onClose}>
							<span>Hitta Butik i Fryshyllan</span>
						</a>
						<a href="#hitta-hit" class="btn btn-secondary" onclick={onClose}>
							<span>Besök Bageriet i Lidköping</span>
						</a>
					</div>
				</div>
			</div>
		</div>
	</div>
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

	.modal-grid {
		display: grid;
		grid-template-columns: 1fr 1.2fr;
	}

	.modal-media {
		position: relative;
		height: 100%;
		min-height: 320px;
	}

	.modal-img {
		width: 100%;
		height: 100%;
		object-fit: cover;
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

	@media (max-width: 750px) {
		.modal-grid {
			grid-template-columns: 1fr;
		}
		.modal-media {
			height: 240px;
		}
	}
</style>
