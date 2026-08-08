import type { MenuItem } from '$lib/types';
import { base } from '$app/paths';

export const menuData: MenuItem[] = [
	{
		id: 'margherita',
		name: 'Margherita',
		category: 'pizzor',
		description: 'Pizza i Napolitansk stil: Tomatsås, Fior di Latte, Parmigiano-Reggiano, Basilika, Olivolja EVO.',
		price: 79,
		ingredients: [
			'VETEmjöl',
			'Vatten',
			'Fior di Latte (MJÖLK)',
			'San Marzano Tomatsås',
			'Parmigiano-Reggiano (Opastöriserad MJÖLK)',
			'Färsk Basilika',
			'Olivolja EVO',
			'Havssalt',
			'Honung',
			'Jäst'
		],
		allergens: ['Vete/Gluten', 'Mjölk', 'Kan innehålla spår av Soja & Senap'],
		vegetarian: true,
		image: `${base}/images/pizzor/margherita_1to1.jpg`
	},
	{
		id: 'chicken-feta',
		name: 'Chicken Feta (450g)',
		category: 'pizzor',
		description: 'Pizza i Napolitansk stil: Tomatsås, Fior di Latte, Kycklingkebab, Fetaost, Rödlök, Sumac, Persilja.',
		price: 79,
		ingredients: [
			'VETEmjöl',
			'Vatten',
			'Fior di Latte (MJÖLK)',
			'Kycklingkebab (94% kycklingkött, kryddor)',
			'Fetaost (Får- & GetMJÖLK)',
			'Tomatsås',
			'Rödlök',
			'Sumac',
			'Persilja',
			'Olivolja EVO'
		],
		allergens: ['Vete/Gluten', 'Mjölk', 'Kan innehålla spår av Soja, Senap & Ärta'],
		image: `${base}/images/pizzor/chicken_feta_1to1.jpg`
	},
	{
		id: 'prosciutto-cotto',
		name: 'Prosciutto Cotto',
		category: 'pizzor',
		description: 'Pizza i Napolitansk stil: Tomatsås (Helt skalade tomater), Fior di Latte, Prosciutto Cotto, Ruccola, Olivolja EVO.',
		price: 79,
		ingredients: [
			'VETEmjöl',
			'Vatten',
			'Fior di Latte (MJÖLK)',
			'Prosciutto Cotto (Griskött, naturliga aromer)',
			'San Marzano Tomatsås',
			'Färsk Ruccola',
			'Olivolja EVO'
		],
		allergens: ['Vete/Gluten', 'Mjölk', 'Kan innehålla spår av Soja & Senap'],
		image: `${base}/images/pizzor/prosciutto_1to1.jpg`
	},
	{
		id: 'kebab-pizza',
		name: 'Kebab Pizza',
		category: 'pizzor',
		description: 'Pizza i Napolitansk stil: Tomatsås, Fior di Latte, Jalapeño, Nötkebab, Mild Kebabsås.',
		price: 79,
		ingredients: [
			'VETEmjöl',
			'Vatten',
			'Fior di Latte (MJÖLK)',
			'Nötkebab (84% nötkött, lök, kryddor)',
			'Jalapeño',
			'Mild Kebabsås (YOGHURT, ÄGGULA, SENAPSFRÖ)',
			'Tomatsås',
			'Olivolja EVO'
		],
		allergens: ['Vete/Gluten', 'Mjölk', 'Ägg', 'Senap', 'Kan innehålla spår av Soja'],
		spicy: true,
		image: `${base}/images/pizzor/kebab_1to1.jpg`
	},
	{
		id: 'diablo',
		name: 'Diablo',
		category: 'pizzor',
		description: 'Pizza i Napolitansk stil: Tomatsås, Fior di Latte, Stracciatella, Salami Spianata Calabra, Het ’Nduja Calabrese Piccante, Ruccola, Olivolja EVO.',
		price: 79,
		ingredients: [
			'VETEmjöl',
			'Vatten',
			'Fior di Latte (MJÖLK)',
			'Stracciatella',
			'Salami Spianata Calabra',
			'Het ’Nduja Calabrese Piccante (76% grisfett/kött, 19.5% chili)',
			'San Marzano Tomatsås',
			'Ruccola',
			'Olivolja EVO'
		],
		allergens: ['Vete/Gluten', 'Mjölk', 'Kan innehålla spår av Soja & Senap'],
		spicy: true,
		image: `${base}/images/pizzor/diablo_1to1.jpg`
	}
];
