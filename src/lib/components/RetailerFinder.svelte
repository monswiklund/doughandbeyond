<script lang="ts">
	interface Store {
		id: string;
		name: string;
		chain: string;
		city: string;
		region: string;
		address: string;
		products: string[];
		inStock: boolean;
	}

	const stores: Store[] = [
		{
			id: '1',
			name: 'ICA Maxi Lidköping',
			chain: 'ICA Maxi',
			city: 'Lidköping',
			region: 'Västra Götaland',
			address: 'Mellanbryggan 1, 531 30 Lidköping',
			products: ['Margherita', 'Diablo'],
			inStock: true
		},
		{
			id: '2',
			name: 'Coop Forum Skövde',
			chain: 'Coop',
			city: 'Skövde',
			region: 'Västra Götaland',
			address: 'Norra Metallvägen 1, 541 39 Skövde',
			products: ['Margherita', 'Diablo'],
			inStock: true
		},
		{
			id: '3',
			name: 'ICA Focus Göteborg',
			chain: 'ICA',
			city: 'Göteborg',
			region: 'Västra Götaland',
			address: 'Åvägen 42, 412 51 Göteborg',
			products: ['Margherita', 'Diablo', 'Prosciutto Cotto'],
			inStock: true
		},
		{
			id: '4',
			name: 'Hemköp Nordstan Göteborg',
			chain: 'Hemköp',
			city: 'Göteborg',
			region: 'Västra Götaland',
			address: 'Götgatan 10, 411 05 Göteborg',
			products: ['Margherita', 'Diablo'],
			inStock: true
		},
		{
			id: '5',
			name: 'ICA Maxi Lindhagen Stockholm',
			chain: 'ICA Maxi',
			city: 'Stockholm',
			region: 'Stockholm',
			address: 'Lindhagensgatan 118, 112 51 Stockholm',
			products: ['Margherita', 'Diablo', 'Chicken Feta'],
			inStock: true
		},
		{
			id: '6',
			name: 'Coop Daglivs Kungsholmen',
			chain: 'Coop',
			city: 'Stockholm',
			region: 'Stockholm',
			address: 'Sankt Eriksgatan 34, 112 36 Stockholm',
			products: ['Margherita', 'Diablo'],
			inStock: true
		},
		{
			id: '7',
			name: 'ICA Maxi Malmö',
			chain: 'ICA Maxi',
			city: 'Malmö',
			region: 'Skåne',
			address: 'Cypressvägen 6, 213 63 Malmö',
			products: ['Margherita', 'Diablo'],
			inStock: true
		},
		{
			id: '8',
			name: 'City Gross Jönköping',
			chain: 'City Gross',
			city: 'Jönköping',
			region: 'Småland',
			address: 'Bataljonsgatan 2, 553 05 Jönköping',
			products: ['Margherita', 'Kebab Pizza'],
			inStock: true
		}
	];

	let searchQuery = $state('');
	let selectedRegion = $state('all');

	const regions = [
		{ id: 'all', label: 'Hela Sverige' },
		{ id: 'Västra Götaland', label: 'Västra Götaland' },
		{ id: 'Stockholm', label: 'Stockholm' },
		{ id: 'Skåne', label: 'Skåne' },
		{ id: 'Småland', label: 'Småland' }
	];

	let filteredStores = $derived(() => {
		return stores.filter((s) => {
			const matchesRegion = selectedRegion === 'all' || s.region === selectedRegion;
			const matchesQuery =
				s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
				s.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
				s.address.toLowerCase().includes(searchQuery.toLowerCase());
			return matchesRegion && matchesQuery;
		});
	});
</script>

