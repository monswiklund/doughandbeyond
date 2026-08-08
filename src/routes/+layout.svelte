<script lang="ts">
	import '../app.css';
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import type { LayoutData } from './$types';

	let { data, children }: { data: LayoutData; children: any } = $props();
</script>

<svelte:head>
	<title>Dough & Beyond | Äkta napolitansk pizzaupplevelse på vårt vis</title>
	<meta name="description" content="Dough & Beyond i Lidköping – en napolitansk pizzaupplevelse på vårt vis, med 72 timmars långjäsning, pizzor gräddade i Pizzaluckan på plats, frysta pizzor färdiga att baka av och degbollar." />
</svelte:head>

<div class="app-root">
	{@html "<!-- THESIS: Let the dough's journey be the interface; this guide refuses the generic recipe wall. OWN-WORLD: Deep forest, champagne gold, terracotta, editorial serif, sharp rules, and one warm craft video. STORY: A home pizzaiolo understands the sequence, protects the air, and reaches the oven with confidence. FIRST VIEWPORT: A large split hero pairs the promise and primary action with a tall hand-shaped dough film; the route sits under the copy. FORM: Workbench recipe sheet, grounded candidate 7 of 7; surface seed 4921b114. FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, and DESIGN.md -->"}
	<Header storeStatus={data.storeStatus} pathname={data.pathname} />

	<main class="main-content">
		{@render children()}
	</main>

	<Footer />
</div>

<style>
	.app-root {
		min-height: 100vh;
		display: flex;
		flex-direction: column;
	}

	.main-content {
		flex-grow: 1;
	}
</style>
