<script lang="ts">
	import { base } from '$app/paths';
	import SeamlessLoopVideo from '$lib/components/SeamlessLoopVideo.svelte';
</script>

<section class="craft-video-section">
	<div class="container">
		<div class="section-intro">
			<div class="intro-left">
				<span class="badge badge-ember">• HANTVERKET BAKOM PIZZAN</span>
				<h2>Från 72h långjäsning till Pizzaluckan</h2>
			</div>
			<div class="intro-right">
				<p>Se hur vi gräddar pizzorna i vår Pizzalucka på plats i Lidköping – från den långsamma jäsningen till den 485-gradiga ugnen.</p>
			</div>
		</div>

		<!-- Open Asymmetric Editorial Video Showcase (Dual-layer seamless video loop) -->
		<div class="craft-editorial-grid">
			<!-- Video Moment 01 -->
			<div class="craft-editorial-item featured">
				<div class="video-frame">
					<SeamlessLoopVideo
						src={`${base}/videos/dough_crafting.mp4`}
						fadeDuration={1.2}
					/>
				</div>

				<div class="craft-meta featured-meta">
					<div class="featured-meta-copy">
						<span class="step-tag">1 / DEGKONSTEN</span>
						<h3>72 Timmar Långjäsning</h3>
					</div>
					<div class="featured-meta-detail">
						<p>Degen får jäsa i 3 dygn med högkvalitativa italienska mjölsorter. Det skapar de ikoniska luftbubblorna och gör pizzan otroligt lättsmält.</p>
						<a href={`${base}/degen`} class="deg-guide-btn">
							<span>Klicka här för att se hur du använder vår deg! →</span>
						</a>
					</div>
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
					<span class="step-tag">2 / PIZZALUCKAN PÅ PLATS</span>
					<h3>Gräddade i vår Pizzalucka</h3>
					<p>På plats gräddar vi pizzorna i vår Pizzalucka.</p>
				</div>
			</div>
		</div>
	</div>
</section>

<style>
	.craft-video-section {
		padding: clamp(5rem, 8vw, 8rem) 0 clamp(7rem, 11vw, 11rem);
	}

	.section-intro {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 4rem;
		align-items: end;
		margin-bottom: clamp(3rem, 5vw, 4.5rem);
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
		grid-template-columns: repeat(12, minmax(0, 1fr));
		column-gap: clamp(2rem, 4vw, 4rem);
		row-gap: clamp(4rem, 7vw, 7rem);
	}

	.craft-editorial-item {
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
	}

	.craft-editorial-item.featured {
		grid-column: 1 / -1;
	}

	.craft-editorial-item.staggered {
		grid-column: 1 / -1;
		margin-top: 1rem;
	}

	.video-frame {
		position: relative;
		width: 100%;
		aspect-ratio: 16 / 10;
		overflow: hidden;
		border-radius: var(--radius-sm);
		background: #000;
	}

	.featured .video-frame {
		width: min(100vw, 1600px);
		aspect-ratio: 2.1 / 1;
		margin-left: 50%;
		transform: translateX(-50%);
		border-radius: 0;
	}

	.staggered .video-frame {
		width: min(100vw, 1600px);
		aspect-ratio: 2.1 / 1;
		margin-left: 50%;
		transform: translateX(-50%);
		border-radius: 0;
	}

	.craft-meta {
		display: flex;
		flex-direction: column;
		gap: 0.6rem;
	}

	.featured-meta {
		display: grid;
		grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
		gap: 1rem clamp(2rem, 7vw, 8rem);
		align-items: start;
	}

	.featured-meta-copy,
	.featured-meta-detail {
		display: flex;
		flex-direction: column;
		gap: 0.6rem;
	}

	.featured-meta-detail {
		padding-top: clamp(1.5rem, 2vw, 1.8rem);
	}

	.staggered .craft-meta {
		width: calc(50% - clamp(1rem, 2vw, 2rem));
		margin-left: auto;
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

	.featured-meta h3 {
		font-size: clamp(1.8rem, 2.5vw, 2.2rem);
		max-width: 18ch;
	}

	.craft-meta p {
		font-size: 0.95rem;
		line-height: 1.65;
		color: var(--color-dough-muted);
	}

	.featured-meta-detail p {
		max-width: 42ch;
		font-size: 1rem;
		font-weight: 500;
		line-height: 1.6;
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
			gap: 4.5rem;
		}

		.craft-editorial-item.featured,
		.craft-editorial-item.staggered {
			grid-column: 1;
		}

		.craft-editorial-item.staggered {
			margin-top: 0;
		}

		.featured-meta {
			grid-template-columns: 1fr;
			gap: 1rem;
		}

		.featured-meta-detail {
			padding-top: 0;
		}

		.staggered .craft-meta {
			width: 100%;
			margin-left: 0;
		}

		.video-frame {
			width: calc(100% + (var(--page-gutter) * 2));
			margin-left: calc(var(--page-gutter) * -1);
			border-radius: 0;
		}

		.featured .video-frame {
			width: calc(100% + (var(--page-gutter) * 2));
			aspect-ratio: 16 / 10;
			margin-left: calc(var(--page-gutter) * -1);
			transform: none;
		}

		.staggered .video-frame {
			width: calc(100% + (var(--page-gutter) * 2));
			aspect-ratio: 16 / 10;
			margin-left: calc(var(--page-gutter) * -1);
			transform: none;
		}
	}
</style>
