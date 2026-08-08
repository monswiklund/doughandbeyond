<script lang="ts">
	import { onMount } from 'svelte';
	import 'leaflet/dist/leaflet.css';
	import type { LayerGroup, Map as LeafletMap, Marker } from 'leaflet';

	interface Store {
		id: string;
		name: string;
		chain: string;
		city: string;
		region: string;
		address: string;
		products: string[];
		inStock: boolean;
		coordinates: [number, number];
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
			inStock: true,
			coordinates: [58.505, 13.157]
		},
		{
			id: '2',
			name: 'Coop Forum Skövde',
			chain: 'Coop',
			city: 'Skövde',
			region: 'Västra Götaland',
			address: 'Norra Metallvägen 1, 541 39 Skövde',
			products: ['Margherita', 'Diablo'],
			inStock: true,
			coordinates: [58.391, 13.845]
		},
		{
			id: '3',
			name: 'ICA Focus Göteborg',
			chain: 'ICA',
			city: 'Göteborg',
			region: 'Västra Götaland',
			address: 'Åvägen 42, 412 51 Göteborg',
			products: ['Margherita', 'Diablo', 'Prosciutto Cotto'],
			inStock: true,
			coordinates: [57.696, 11.987]
		},
		{
			id: '4',
			name: 'Hemköp Nordstan Göteborg',
			chain: 'Hemköp',
			city: 'Göteborg',
			region: 'Västra Götaland',
			address: 'Götgatan 10, 411 05 Göteborg',
			products: ['Margherita', 'Diablo'],
			inStock: true,
			coordinates: [57.707, 11.967]
		},
		{
			id: '5',
			name: 'ICA Maxi Lindhagen Stockholm',
			chain: 'ICA Maxi',
			city: 'Stockholm',
			region: 'Stockholm',
			address: 'Lindhagensgatan 118, 112 51 Stockholm',
			products: ['Margherita', 'Diablo', 'Chicken Feta'],
			inStock: true,
			coordinates: [59.332, 18.056]
		},
		{
			id: '6',
			name: 'Coop Daglivs Kungsholmen',
			chain: 'Coop',
			city: 'Stockholm',
			region: 'Stockholm',
			address: 'Sankt Eriksgatan 34, 112 36 Stockholm',
			products: ['Margherita', 'Diablo'],
			inStock: true,
			coordinates: [59.331, 18.047]
		},
		{
			id: '7',
			name: 'ICA Maxi Malmö',
			chain: 'ICA Maxi',
			city: 'Malmö',
			region: 'Skåne',
			address: 'Cypressvägen 6, 213 63 Malmö',
			products: ['Margherita', 'Diablo'],
			inStock: true,
			coordinates: [55.605, 13.004]
		},
		{
			id: '8',
			name: 'City Gross Jönköping',
			chain: 'City Gross',
			city: 'Jönköping',
			region: 'Småland',
			address: 'Bataljonsgatan 2, 553 05 Jönköping',
			products: ['Margherita', 'Kebab Pizza'],
			inStock: true,
			coordinates: [57.783, 14.162]
		}
	];

	let searchQuery = $state('');
	let selectedRegion = $state('all');
	let selectedStoreId = $state<string | null>(null);
	let mapElement: HTMLDivElement;
	let mapReady = $state(false);
	let leafletApi: typeof import('leaflet') | null = null;
	let mapInstance: LeafletMap | null = null;
	let markerLayer: LayerGroup | null = null;
	const markersById = new Map<string, Marker>();

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

	let selectedStore = $derived(() => {
		return filteredStores().find((store) => store.id === selectedStoreId) ?? null;
	});

	function selectStore(storeId: string) {
		selectedStoreId = selectedStoreId === storeId ? null : storeId;
	}

	function escapeHtml(value: string) {
		return value.replace(/[&<>"']/g, (character) => {
			const entities: Record<string, string> = {
				'&': '&amp;',
				'<': '&lt;',
				'>': '&gt;',
				'"': '&quot;',
				"'": '&#039;'
			};
			return entities[character];
		});
	}

	function createMarkerIcon(active: boolean) {
		return leafletApi!.divIcon({
			className: 'retailer-map-icon',
			html: `<span class="retailer-map-pin${active ? ' is-active' : ''}" aria-hidden="true"></span>`,
			iconSize: [32, 40],
			iconAnchor: [16, 40],
			popupAnchor: [0, -38]
		});
	}

	onMount(() => {
		let disposed = false;

		const initializeMap = async () => {
			const importedLeaflet = await import('leaflet');
			if (disposed) return;

			leafletApi = importedLeaflet.default;
			mapInstance = leafletApi.map(mapElement, {
				zoomControl: true,
				scrollWheelZoom: false,
				minZoom: 4,
				maxZoom: 15
			});

			leafletApi
				.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
					attribution: '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">OpenStreetMap</a> contributors',
					maxZoom: 19
				})
				.addTo(mapInstance);

			markerLayer = leafletApi.layerGroup().addTo(mapInstance);
			mapInstance.fitBounds(leafletApi.latLngBounds(stores.map((store) => store.coordinates)), {
				padding: [30, 30],
				maxZoom: 6
			});
			mapReady = true;
			setTimeout(() => mapInstance?.invalidateSize(), 0);
		};

		void initializeMap();

		return () => {
			disposed = true;
			mapInstance?.remove();
			mapInstance = null;
			markerLayer = null;
			leafletApi = null;
			markersById.clear();
		};
	});

	$effect(() => {
		const visibleStores = filteredStores();
		if (!mapReady || !mapInstance || !markerLayer || !leafletApi) return;

		markerLayer.clearLayers();
		markersById.clear();

		for (const store of visibleStores) {
			const marker = leafletApi
				.marker(store.coordinates, { icon: createMarkerIcon(false), title: store.name })
				.bindPopup(
					`<div class="retailer-popup"><strong>${escapeHtml(store.name)}</strong><span>${escapeHtml(store.address)}</span></div>`
				)
				.on('click', () => {
					selectedStoreId = store.id;
				});

			marker.addTo(markerLayer);
			markersById.set(store.id, marker);
		}
	});

	$effect(() => {
		const activeId = selectedStoreId;
		if (!mapReady || !leafletApi) return;

		for (const store of filteredStores()) {
			markersById.get(store.id)?.setIcon(createMarkerIcon(store.id === activeId));
		}
	});
