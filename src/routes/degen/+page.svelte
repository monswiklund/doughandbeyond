<script lang="ts">
	import { base } from '$app/paths';
	import SeamlessLoopVideo from '$lib/components/SeamlessLoopVideo.svelte';
</script>

<svelte:head>
	<title>Så här använder du degen | Dough & Beyond</title>
	<meta
		name="description"
		content="Så här använder du Dough & Beyond-degen: tina, forma och grädda din napolitanska pizza hemma."
	/>
</svelte:head>

<div class="dough-guide">
	<section class="guide-hero" aria-labelledby="guide-title">
		<div class="container hero-grid">
			<div class="hero-copy">
				<nav class="breadcrumb" aria-label="Brödsmulor">
					<a href={`${base}/`}>Hem</a>
					<span aria-hidden="true">/</span>
					<span>Degen</span>
				</nav>

				<h1 id="guide-title">Så här använder du degen:</h1>

				<p class="hero-lead">
					Vår deg är skapad på traditionellt vis med högkvalitativa italienska mjölsorter och lång jäsningstid (72 timmar) – allt för att ge dig en äkta napolitansk pizzaupplevelse på vårt vis.
				</p>
			</div>

			<div class="hero-media" role="img" aria-label="Dough & Beyond-deg som formas för hand">
				<SeamlessLoopVideo src={`${base}/videos/dough_crafting.mp4`} fadeDuration={1.2} />
			</div>
		</div>
	</section>

	<section class="guide-body" aria-label="Instruktioner för degen">
		<div class="container guide-content">
			<section class="guide-section" id="tina" aria-labelledby="tina-title">
				<h2 id="tina-title">Så här använder du degen:</h2>
				<div class="copy-flow">
					<p><strong>Tina i kylskåp</strong> dagen före användning eller i rumstemperatur 6 h.</p>
					<p><strong>Låt jäsa i rumstemperatur</strong> minst 1 timme före bakning, gärna i sin plastburk eller deglåda. (Ofta poppar locket när degen är redo!)</p>
					<p><strong>Mjöla och vänd ner degen</strong> genom att snurra burken, lossa försiktigt med fingrarna om den sitter fast och låt degen falla ner i mjölet.</p>
					<p><strong>Forma pizzan varsamt</strong> – se tips nedan för att bevara den klassiska napolitanska kanten.</p>
				</div>
			</section>

			<section class="guide-section" id="utbakning" aria-labelledby="utbakning-title">
				<h2 id="utbakning-title">Utbakningstips – för en luftig, hög kant:</h2>
				<div class="copy-flow">
					<p>Använd <strong>durumvetemjöl</strong> på arbetsytan så att degen inte fastnar. Strö även mjöl ovanpå degen innan du börjar.</p>
					<p>Tryck ut degen med <strong>fingertopparna från mitten och utåt</strong> – lämna kanten orörd så att luften stannar kvar i den. Undvik kavel, den trycker ut luften och gör kanterna platta.</p>
					<p><strong>Dra försiktigt ut degen</strong> till önskad storlek med händerna.</p>
					<p><strong>Toppa</strong> med dina favoritsmaker!</p>
				</div>

				<p class="tip-line"><strong>Tips:</strong> Använd <strong>äkta mozzarella (Fior di latte)</strong> för att undvika en blöt pizza.</p>
			</section>

			<section class="guide-section" id="graddning" aria-labelledby="graddning-title">
				<h2 id="graddning-title">Gräddning:</h2>
				<div class="copy-flow bake-copy">
					<p>Dra upp pizzan på en <strong>pizzaspade</strong> med lite mjöl under.</p>
					<p><strong>Dra ut den i önskad storlek</strong> direkt på spaden om du vill justera formen.</p>
					<p>Skjut in pizzan på en <strong>förvärmd pizzasten i vanlig ugn eller pizzaugn</strong>.</p>
					<p>Baka vid <strong>250–450°C</strong> (eller så varmt din ugn tillåter) tills pizzan fått fin färg och luftig kant.</p>
				</div>
			</section>
		</div>
	</section>

	<section class="guide-outro" aria-labelledby="outro-title">
		<div class="container outro-inner">
			<h2 id="outro-title">Buona fortuna – nu är det din tur att bli pizzaiolo!</h2>
			<div class="outro-copy">
				<p>Dela gärna ditt resultat med oss på Instagram <a href="https://www.instagram.com/doughandbeyond.se" target="_blank" rel="noopener">@doughandbeyond.se</a>.</p>
				<p>Oavsett om pizzan blir rund, oval eller något däremellan blir vi glada att få visa din pizza.</p>
				<p class="signature">Med varma hälsningar,<br /><strong>Stefan &amp; Patricia</strong></p>
			</div>
		</div>
	</section>
</div>

