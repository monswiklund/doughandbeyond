import type { MenuItem } from '$lib/types';

export interface AllergenOption {
	id: string;
	label: string;
	keywords: string[];
}

export const allergenOptions: AllergenOption[] = [
	{ id: 'gluten', label: 'Gluten / Vete', keywords: ['vete', 'gluten'] },
	{
		id: 'mjolk',
		label: 'Mjölk / Laktos',
		keywords: ['mjölk', 'ost', 'feta', 'yoghurt', 'fior di latte', 'parmigiano', 'stracciatella']
	},
	{
		id: 'flask',
		label: 'Fläskkött',
		keywords: ['prosciutto', 'salami', 'spianata', 'nduja', 'gris', 'fläsk']
	},
	{ id: 'agg', label: 'Ägg', keywords: ['ägg', 'äggula'] },
	{ id: 'senap', label: 'Senap', keywords: ['senap'] }
];

export function itemHasAllergen(item: MenuItem, allergenId: string): boolean {
	const option = allergenOptions.find((allergen) => allergen.id === allergenId);
	if (!option) return false;

	const fullText = [
		item.name,
		item.description,
		item.ingredients.join(' '),
		item.allergens?.join(' ') ?? ''
	]
		.join(' ')
		.toLowerCase();

	return option.keywords.some((keyword) => fullText.includes(keyword.toLowerCase()));
}

export function itemHasAnySelectedAllergen(item: MenuItem, selectedAllergens: string[]): boolean {
	return selectedAllergens.some((allergenId) => itemHasAllergen(item, allergenId));
}

export function ingredientMatchesAllergen(ingredient: string, selectedAllergens: string[]): boolean {
	if (selectedAllergens.length === 0) return false;

	const ingredientLower = ingredient.toLowerCase();
	return selectedAllergens.some((allergenId) => {
		const option = allergenOptions.find((allergen) => allergen.id === allergenId);
		return option?.keywords.some((keyword) => ingredientLower.includes(keyword.toLowerCase())) ?? false;
	});
}
