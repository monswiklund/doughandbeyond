<script lang="ts">
	import '../app.css';
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import type { LayoutData } from './$types';

	let { data, children }: { data: LayoutData; children: any } = $props();
</script>

<svelte:head>
	<title>Dough & Beyond | Äkta Napolitansk Surdegspizza Lidköping</title>
	<meta name="description" content="Dough & Beyond i Lidköping - 72 timmars långjäst napolitansk surdegspizza, färska ingredienser, frysta pizzor och surdegsbollar för hemmabruk." />
</svelte:head>

<div class="app-root">
	<Header storeStatus={data.storeStatus} />

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
