<script lang="ts">
	import MenuSection from '$lib/components/MenuSection.svelte';
	import FrozenProductShowcase from '$lib/components/FrozenProductShowcase.svelte';
	import PizzaDetailModal from '$lib/components/PizzaDetailModal.svelte';
	import type { MenuItem } from '$lib/types';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	let selectedPizza = $state<MenuItem | null>(null);
	let selectedPizzaAllergens = $state<string[]>([]);

	function handleSelectPizza(item: MenuItem, selectedAllergens: string[]) {
		selectedPizza = item;
		selectedPizzaAllergens = [...selectedAllergens];
	}

	function handleCloseModal() {
		selectedPizza = null;
	}
</script>

<svelte:head>
	<title>Meny & Pizzor | Dough & Beyond Lidköping</title>
</svelte:head>

<div class="page-container">
	<MenuSection 
		items={data.menuItems} 
		onSelectPizza={handleSelectPizza} 
	/>

	<FrozenProductShowcase />

	<PizzaDetailModal
		item={selectedPizza}
		selectedAllergens={selectedPizzaAllergens}
		onClose={handleCloseModal}
	/>
</div>

<style>
	.page-container {
		padding-top: 2rem;
	}
</style>
