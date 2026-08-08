import type { LayoutLoad } from './$types';
import { menuData } from '$lib/data/menu';
import { storeStatus } from '$lib/data/store';

export const prerender = true;
export const trailingSlash = 'always';


export const load: LayoutLoad = ({ url }) => {
	return {
		menuItems: menuData,
		storeStatus,
		pathname: url.pathname
	};
};
