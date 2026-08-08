<script lang="ts">
	import { base } from '$app/paths';

	interface FrozenPizza {
		id: string;
		name: string;
		desc: string;
		bakeTime: string;
		bakeTemp: string;
		price: number;
		image: string;
		badge: string;
	}

	const frozenPizzas: FrozenPizza[] = [
		{
			id: 'f-1',
			name: 'Napolitansk Margherita',
			desc: 'Stenugnsbakad i Lidköping, snabbfryst ur 485°C ugnen. San Marzano D.O.P., Fior di Latte & Parmigiano-Reggiano.',
			bakeTime: '4–5 min',
			bakeTemp: '250°C varmluft',
			price: 169,
			image: 'https://weiq-production-moms-product-images.s3.amazonaws.com/product_images/6e0ddf1a-7238-4bf4-9784-b6ebda31db64.',
			badge: 'Bästsäljare'
		},
		{
			id: 'f-2',
			name: 'Napolitansk Diablo & N’duja',
			desc: 'Stark calabrisk N’duja, spianata piccante, stracciatella och ruccola på 72-timmars surdegsbotten.',
			bakeTime: '4–5 min',
			bakeTemp: '250°C varmluft',
			price: 189,
			image: 'https://weiq-production-moms-product-images.s3.amazonaws.com/product_images/d4fb3eb3-3135-4299-a9b1-e6b8df8c0d67.',
			badge: 'Stark & Smakrik'
		}
	];
</script>

<section id="frysta-pizzor" class="frozen-section">
	<div class="container">
		<div class="section-header">
			<span class="badge badge-ember">• HEMMA I DIN UGN</span>
			<h2>Stenugnsbakat i Lidköping – Snabbfryst för Din Fryshylla</h2>
			<p>Vi gräddar pizzorna nästan helt klara i vår 485-gradiga ugn innan de snabbfryses. När du värmer dem hemma återuppstår den krispiga, luftiga kanten som om den vore nybakad!</p>
		</div>

		<div class="steps-flow">
			<div class="step-card glass-panel">
				<span class="step-num">01</span>
				<h4>72h Långjäsning</h4>
				<p>Degen jäser långsamt i 3 dygn för maximal luftighet och djup smak.</p>
			</div>
			<div class="step-arrow">→</div>
			<div class="step-card glass-panel">
				<span class="step-num">02</span>
				<h4>485°C Stenugn</h4>
				<p>Pizzan gräddas på sekunder i ved/stenugnen i bageriet i Lidköping.</p>
			</div>
			<div class="step-arrow">→</div>
			<div class="step-card glass-panel">
				<span class="step-num">03</span>
				<h4>Chockfrysning</h4>
				<p>Låser in fukt och smak direkt så pizzan behåller restaurangkvalitet.</p>
			</div>
			<div class="step-arrow">→</div>
			<div class="step-card glass-panel">
				<span class="step-num">04</span>
				<h4>4 min i Din Ugn</h4>
				<p>In i 250°C varmluft hemma – rykande färsk napolitansk pizza!</p>
			</div>
		</div>

		<div class="frozen-grid">
			{#each frozenPizzas as item (item.id)}
				<div class="frozen-card glass-panel">
					<div class="image-box">
						<img src={item.image} alt={item.name} loading="lazy" />
						<span class="badge badge-gold frozen-badge">{item.badge}</span>
					</div>

					<div class="frozen-details">
						<h3>{item.name}</h3>
						<p>{item.desc}</p>

						<div class="prep-info">
							<div class="prep-item">
								<span>Tillagningstid</span>
								<strong>{item.bakeTime}</strong>
							</div>
							<div class="prep-item">
								<span>Ugnstemperatur</span>
								<strong>{item.bakeTemp}</strong>
							</div>
						</div>

						<div class="frozen-footer">
							<span class="price">{item.price} SEK</span>
							<a href={`${base}/aterforsaljare`} class="btn btn-secondary btn-sm">
								<span>Hitta i Butik</span>
							</a>
						</div>
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>

<style>
	.frozen-section {
		padding: 6rem 0;
		position: relative;
	}

	.section-header {
		text-align: center;
		max-width: 720px;
		margin: 0 auto 3.5rem auto;
	}

	.section-header h2 {
		font-size: 2.6rem;
		margin: 0.75rem 0;
	}

	.steps-flow {
		display: grid;
		grid-template-columns: 1fr auto 1fr auto 1fr auto 1fr;
		align-items: center;
		gap: 1rem;
		margin-bottom: 4rem;
	}

	.step-card {
		padding: 1.5rem;
		border-radius: var(--radius-md);
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		position: relative;
	}

	.step-num {
		font-family: var(--font-brand);
		font-weight: 900;
		font-size: 1.4rem;
		color: var(--color-gold);
	}

	.step-card h4 {
		font-size: 1.05rem;
		font-weight: 700;
	}

	.step-card p {
		font-size: 0.82rem;
		line-height: 1.5;
	}

	.step-arrow {
		font-size: 1.2rem;
		color: var(--color-dough-muted);
	}

	.frozen-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
		gap: 2rem;
	}

	.frozen-card {
		border-radius: var(--radius-md);
		overflow: hidden;
		display: flex;
		flex-direction: column;
		transition: var(--transition);
	}

	.frozen-card:hover {
		transform: translateY(-4px);
		border-color: var(--border-gold);
		box-shadow: none !important;
	}

	.image-box {
		position: relative;
		height: 210px;
	}

	.image-box img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	.frozen-badge {
		position: absolute;
		top: 1rem;
		left: 1rem;
	}

	.frozen-details {
		padding: 1.75rem;
		display: flex;
		flex-direction: column;
		flex-grow: 1;
	}

	.frozen-details h3 {
		font-size: 1.25rem;
		margin-bottom: 0.5rem;
	}

	.frozen-details p {
		font-size: 0.9rem;
		margin-bottom: 1.5rem;
		line-height: 1.5;
	}

	.prep-info {
		display: flex;
		gap: 1.5rem;
		padding: 0.85rem 1rem;
		background: rgba(0, 0, 0, 0.2);
		border-radius: var(--radius-sm);
		border: 1px solid var(--border-subtle);
		margin-bottom: 1.5rem;
	}

	.prep-item {
		display: flex;
		flex-direction: column;
	}

	.prep-item span {
		font-size: 0.72rem;
		color: var(--color-dough-muted);
		text-transform: uppercase;
	}

	.prep-item strong {
		font-size: 0.88rem;
		color: var(--color-dough);
	}

	.frozen-footer {
		margin-top: auto;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.price {
		font-family: var(--font-brand);
		font-weight: 900;
		font-size: 1.3rem;
		color: var(--color-gold);
	}

	@media (max-width: 900px) {
		.steps-flow {
			grid-template-columns: 1fr;
		}
		.step-arrow {
			display: none;
		}
	}
</style>