</script>

<section id="aterforsaljare" class="retailer-section">
	<div class="container">
		<div class="section-header">
			<span class="badge badge-gold">• BUTIKER I SVERIGE</span>
			<h2>Hitta närmsta återförsäljare</h2>
			<p>Våra napolitanska pizzor, färdiga att baka av hemma, finns i utvalda ICA, Coop och Hemköp-butiker över hela landet.</p>
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

		<section class="retailer-map" id="butikskarta" aria-labelledby="map-title">
			<div class="map-panel-header">
				<div>
					<h3 id="map-title">Se var pizzorna finns</h3>
					<p>Klicka på en plupp för att se butikens adress.</p>
				</div>
				<div class="map-summary" aria-label={`${filteredStores().length} av ${stores.length} butiker visas`}>
					<strong>{filteredStores().length}</strong>
					<span>av {stores.length} butiker</span>
				</div>
			</div>

			<div class="map-canvas">
				<div bind:this={mapElement} class="leaflet-map" aria-label="OpenStreetMap-karta över Dough & Beyond-återförsäljare"></div>
				<span class="map-scale" aria-hidden="true">OSM · PROTOTYP · PLACERINGARNA ÄR UNGEFÄRLIGA</span>
				</div>

			<div class="map-detail" aria-live="polite">
				{#if filteredStores().length === 0}
					<p>Ingen butik matchar din sökning. Prova en annan stad eller region.</p>
				{:else if selectedStore()}
					<div class="map-detail-copy">
						<span class="map-detail-meta">{selectedStore()?.chain} · {selectedStore()?.city}</span>
						<strong>{selectedStore()?.name}</strong>
						<span>{selectedStore()?.address}</span>
					</div>
					<button class="map-clear" type="button" onclick={() => (selectedStoreId = null)}>Visa alla pluppar</button>
				{:else}
					<p><span class="map-key-dot" aria-hidden="true"></span> Välj en plupp för butikens adress.</p>
				{/if}
			</div>
		</section>

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
				<p>Vill du erbjuda dina kunder vår napolitanska pizzaupplevelse på vårt vis? Våra pizzor görs i Lidköping och säljs färdiga att baka av hemma i butik. Kontakta oss för smakprover och leveransvillkor.</p>
			</div>
			<div class="b2b-action">
				<a href="mailto:info@doughandbeyond.se" class="btn btn-primary">
					<span>Kontakta Bageriet</span>
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

	.retailer-map {
		margin-bottom: 5.5rem;
		padding: 2.25rem 0 0;
		border-top: 1px solid var(--border-subtle);
		border-bottom: 1px solid var(--border-subtle);
	}

	.map-panel-header {
		display: flex;
		align-items: flex-end;
		justify-content: space-between;
		gap: 2rem;
	}

	.map-panel-header h3 {
		font-size: 2rem;
		margin-bottom: 0.45rem;
	}

	.map-panel-header p {
		font-size: 0.92rem;
		color: var(--color-dough-muted);
	}

	.map-summary {
		display: flex;
		align-items: baseline;
		gap: 0.55rem;
		flex-shrink: 0;
		padding-bottom: 0.2rem;
		color: var(--color-dough-muted);
	}

	.map-summary strong {
		font-family: var(--font-display);
		font-size: 2.8rem;
		line-height: 0.9;
		color: var(--color-gold);
	}

	.map-summary span {
		font-size: 0.72rem;
		font-weight: 800;
		letter-spacing: 0.08em;
		text-transform: uppercase;
	}

	.map-canvas {
		position: relative;
		min-height: 500px;
		margin-top: 1.75rem;
		overflow: hidden;
		isolation: isolate;
		border: 1px solid rgba(42, 64, 69, 0.5);
		border-radius: var(--radius-lg);
		background: #bed5da;
	}

	.leaflet-map {
		position: absolute;
		inset: 0;
		z-index: 1;
		font-family: var(--font-sans);
	}

	:global(.leaflet-container) {
		width: 100%;
		height: 100%;
		font-family: var(--font-sans);
		background: #bed5da;
	}

	:global(.leaflet-control-zoom) {
		border: 1px solid rgba(67, 87, 85, 0.3) !important;
		border-radius: 3px !important;
		box-shadow: 0 2px 5px rgba(33, 56, 59, 0.18) !important;
	}

	:global(.leaflet-control-zoom a) {
		width: 2.35rem !important;
		height: 2.35rem !important;
		line-height: 2.2rem !important;
		border: 0 !important;
		background: rgba(247, 246, 239, 0.94) !important;
		color: #3d5755 !important;
	}

	:global(.leaflet-control-zoom a:hover) {
		background: #ffffff !important;
		color: #1e4d48 !important;
	}

	:global(.leaflet-control-attribution) {
		margin: 0 0.5rem 0.5rem 0;
		padding: 0.15rem 0.35rem;
		border-radius: 2px;
		background: rgba(247, 246, 239, 0.84);
		color: #4d6260;
	}

	:global(.leaflet-control-attribution a) {
		color: #315a56;
	}

	:global(.retailer-map-icon) {
		border: 0;
		background: transparent;
	}

	:global(.retailer-map-pin) {
		position: relative;
		display: block;
		width: 2rem;
		height: 2rem;
		border: 3px solid #ffffff;
		border-radius: 50% 50% 50% 0;
		background: var(--color-ember);
		box-shadow: 0 3px 7px rgba(33, 56, 59, 0.36);
		transform: rotate(-45deg);
		transition: var(--transition);
	}

	:global(.retailer-map-pin::after) {
		position: absolute;
		inset: 0.45rem;
		border-radius: 50%;
		background: #ffffff;
		content: '';
	}

	:global(.retailer-map-pin.is-active) {
		background: var(--color-gold);
		transform: rotate(-45deg) scale(1.16);
	}

	:global(.leaflet-popup-content-wrapper),
	:global(.leaflet-popup-tip) {
		border: 1px solid rgba(253, 215, 154, 0.24);
		background: var(--bg-surface);
		color: var(--color-dough);
	}

	:global(.leaflet-popup-content-wrapper) {
		border-radius: 4px;
		box-shadow: 0 6px 16px rgba(0, 0, 0, 0.22);
	}

	:global(.leaflet-popup-close-button) {
		color: var(--color-dough-muted) !important;
	}

	:global(.retailer-popup) {
		display: grid;
		gap: 0.2rem;
		min-width: 180px;
	}

	:global(.retailer-popup strong) {
		font-family: var(--font-display);
		font-size: 0.9rem;
	}

	:global(.retailer-popup span) {
		font-size: 0.76rem;
		color: var(--color-dough-muted);
	}

	.map-scale {
		position: absolute;
		z-index: 3;
		bottom: 1rem;
		left: 1.2rem;
		padding: 0.28rem 0.45rem;
		border: 1px solid rgba(67, 87, 85, 0.24);
		border-radius: 2px;
		background: rgba(247, 246, 239, 0.78);
		font-size: 0.58rem;
		font-weight: 800;
		letter-spacing: 0.16em;
		color: #4d6260;
		pointer-events: none;
	}

	.map-detail {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 1.5rem;
		min-height: 74px;
		padding: 1rem 0 1.1rem;
	}

	.map-detail p {
		display: flex;
		align-items: center;
		gap: 0.6rem;
		font-size: 0.9rem;
		color: var(--color-dough-muted);
	}

	.map-key-dot {
		width: 0.55rem;
		height: 0.55rem;
		flex: 0 0 auto;
		border-radius: 50%;
		background: var(--color-ember);
		box-shadow: 0 0 0 4px rgba(200, 75, 49, 0.16);
	}

	.map-detail-copy {
		display: grid;
		gap: 0.1rem;
	}

	.map-detail-copy strong {
		font-family: var(--font-display);
		font-size: 1.1rem;
		color: var(--color-dough);
	}

	.map-detail-copy > span:last-child {
		font-size: 0.82rem;
		color: var(--color-dough-muted);
	}

	.map-detail-meta {
		font-size: 0.68rem;
		font-weight: 800;
		letter-spacing: 0.1em;
		text-transform: uppercase;
		color: var(--color-gold);
	}

	.map-clear {
		padding: 0;
		border: 0;
		background: transparent;
		font: inherit;
		font-size: 0.72rem;
		font-weight: 800;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		color: var(--color-gold);
		cursor: pointer;
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
		.map-panel-header {
			align-items: flex-start;
			flex-direction: column;
			gap: 1rem;
		}

		.map-summary {
			padding-bottom: 0;
		}

		.b2b-editorial-row {
			flex-direction: column;
			align-items: flex-start;
			gap: 1.5rem;
		}
	}

	@media (max-width: 600px) {
		.map-canvas {
			min-height: 360px;
		}

		.map-detail {
			align-items: flex-start;
			flex-direction: column;
			gap: 0.75rem;
		}

		.map-clear {
			padding: 0.25rem 0;
		}

		.b2b-editorial-row {
			gap: 1rem;
		}

		.stores-editorial-grid {
			grid-template-columns: 1fr;
		}
	}
</style>