<section id="aterforsaljare" class="retailer-section">
	<div class="container">
		<div class="section-header">
			<span class="badge badge-gold">• BUTIKER I SVERIGE</span>
			<h2>Hitta Dough & Beyond i Fryshyllan</h2>
			<p>Våra stenugnsbakade, snabbfrysta napolitanska pizzor finns i utvalda ICA, Coop och Hemköp-butiker över hela landet.</p>
		</div>

		<!-- Open Editorial Controls (No Container Boxes) -->
		<div class="retailer-controls">
			<div class="region-tabs">
				{#each regions as reg}
					<button
						class="region-btn {selectedRegion === reg.id ? 'active' : ''}"
						onclick={() => (selectedRegion = reg.id)}
					>
						{reg.label}
					</button>
				{/each}
			</div>

			<div class="search-input-wrapper">
				<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
				<input
					type="text"
					placeholder="Sök stad eller butik (t.ex. Göteborg, ICA Maxi)..."
					bind:value={searchQuery}
				/>
			</div>
		</div>

		<!-- Open Frameless Store Grid (No Card Container Boxes or Background Colors) -->
		<div class="stores-editorial-grid">
			{#each filteredStores() as store (store.id)}
				<div class="store-editorial-item">
					<div class="store-meta-line">
						<span class="chain-name">{store.chain}</span>
						<span class="stock-status-inline">I Lager</span>
					</div>

					<h3 class="store-name">{store.name}</h3>
					<p class="store-address">{store.address}</p>

					<div class="products-inline">
						<span class="products-label">I FRYSEN:</span>
						<div class="products-list">
							{#each store.products as p, i}
								<span class="product-item">
									{p}{#if i < store.products.length - 1}<span class="dot-sep">•</span>{/if}
								</span>
							{/each}
						</div>
					</div>
				</div>
			{:else}
				<div class="no-stores-open">
					<p>Inga butiker hittades för din sökning. Vill du att din lokala handlare ska ta in våra pizzor? Tipsa dem eller kontakta oss på info@doughandbeyond.se!</p>
				</div>
			{/each}
		</div>

		<!-- Open Editorial B2B Banner (No Box Container or Card Background) -->
		<div class="b2b-editorial-row">
			<div class="b2b-text">
				<span class="badge badge-ember">• ÅTERFÖRSÄLJARE & BAGERIORDER</span>
				<h3>Är du handlare eller återförsäljare?</h3>
				<p>Vill du erbjuda dina kunder äkta napolitansk surdegspizza bakad i Lidköping? Kontakta oss för smakprover och leveransvillkor.</p>
			</div>
			<div class="b2b-action">
				<a href="mailto:info@doughandbeyond.se" class="btn btn-primary">
					<span>Kontakta Bageriet (B2B)</span>
				</a>
			</div>
		</div>
	</div>
</section>

<style>
	.retailer-section {
		padding: 4rem 0 6rem 0;
	}

	.section-header {
		text-align: center;
		max-width: 720px;
		margin: 0 auto 3.5rem auto;
	}

	.section-header h2 {
		font-size: 3rem;
		margin: 0.75rem 0;
	}

	.section-header p {
		font-size: 1.1rem;
		line-height: 1.65;
		color: var(--color-dough-muted);
	}

	.retailer-controls {
		display: flex;
		flex-direction: column;
		gap: 1.75rem;
		align-items: center;
		margin-bottom: 4rem;
	}

	.region-tabs {
		display: flex;
		gap: 0.5rem;
		flex-wrap: wrap;
		justify-content: center;
	}

	.region-btn {
		padding: 0.5rem 1.1rem;
		background: transparent;
		border: 1px solid var(--border-subtle);
		border-radius: var(--radius-sm);
		color: var(--color-dough-muted);
		font-weight: 700;
		font-size: 0.8rem;
		text-transform: uppercase;
		letter-spacing: 0.04em;
		cursor: pointer;
		transition: var(--transition);
		box-shadow: none !important;
	}

	.region-btn:hover {
		color: var(--color-dough);
		border-color: var(--border-gold);
	}

	.region-btn.active {
		background: var(--color-ember);
		border-color: var(--color-ember);
		color: #FFF;
		box-shadow: none !important;
	}

	.search-input-wrapper {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		padding: 0.6rem 0;
		background: none;
		border: none;
		border-bottom: 1px solid var(--border-subtle);
		width: 100%;
		max-width: 440px;
		color: var(--color-dough-muted);
		transition: var(--transition);
	}

	.search-input-wrapper:focus-within {
		border-bottom-color: var(--color-gold);
		color: var(--color-gold);
	}

	.search-input-wrapper input {
		background: none;
		border: none;
		outline: none;
		color: var(--color-dough);
		width: 100%;
		font-size: 0.95rem;
	}

	/* Open Frameless Store Grid (No Card Boxes, No Backgrounds) */
	.stores-editorial-grid {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		gap: 3rem 2rem;
		margin-bottom: 5rem;
	}

	.store-editorial-item {
		display: flex;
		flex-direction: column;
		gap: 0.4rem;
		padding-bottom: 1.5rem;
		border-bottom: 1px solid var(--border-subtle);
		background: transparent;
	}

	.store-meta-line {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 0.2rem;
	}

	.chain-name {
		font-size: 0.72rem;
		font-weight: 800;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		color: var(--color-gold);
	}

	.stock-status-inline {
		font-size: 0.7rem;
		font-weight: 800;
		text-transform: uppercase;
		color: var(--color-basil-light);
		letter-spacing: 0.06em;
	}

	.store-name {
		font-size: 1.25rem;
		font-weight: 800;
		color: var(--color-dough);
		line-height: 1.2;
	}

	.store-address {
		font-size: 0.88rem;
		color: var(--color-dough-muted);
		line-height: 1.45;
	}

	.products-inline {
		display: flex;
		align-items: center;
		gap: 0.4rem;
		margin-top: 0.5rem;
		flex-wrap: wrap;
	}

	.products-label {
		font-size: 0.68rem;
		font-weight: 800;
		color: #778575;
		letter-spacing: 0.06em;
	}

	.products-list {
		display: flex;
		flex-wrap: wrap;
		gap: 0.25rem;
		align-items: center;
	}

	.product-item {
		font-size: 0.8rem;
		font-weight: 600;
		color: var(--color-crust);
	}

	.dot-sep {
		margin-left: 0.25rem;
		color: #445242;
	}

	.no-stores-open {
		grid-column: 1 / -1;
		text-align: center;
		padding: 3rem 0;
		color: var(--color-dough-muted);
	}

	/* Open Editorial B2B Banner (No Box Card Container) */
	.b2b-editorial-row {
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: 3rem;
		padding-top: 3.5rem;
		border-top: 1px solid var(--border-subtle);
		background: transparent;
	}

	.b2b-text {
		display: flex;
		flex-direction: column;
		gap: 0.6rem;
		max-width: 680px;
	}

	.b2b-text h3 {
		font-size: 1.8rem;
		font-weight: 800;
	}

	.b2b-text p {
		font-size: 1rem;
		line-height: 1.6;
		color: var(--color-dough-muted);
	}

	@media (max-width: 1100px) {
		.stores-editorial-grid {
			grid-template-columns: repeat(2, 1fr);
		}
	}

	@media (max-width: 850px) {
		.b2b-editorial-row {
			flex-direction: column;
			align-items: flex-start;
			gap: 1.5rem;
		}
	}

	@media (max-width: 600px) {
		.stores-editorial-grid {
			grid-template-columns: 1fr;
		}
	}
</style>
