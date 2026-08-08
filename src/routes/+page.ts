import type { PageLoad } from './$types';
import { menuData } from '$lib/data/menu';
import { storeStatus } from '$lib/data/store';

export const load: PageLoad = () => {
	return {
		menuItems: menuData,
		storeStatus
	};
};
