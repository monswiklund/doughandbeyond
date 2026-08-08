<script lang="ts">
	import Hero from '$lib/components/Hero.svelte';
	import CraftVideoShowcase from '$lib/components/CraftVideoShowcase.svelte';
	import LocationSection from '$lib/components/LocationSection.svelte';
	import { scrollReveal } from '$lib/actions/scrollReveal';
	import { goto } from '$app/navigation';
	import { base } from '$app/paths';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	function goToPizzor() {
		goto(`${base}/pizzor`);
	}
</script>

<Hero storeStatus={data.storeStatus} onExploreMenu={goToPizzor} />

<div
	class="home-reveal home-reveal--craft"
	use:scrollReveal={{ threshold: 0.12, rootMargin: '0px 0px -12% 0px' }}
>
	<CraftVideoShowcase />
</div>

<div
	class="home-reveal home-reveal--location"
	use:scrollReveal={{ threshold: 0.08, rootMargin: '0px 0px -10% 0px' }}
>
	<LocationSection storeStatus={data.storeStatus} />
</div>

<style>
	.home-reveal {
		--reveal-distance: 1.5rem;
		opacity: 1;
		transform: translateY(0);
		transition:
			opacity 680ms cubic-bezier(0.16, 1, 0.3, 1),
			transform 680ms cubic-bezier(0.16, 1, 0.3, 1);
	}

	.home-reveal--location {
		--reveal-distance: 1rem;
		transition-delay: 80ms;
	}

	:global(.home-reveal.is-pending:not(.is-visible)) {
		opacity: 0;
		transform: translateY(var(--reveal-distance));
	}

	@media (prefers-reduced-motion: reduce) {
		.home-reveal,
		.home-reveal--location {
			transition: none;
			transform: none;
		}
	}
</style>