<style>
	.dough-guide {
		background:
			radial-gradient(circle at 76% 8%, rgba(200, 75, 49, 0.12), transparent 25rem),
			var(--bg-dark);
	}

	.guide-hero {
		padding: clamp(3.5rem, 8vw, 7rem) 0 clamp(4.5rem, 9vw, 8rem);
	}

	.hero-grid {
		display: grid;
		grid-template-columns: minmax(0, 0.95fr) minmax(420px, 1.05fr);
		gap: clamp(3rem, 7vw, 8rem);
		align-items: center;
	}

	.hero-copy {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
	}

	.breadcrumb {
		display: flex;
		align-items: center;
		gap: 0.6rem;
		margin-bottom: clamp(2rem, 5vw, 4rem);
		color: var(--color-dough-muted);
		font-family: var(--font-display);
		font-size: 0.72rem;
		font-weight: 700;
		letter-spacing: 0.1em;
		text-transform: uppercase;
	}

	.breadcrumb a {
		color: var(--color-gold);
		text-decoration: none;
	}

	.breadcrumb a:hover,
	.breadcrumb a:focus-visible {
		color: var(--color-dough);
		text-decoration: underline;
	}

	.hero-copy h1 {
		max-width: 12ch;
		font-size: clamp(2.9rem, 4.2vw, 4.75rem);
		line-height: 0.94;
		letter-spacing: -0.045em;
	}

	.hero-lead {
		max-width: 54ch;
		margin-top: 2rem;
		font-size: clamp(1rem, 1.5vw, 1.18rem);
		line-height: 1.75;
	}

	.hero-media {
		position: relative;
		isolation: isolate;
		min-height: 34rem;
		overflow: hidden;
		background: #111a10;
		border-radius: 48% 48% 2px 2px;
		box-shadow: 0 28px 65px rgba(0, 0, 0, 0.3);
	}

	.hero-media::after {
		position: absolute;
		inset: 1rem;
		z-index: 2;
		border: 1px solid rgba(249, 244, 235, 0.26);
		border-radius: 42% 42% 0 0;
		content: '';
		pointer-events: none;
	}

	.hero-media :global(.seamless-video-container) {
		position: absolute;
		inset: 0;
	}

	.hero-media :global(.video-layer) {
		filter: saturate(0.9) contrast(1.04);
	}

	.guide-body {
		padding: 0 0 clamp(5rem, 10vw, 9rem);
	}

	.guide-content {
		max-width: 960px;
	}

	.guide-section {
		scroll-margin-top: 6rem;
		padding: clamp(4rem, 8vw, 7rem) 0;
		border-top: 1px solid rgba(253, 215, 154, 0.18);
	}

	.guide-section h2 {
		max-width: 20ch;
		color: var(--color-dough);
		font-size: clamp(2rem, 3.5vw, 3.4rem);
		line-height: 0.98;
		letter-spacing: -0.04em;
	}

	.copy-flow {
		max-width: 68ch;
		margin-top: clamp(2.5rem, 5vw, 4.5rem);
	}

	.copy-flow p,
	.tip-line,
	.outro-copy p {
		color: var(--color-dough-muted);
		font-size: 1rem;
		line-height: 1.8;
	}

	.copy-flow p + p {
		margin-top: 1.25rem;
	}

	.copy-flow strong,
	.tip-line strong,
	.signature strong {
		color: var(--color-dough);
		font-weight: 700;
	}

	.tip-line {
		max-width: 58ch;
		margin-top: 3.5rem;
		padding-top: 1.25rem;
		border-top: 1px solid var(--color-ember);
	}

	.guide-outro {
		padding: clamp(5rem, 10vw, 9rem) 0 clamp(6rem, 12vw, 10rem);
		background: var(--bg-surface);
	}

	.outro-inner {
		max-width: 960px;
	}

	.outro-inner h2 {
		max-width: 17ch;
		font-size: clamp(2.1rem, 3.5vw, 3.6rem);
		line-height: 0.98;
	}

	.outro-copy {
		max-width: 58ch;
		margin-top: 2rem;
	}

	.outro-copy p + p {
		margin-top: 0.8rem;
	}

	.outro-copy a {
		color: var(--color-gold);
		font-weight: 700;
		text-decoration: none;
	}

	.outro-copy a:hover,
	.outro-copy a:focus-visible {
		color: var(--color-dough);
		text-decoration: underline;
	}

	.signature {
		margin-top: 2rem;
		font-family: var(--font-heading);
		font-size: 1.15rem !important;
		line-height: 1.5 !important;
	}

	.signature strong {
		font-weight: 400;
	}

	@media (max-width: 980px) {
		.hero-grid {
			grid-template-columns: minmax(0, 0.9fr) minmax(300px, 1.1fr);
			gap: 3rem;
		}

		.hero-copy h1 {
			font-size: clamp(2.7rem, 5vw, 4.1rem);
		}
	}

	@media (max-width: 760px) {
		.guide-hero {
			padding-top: 2.5rem;
		}

		.hero-grid {
			grid-template-columns: 1fr;
			gap: 3.5rem;
		}

		.breadcrumb {
			margin-bottom: 2.5rem;
		}

		.hero-copy h1 {
			max-width: 11ch;
			font-size: clamp(2.8rem, 11vw, 4.4rem);
		}

		.hero-lead {
			font-size: 1rem;
		}

		.hero-media {
			min-height: 30rem;
		}

		.guide-section {
			padding: 4rem 0;
		}

		.guide-section h2 {
			font-size: clamp(2rem, 8.5vw, 3.1rem);
		}

		.copy-flow {
			margin-top: 2.5rem;
		}
	}

	@media (max-width: 420px) {
		.hero-media {
			min-height: 25rem;
		}
	}
</style>
