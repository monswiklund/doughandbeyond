import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { menuData } from '$lib/data/menu';

export const GET: RequestHandler = async ({ url }) => {
	const category = url.searchParams.get('category');

	let filtered = menuData;
	if (category && category !== 'all') {
		filtered = menuData.filter((item) => item.category === category);
	}

	return json({
		success: true,
		total: filtered.length,
		items: filtered
	});
};
