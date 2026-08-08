<script lang="ts">
	import { base } from '$app/paths';
	import type { MenuItem } from '$lib/types';
	import MultiVideoCrossfadePlayer from '$lib/components/MultiVideoCrossfadePlayer.svelte';

	interface Props {
		items: MenuItem[];
		onSelectPizza: (item: MenuItem) => void;
	}

	let { items, onSelectPizza }: Props = $props();

	let searchQuery = $state<string>('');
	let selectedAllergens = $state<string[]>([]);
	let filterMode = $state<'hide' | 'highlight'>('hide');

	const showcaseVideos = [
		{ src: `${base}/videos/dough_crafting.mp4`, label: '72h Långjäsning' },
		{ src: `${base}/videos/bakery_moments.mp4`, label: '485°C Stenugnsbakad', startFromHalf: true },
		{ src: `${base}/videos/product_showcase.mp4`, label: 'Nybakad Restaurangkvalitet' }
	];

	interface AllergenOption {
		id: string;
		label: string;
		keywords: string[];
	}

	const allergenOptions: AllergenOption[] = [
		{ id: 'gluten', label: 'Gluten / Vete', keywords: ['vete', 'gluten'] },
		{ id: 'mjolk', label: 'Mjölk / Laktos', keywords: ['mjölk', 'ost', 'feta', 'yoghurt', 'fior di latte', 'parmigiano', 'stracciatella'] },
		{ id: 'flask', label: 'Fläskkött', keywords: ['prosciutto', 'salami', 'spianata', 'nduja', 'gris', 'fläsk'] },
		{ id: 'agg', label: 'Ägg', keywords: ['ägg', 'äggula'] },
		{ id: 'senap', label: 'Senap', keywords: ['senap'] }
	];

	function toggleAllergen(id: string) {
		if (selectedAllergens.includes(id)) {
			selectedAllergens = selectedAllergens.filter((a) => a !== id);
		} else {
			selectedAllergens = [...selectedAllergens, id];
		}
	}

	function itemHasAllergen(item: MenuItem, allergenId: string): boolean {
		const option = allergenOptions.find((a) => a.id === allergenId);
		if (!option) return false;

		const fullText = (
			item.name +
			' ' +
			item.description +
			' ' +
			item.ingredients.join(' ') +
			' ' +
			(item.allergens?.join(' ') || '')
		).toLowerCase();

		return option.keywords.some((kw) => fullText.includes(kw.toLowerCase()));
	}

	function itemHasAnySelectedAllergen(item: MenuItem): boolean {
		return selectedAllergens.some((aId) => itemHasAllergen(item, aId));
	}

	function ingredientMatchesAllergen(ing: string): boolean {
		if (selectedAllergens.length === 0) return false;
		const ingLower = ing.toLowerCase();
		return selectedAllergens.some((aId) => {
			const option = allergenOptions.find((opt) => opt.id === aId);
			return option ? option.keywords.some((kw) => ingLower.includes(kw.toLowerCase())) : false;
		});
	}

	let filteredItems = $derived(() => {
		return items.filter((item) => {
			const matchesSearch =
				item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
				item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
				item.ingredients.some((ing) => ing.toLowerCase().includes(searchQuery.toLowerCase()));

			const passesAllergenFilter =
				filterMode === 'highlight' || !itemHasAnySelectedAllergen(item);

			return matchesSearch && passesAllergenFilter;
		});
	});
</script>

