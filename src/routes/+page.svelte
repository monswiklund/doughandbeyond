<script lang="ts">
	import Hero from '$lib/components/Hero.svelte';
	import CraftVideoShowcase from '$lib/components/CraftVideoShowcase.svelte';
	import LocationSection from '$lib/components/LocationSection.svelte';
	import { goto } from '$app/navigation';
	import { base } from '$app/paths';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	function goToPizzor() {
		goto(`${base}/pizzor`);
	}
</script>

<Hero storeStatus={data.storeStatus} onExploreMenu={goToPizzor} />

<CraftVideoShowcase />

<LocationSection storeStatus={data.storeStatus} />
