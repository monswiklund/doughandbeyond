<script lang="ts">
	import { base } from '$app/paths';
	import SeamlessLoopVideo from '$lib/components/SeamlessLoopVideo.svelte';
</script>

<section class="craft-video-section">
	<div class="container">
		<div class="section-intro">
			<div class="intro-left">
				<span class="badge badge-ember">• HANTVERKET BAKOM PIZZAN</span>
				<h2>Från 72h Surdeg Till Din Fryshylla</h2>
			</div>
			<div class="intro-right">
				<p>Se hur vi bakar varje pizza för hand i vårt bageri i Lidköping – från den långsamma surdegsjäsningen till den 485-gradiga stenugnen.</p>
			</div>
		</div>

		<!-- Open Asymmetric Editorial Video Showcase (Dual-layer seamless video loop) -->
		<div class="craft-editorial-grid">
			<!-- Video Moment 01 -->
			<div class="craft-editorial-item">
				<div class="video-frame">
					<SeamlessLoopVideo
						src={`${base}/videos/dough_crafting.mp4`}
						fadeDuration={1.2}
					/>
				</div>

				<div class="craft-meta">
					<span class="step-tag">01 / DEGKONSTEN</span>
					<h3>72 Timmar Långjäsning</h3>
					<p>Italienskt Tipo 00-mjöl och surdeg vilar i 3 dygn. Det skapar de ikoniska luftbubblorna och gör pizzan otroligt lättsmält.</p>
					<a href="https://doughandbeyond.se/kontakta-oss/" target="_blank" rel="noopener" class="deg-guide-btn">
						<span>Klicka här för att se hur du använder vår deg! →</span>
					</a>
				</div>
			</div>

			<!-- Video Moment 02 (Offset Staggered with seamless video loop) -->
			<div class="craft-editorial-item staggered">
				<div class="video-frame">
					<SeamlessLoopVideo
						src={`${base}/videos/bakery_moments.mp4`}
						startTime={3}
						fadeDuration={1.2}
					/>
				</div>

				<div class="craft-meta">
					<span class="step-tag">02 / STENUGNSBAKAT</span>
					<h3>Gräddad i 485°C & Chockfryst</h3>
					<p>Pizzorna gräddas på sekunder på glödhet häll i Lidköping innan de snabbfryses för att låsa in den nybakade restaurangkvaliteten.</p>
				</div>
			</div>
		</div>
	</div>
</section>

<style>
	.craft-video-section {
		padding: 6rem 0 8rem 0;
	}

	.section-intro {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 4rem;
		align-items: end;
		margin-bottom: 4.5rem;
		padding-bottom: 2rem;
		border-bottom: 1px solid var(--border-subtle);
	}

	.intro-left h2 {
		font-size: 2.8rem;
		margin-top: 0.75rem;
	}

	.intro-right p {
		font-size: 1.1rem;
		line-height: 1.65;
		color: var(--color-dough-muted);
	}

	/* Open Asymmetric Editorial Grid */
	.craft-editorial-grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 4rem;
	}

	.craft-editorial-item {
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
	}

	.craft-editorial-item.staggered {
		margin-top: 2.5rem;
	}

	.video-frame {
		position: relative;
		width: 100%;
		aspect-ratio: 16 / 10;
		overflow: hidden;
		border-radius: var(--radius-sm);
		background: #000;
	}

	.craft-meta {
		display: flex;
		flex-direction: column;
		gap: 0.6rem;
	}

	.step-tag {
		font-size: 0.75rem;
		font-weight: 800;
		text-transform: uppercase;
		letter-spacing: 0.12em;
		color: var(--color-gold);
	}

	.craft-meta h3 {
		font-size: 1.6rem;
		font-weight: 800;
	}

	.craft-meta p {
		font-size: 0.95rem;
		line-height: 1.65;
		color: var(--color-dough-muted);
	}

	.deg-guide-btn {
		display: inline-block;
		margin-top: 0.4rem;
		color: var(--color-gold);
		font-size: 0.88rem;
		font-weight: 700;
		text-decoration: underline;
		transition: var(--transition);
	}

	.deg-guide-btn:hover {
		color: #FFF;
	}

	@media (max-width: 900px) {
		.section-intro {
			grid-template-columns: 1fr;
			gap: 1.5rem;
		}

		.craft-editorial-grid {
			grid-template-columns: 1fr;
			gap: 3.5rem;
		}

		.craft-editorial-item.staggered {
			margin-top: 0;
		}
	}
</style>
