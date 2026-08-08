<script lang="ts">
	// Open Editorial Timeline Process for pizzor färdiga att baka av
</script>

<section id="frysta-pizzor" class="frozen-section">
	<div class="container">
		<div class="section-header">
			<span class="badge badge-ember">• BAKA AV HEMMA</span>
			<h2>Färdiga att baka av – från frysdisk till din ugn</h2>
			<p>Våra pizzor säljs färdiga att baka av hemma. Förvara dem i frysen och följ anvisningarna på förpackningen för en nygräddad napolitansk pizza.</p>
		</div>

		<!-- Open Horizontal Timeline (No Card Containers or Boxes) -->
		<div class="timeline-container">
			<div class="timeline-line"></div>

			<div class="timeline-step">
				<div class="timeline-node">
					<span class="node-number">01</span>
				</div>
				<div class="timeline-content">
					<h4>72h Långjäsning</h4>
					<p>Degen jäser långsamt i 3 dygn för maximal luftighet och djup smak.</p>
				</div>
			</div>

			<div class="timeline-step">
				<div class="timeline-node">
					<span class="node-number">02</span>
				</div>
				<div class="timeline-content">
					<h4>Färdig att baka av</h4>
					<p>Pizzan säljs färdig att baka av hemma – från frysdisk till ugn.</p>
				</div>
			</div>

			<div class="timeline-step">
				<div class="timeline-node">
					<span class="node-number">03</span>
				</div>
				<div class="timeline-content">
					<h4>Från frysen till ugnen</h4>
					<p>Förvara pizzan fryst och följ gräddningsanvisningarna på förpackningen.</p>
				</div>
			</div>

			<div class="timeline-step">
				<div class="timeline-node">
					<span class="node-number">04</span>
				</div>
				<div class="timeline-content">
					<h4>Baka av hemma</h4>
					<p>Följ anvisningarna på förpackningen – snart har du en nygräddad napolitansk pizza.</p>
				</div>
			</div>
		</div>
	</div>
</section>

<style>
	.frozen-section {
		padding: 5rem 0 6rem 0;
		position: relative;
	}

	.section-header {
		text-align: center;
		max-width: 720px;
		margin: 0 auto 4rem auto;
	}

	.section-header h2 {
		font-size: 2.8rem;
		margin: 0.75rem 0;
	}

	.section-header p {
		font-size: 1.1rem;
		line-height: 1.65;
		color: var(--color-dough-muted);
	}

	/* Open Horizontal Timeline */
	.timeline-container {
		position: relative;
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		gap: 2.5rem;
		margin-top: 4rem;
	}

	.timeline-line {
		position: absolute;
		top: 22px;
		left: 10%;
		right: 10%;
		height: 2px;
		background: linear-gradient(90deg, var(--color-gold) 0%, var(--color-ember) 100%);
		opacity: 0.35;
		z-index: 1;
	}

	.timeline-step {
		position: relative;
		z-index: 2;
		display: flex;
		flex-direction: column;
		align-items: center;
		text-align: center;
		gap: 1.25rem;
	}

	.timeline-node {
		width: 44px;
		height: 44px;
		border-radius: 50%;
		background: var(--bg-dark);
		border: 2px solid var(--color-gold);
		display: flex;
		align-items: center;
		justify-content: center;
		box-shadow: 0 0 0 6px var(--bg-dark);
	}

	.node-number {
		font-family: var(--font-display);
		font-weight: 800;
		font-size: 0.9rem;
		color: var(--color-gold);
	}

	.timeline-content {
		display: flex;
		flex-direction: column;
		gap: 0.4rem;
	}

	.timeline-content h4 {
		font-size: 1.2rem;
		font-weight: 800;
		color: var(--color-dough);
	}

	.timeline-content p {
		font-size: 0.9rem;
		line-height: 1.6;
		color: var(--color-dough-muted);
	}

	@media (max-width: 850px) {
		.timeline-container {
			grid-template-columns: 1fr;
			gap: 3rem;
		}

		.timeline-line {
			top: 0;
			bottom: 0;
			left: 22px;
			right: auto;
			width: 2px;
			height: 100%;
		}

		.timeline-step {
			flex-direction: row;
			text-align: left;
			align-items: flex-start;
		}
	}
</style>