<section id="meny" class="menu-section">
	<!-- Full-Width Multi-Video Hero Banner (Title Floating Truly Centered Directly Over Full Video) -->
	<div class="showcase-hero-banner">
		<MultiVideoCrossfadePlayer
			videos={showcaseVideos}
			class="showcase-hero-video"
			fadeDuration={1.2}
			playDurationPerClip={5.5}
		/>
		<div class="hero-video-overlay"></div>

		<div class="hero-center-overlay">
			<span class="badge badge-ember">• HANTVERKSMENY</span>
			<h1 class="hero-banner-title">Napolitanska Pizzor & Hantverk</h1>
			<p class="hero-banner-sub">
				Bakade för hand på Staplaregatan 6 i Lidköping. 72 timmars långjäsning, gräddade i 485°C stenugn och chockfrysta för hemmabruk.
			</p>
		</div>
	</div>

	<div class="container">
		<!-- Open Filter & Search Controls -->
		<div class="menu-controls">
			<!-- Allergen Filter Strip -->
			<div class="allergen-filter-strip">
				<span class="allergen-title">Allergen- & Innehållsfilter</span>
				<div class="allergen-chips">
					{#each allergenOptions as opt}
						<button
							class="allergen-chip {selectedAllergens.includes(opt.id) ? 'active' : ''}"
							onclick={() => toggleAllergen(opt.id)}
						>
							<span class="check-mark">{selectedAllergens.includes(opt.id) ? '✓' : '+'}</span>
							<span>{opt.label}</span>
						</button>
					{/each}
				</div>

				{#if selectedAllergens.length > 0}
					<div class="mode-toggle">
						<button
							class="mode-btn {filterMode === 'hide' ? 'active' : ''}"
							onclick={() => (filterMode = 'hide')}
						>
							Dölj Pizzor
						</button>
						<span class="divider">|</span>
						<button
							class="mode-btn {filterMode === 'highlight' ? 'active' : ''}"
							onclick={() => (filterMode = 'highlight')}
						>
							Markera Ingredienser
						</button>
						<button class="clear-btn" onclick={() => (selectedAllergens = [])}>
							Rensa Filter
						</button>
					</div>
				{/if}
			</div>

			<div class="search-box">
				<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
				<input
					type="text"
					placeholder="Sök ingrediens eller pizza..."
					bind:value={searchQuery}
				/>
			</div>
		</div>

		<!-- Open Frameless 3xN Editorial Grid -->
		<div class="editorial-grid">
			{#each filteredItems() as item, idx (item.id)}
				{@const hasAllergenWarning = selectedAllergens.length > 0 && itemHasAnySelectedAllergen(item)}
				<div 
					class="menu-card {hasAllergenWarning && filterMode === 'highlight' ? 'allergen-warning-card' : ''}"
					onclick={() => onSelectPizza(item)}
					role="button"
					tabindex="0"
					onkeydown={(e) => e.key === 'Enter' && onSelectPizza(item)}
				>
					<!-- Frameless 1:1 Aspect Ratio Image Box -->
					<div class="card-image-wrapper">
						<img src={item.image} alt={item.name} class="card-image" loading="lazy" />

						{#if hasAllergenWarning && filterMode === 'highlight'}
							<span class="allergen-warning-tag">Innehåller Vald Allergen</span>
						{:else if item.spicy}
							<span class="spicy-tag">Stark</span>
						{/if}
					</div>

					<!-- Open Typography Content (No Card Container Box) -->
					<div class="card-content">
						<div class="card-header">
							<h3 class="item-title">{item.name}</h3>
							<span class="item-price">{item.price} <small>SEK</small></span>
						</div>

						<p class="item-desc">{item.description}</p>

						<!-- Product Spec Pills -->
						<div class="spec-pills">
							<span class="spec-pill">72h Deg</span>
							<span class="spec-pill">4 min Ugn</span>
							<span class="spec-pill">485°C Bakad</span>
						</div>

						<!-- Open Inline Ingredient List (No Pill Boxes) -->
						<div class="ingredients-inline">
							{#each item.ingredients as ing, i}
								{@const isMatched = ingredientMatchesAllergen(ing)}
								<span class="ing-text {isMatched ? 'allergen-matched' : ''}">
									{ing}{#if i < item.ingredients.length - 1}<span class="dot-sep">•</span>{/if}
								</span>
							{/each}
						</div>

						<div class="card-footer">
							<span class="explore-link">
								<span>Visa Råvaror & Detaljer</span>
								<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
							</span>
						</div>
					</div>
				</div>
			{:else}
				<div class="empty-results">
					<p>Inga produkter matchade dina valda allergener eller sökning.</p>
					{#if selectedAllergens.length > 0}
						<button class="btn btn-secondary btn-sm" onclick={() => (selectedAllergens = [])}>
							Rensa Allergenfilter
						</button>
					{/if}
				</div>
			{/each}
		</div>
	</div>
</section>

<style>
	.menu-section {
		padding: 0 0 6rem 0;
	}

	/* Showcase Video Hero Banner - Full Width Overlay */
	.showcase-hero-banner {
		position: relative;
		height: 520px;
		width: 100%;
		overflow: hidden;
		margin-bottom: 4rem;
		display: flex;
		align-items: center;
		justify-content: center;
		background: #000;
	}

	:global(.showcase-hero-video) {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
	}

	.hero-video-overlay {
		position: absolute;
		inset: 0;
		background: 
			radial-gradient(circle at center, rgba(15, 25, 13, 0.45) 0%, rgba(15, 25, 13, 0.88) 100%),
			linear-gradient(180deg, rgba(15, 25, 13, 0.4) 0%, rgba(15, 25, 13, 0.92) 100%);
		pointer-events: none;
		z-index: 3;
	}

	.hero-center-overlay {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		z-index: 4;
		text-align: center;
		width: 90%;
		max-width: 820px;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 1rem;
		pointer-events: none;
	}

	.hero-banner-title {
		font-size: 3.6rem;
		line-height: 1.05;
		color: #FFF;
		text-shadow: 0 4px 24px rgba(0, 0, 0, 0.95);
	}

	.hero-banner-sub {
		font-size: 1.15rem;
		line-height: 1.6;
		color: var(--color-dough);
		text-shadow: 0 2px 16px rgba(0, 0, 0, 0.95);
	}

	.menu-controls {
		display: flex;
		flex-direction: column;
		gap: 1.75rem;
		margin-bottom: 4rem;
		align-items: center;
	}

	/* Open Allergen Filter Strip */
	.allergen-filter-strip {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.85rem;
		padding: 0;
		background: transparent;
		border: none;
		width: 100%;
		max-width: 820px;
	}

	.allergen-title {
		font-size: 0.78rem;
		font-weight: 800;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		color: var(--color-gold);
	}

	.allergen-chips {
		display: flex;
		flex-wrap: wrap;
		gap: 0.6rem;
		justify-content: center;
	}

	.allergen-chip {
		display: inline-flex;
		align-items: center;
		gap: 0.4rem;
		padding: 0.45rem 0.95rem;
		background: transparent;
		border: 1px solid var(--border-subtle);
		border-radius: var(--radius-sm);
		color: var(--color-dough-muted);
		font-size: 0.8rem;
		font-weight: 600;
		cursor: pointer;
		transition: var(--transition);
		box-shadow: none !important;
	}

	.allergen-chip:hover {
		border-color: var(--border-gold);
		color: var(--color-dough);
	}

	.allergen-chip.active {
		background: rgba(200, 75, 49, 0.2);
		border-color: var(--color-ember);
		color: #FF8F77;
	}

	.check-mark {
		font-size: 0.75rem;
		font-weight: 800;
	}

	.mode-toggle {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		margin-top: 0.35rem;
	}

	.mode-btn {
		background: none;
		border: none;
		color: var(--color-dough-muted);
		font-size: 0.78rem;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.04em;
		cursor: pointer;
		padding: 0.2rem 0;
		border-bottom: 1px solid transparent;
	}

	.mode-btn.active {
		color: var(--color-gold);
		border-bottom-color: var(--color-gold);
	}

	.divider {
		color: #444;
		font-size: 0.8rem;
	}

	.clear-btn {
		background: none;
		border: none;
		color: #888;
		font-size: 0.75rem;
		cursor: pointer;
		margin-left: 0.5rem;
		text-decoration: underline;
	}

	.clear-btn:hover {
		color: var(--color-ember);
	}

	/* Open Search Input */
	.search-box {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		padding: 0.6rem 0;
		background: none;
		border: none;
		border-bottom: 1px solid var(--border-subtle);
		width: 100%;
		max-width: 420px;
		color: var(--color-dough-muted);
		transition: var(--transition);
	}

	.search-box:focus-within {
		border-bottom-color: var(--color-gold);
		color: var(--color-gold);
	}

	.search-box input {
		background: none;
		border: none;
		outline: none;
		color: var(--color-dough);
		width: 100%;
		font-size: 0.95rem;
	}

	/* Open Frameless 3xN Editorial Grid */
	.editorial-grid {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 3.5rem 2.5rem;
	}

	.menu-card {
		display: flex;
		flex-direction: column;
		background: transparent;
		border: none;
		cursor: pointer;
		box-shadow: none !important;
	}

	.menu-card:hover {
		box-shadow: none !important;
	}

	/* Strict 1:1 Aspect Ratio Image Box */
	.card-image-wrapper {
		position: relative;
		width: 100%;
		aspect-ratio: 1 / 1;
		overflow: hidden;
		border-radius: var(--radius-sm);
		background: rgba(15, 25, 13, 0.4);
		border: 1px solid rgba(253, 215, 154, 0.08);
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.card-image {
		width: 100%;
		height: 100%;
		object-fit: cover;
		transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
	}

	.menu-card:hover .card-image {
		transform: scale(1.04);
	}

	.spicy-tag {
		position: absolute;
		top: 1rem;
		right: 1rem;
		background: rgba(15, 25, 13, 0.85);
		padding: 0.3rem 0.65rem;
		border-radius: var(--radius-sm);
		font-size: 0.72rem;
		font-weight: 800;
		text-transform: uppercase;
		color: #FF8F77;
		border: 1px solid var(--border-ember);
		z-index: 2;
	}

	.allergen-warning-tag {
		position: absolute;
		top: 1rem;
		right: 1rem;
		background: rgba(200, 75, 49, 0.9);
		color: #FFF;
		padding: 0.3rem 0.65rem;
		border-radius: var(--radius-sm);
		font-size: 0.72rem;
		font-weight: 800;
		text-transform: uppercase;
		z-index: 2;
	}

	/* Open Editorial Typography (Below Image) */
	.card-content {
		padding: 1.25rem 0 0 0;
		display: flex;
		flex-direction: column;
		flex-grow: 1;
	}

	.card-header {
		display: flex;
		justify-content: space-between;
		align-items: baseline;
		margin-bottom: 0.6rem;
	}

	.item-title {
		font-size: 1.4rem;
		font-weight: 700;
		color: var(--color-dough);
	}

	.item-price {
		font-family: var(--font-brand);
		font-weight: 900;
		font-size: 1.35rem;
		color: var(--color-gold);
	}

	.item-price small {
		font-size: 0.72rem;
		font-weight: 600;
		color: var(--color-dough-muted);
	}

	.item-desc {
		font-size: 0.9rem;
		margin-bottom: 0.75rem;
		line-height: 1.55;
		color: var(--color-dough-muted);
	}

	/* Product Spec Pills */
	.spec-pills {
		display: flex;
		gap: 0.35rem;
		margin-bottom: 0.85rem;
	}

	.spec-pill {
		font-size: 0.68rem;
		font-weight: 800;
		text-transform: uppercase;
		letter-spacing: 0.04em;
		padding: 0.15rem 0.5rem;
		background: rgba(253, 215, 154, 0.08);
		color: var(--color-gold);
		border-radius: var(--radius-sm);
	}

	/* Open Inline Ingredient List (No Pill Boxes) */
	.ingredients-inline {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 0.25rem;
		margin-bottom: 1.25rem;
		line-height: 1.4;
	}

	.ing-text {
		font-size: 0.78rem;
		color: #9AA898;
	}

	.ing-text.allergen-matched {
		color: #FF8F77;
		font-weight: 700;
	}

	.dot-sep {
		margin-left: 0.25rem;
		color: #445242;
	}

	.card-footer {
		margin-top: auto;
		display: flex;
		align-items: center;
		padding-top: 0.6rem;
		border-top: 1px solid var(--border-subtle);
	}

	.explore-link {
		display: inline-flex;
		align-items: center;
		gap: 0.4rem;
		font-size: 0.75rem;
		font-weight: 800;
		text-transform: uppercase;
		letter-spacing: 0.08em;
		color: var(--color-gold);
		transition: var(--transition);
	}

	.menu-card:hover .explore-link {
		color: #FFF;
		transform: translateX(4px);
	}

	.empty-results {
		grid-column: 1 / -1;
		text-align: center;
		padding: 4rem;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1.25rem;
	}

	@media (max-width: 1050px) {
		.showcase-hero-banner {
			height: 380px;
		}
		.hero-banner-title {
			font-size: 2.6rem;
		}
		.editorial-grid {
			grid-template-columns: repeat(2, 1fr);
		}
	}

	@media (max-width: 680px) {
		.showcase-hero-banner {
			height: 300px;
		}
		.hero-banner-title {
			font-size: 2.1rem;
		}
		.editorial-grid {
			grid-template-columns: 1fr;
		}
	}
</style>
