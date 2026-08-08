<script lang="ts">
	import { slide } from 'svelte/transition';
	import type { StoreStatus } from '$lib/types';

	interface Props {
		storeStatus: StoreStatus | null;
	}

	let { storeStatus }: Props = $props();

	// Default all closed so user can open/close any question cleanly
	let activeFaq = $state<number | null>(null);

	function toggleFaq(idx: number) {
		if (activeFaq === idx) {
			activeFaq = null; // Allows closing all questions!
		} else {
			activeFaq = idx;
		}
	}

	const faqs = [
		{
			q: 'Varför jäser degen i tre dygn?',
			a: 'När degen får jäsa svalt bryts stärkelse och sockerarter ner. Det ger en luftig kant (cornicione), rik smak och en pizza som är lätt för magen att smälta.'
		},
		{
			q: 'Hur bakar jag av pizzorna hemma?',
			a: 'Sätt ugnen på högsta värme (helst 250°C varmluft). Placera pizzan direkt från frysen på ett varmt galler eller en baksten och följ anvisningarna på förpackningen.'
		},
		{
			q: 'Säljer ni deg för hembak?',
			a: 'Ja! Vi packar färska, färdigportionerade 260g degbollar i 4-pack. Bara att tina, baka ut och grädda hemma.'
		},
		{
			q: 'Kan man beställa catering till företag eller fest i Lidköping?',
			a: 'Självklart! Kontakta oss i god tid så sätter vi ihop en meny med varma nybakade pizzor eller cateringboxar med våra frysta premium-pizzor.'
		}
	];
</script>

<section id="hitta-hit" class="location-section">
	<div class="container">
		<div class="location-grid">
			<!-- Store Info (Unboxed Open Editorial) -->
			<div class="info-column">
				<h2>Bageri & Pizzeria på Staplaregatan 6</h2>
				<p class="subtitle">Välkommen till vårt hantverksbageri i Lidköping där vi gör pizzorna från grunden och serverar dem nygräddade.</p>

				<div class="details-stack">
					<div class="detail-block">
						<span class="detail-label">Adress</span>
						<p class="detail-val">Staplaregatan 6, 531 30 Lidköping</p>
					</div>

					<div class="detail-block">
						<span class="detail-label">Öppettider</span>
						<div class="hours-list">
							<div class="hour-row">
								<span>Måndag – Torsdag</span>
								<strong>11:00 – 20:00</strong>
							</div>
							<div class="hour-row">
								<span>Fredag – Lördag</span>
								<strong>11:00 – 21:30</strong>
							</div>
							<div class="hour-row">
								<span>Söndag</span>
								<strong>12:00 – 20:00</strong>
							</div>
						</div>
					</div>

					<div class="detail-block">
						<span class="detail-label">Kontakt & Beställning</span>
						<p class="detail-val">0510-123 45 • info@doughandbeyond.se</p>
					</div>
				</div>

				<div class="maps-action">
					<a
						href="https://maps.google.com/?q=Staplaregatan+6+Lidk%C3%B6ping"
						target="_blank"
						rel="noopener noreferrer"
						class="btn btn-secondary"
					>
						<span>Öppna i Google Maps</span>
					</a>
				</div>
			</div>

			<!-- FAQ Accordion (Animated Open Editorial) -->
			<div class="faq-column">
				<h3 class="faq-heading">Vanliga Frågor & Svar</h3>
				<div class="accordion-list">
					{#each faqs as faq, idx}
						<div class="faq-row {activeFaq === idx ? 'open' : ''}">
							<button 
								class="faq-header" 
								onclick={() => toggleFaq(idx)}
								aria-expanded={activeFaq === idx}
							>
								<span>{faq.q}</span>
								<span class="faq-icon">{activeFaq === idx ? '−' : '+'}</span>
							</button>
							{#if activeFaq === idx}
								<div class="faq-content" transition:slide={{ duration: 250 }}>
									<p>{faq.a}</p>
								</div>
							{/if}
						</div>
					{/each}
				</div>
			</div>
		</div>
	</div>
</section>

<style>
	.location-section {
		padding: 6rem 0;
	}

	.location-grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 5rem;
		align-items: start;
	}

	.info-column {
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
	}

	.info-column h2 {
		font-size: 2.6rem;
		margin: 0.5rem 0;
	}

	.subtitle {
		font-size: 1.1rem;
		line-height: 1.6;
		color: var(--color-dough-muted);
	}

	.details-stack {
		display: flex;
		flex-direction: column;
		gap: 1.75rem;
		margin: 1rem 0;
	}

	.detail-block {
		display: flex;
		flex-direction: column;
		gap: 0.35rem;
	}

	.detail-label {
		font-size: 0.75rem;
		font-weight: 800;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		color: var(--color-gold);
	}

	.detail-val {
		font-size: 1rem;
		color: var(--color-dough);
	}

	.hours-list {
		display: flex;
		flex-direction: column;
		gap: 0.4rem;
		max-width: 320px;
	}

	.hour-row {
		display: flex;
		justify-content: space-between;
		font-size: 0.95rem;
	}

	.hour-row span {
		color: var(--color-dough-muted);
	}

	.hour-row strong {
		color: var(--color-dough);
	}

	.maps-action {
		margin-top: 0.5rem;
	}

	.faq-column {
		display: flex;
		flex-direction: column;
		gap: 1.75rem;
	}

	.faq-heading {
		font-size: 2.2rem;
	}

	.accordion-list {
		display: flex;
		flex-direction: column;
		gap: 0;
	}

	.faq-row {
		border-bottom: 1px solid var(--border-subtle);
	}

	.faq-header {
		width: 100%;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 1.25rem 0;
		background: none;
		border: none;
		color: var(--color-dough);
		font-family: var(--font-sans);
		font-size: 1.05rem;
		font-weight: 700;
		text-align: left;
		cursor: pointer;
		transition: var(--transition);
	}

	.faq-header:hover {
		color: var(--color-gold);
	}

	.faq-icon {
		font-size: 1.2rem;
		color: var(--color-gold);
		font-weight: 400;
	}

	.faq-content {
		padding-bottom: 1.25rem;
	}

	.faq-content p {
		font-size: 0.95rem;
		line-height: 1.65;
		color: var(--color-dough-muted);
	}

	@media (max-width: 960px) {
		.location-grid {
			grid-template-columns: 1fr;
			gap: 4rem;
		}
	}
</style>
