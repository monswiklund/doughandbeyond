export type CategoryId = 'all' | 'pizzor' | 'fryst' | 'deg-tillbehor' | 'dryck';

export interface MenuItem {
	id: string;
	name: string;
	category: Exclude<CategoryId, 'all'>;
	description: string;
	price: number;
	ingredients: string[];
	allergens?: string[];
	badge?: string;
	spicy?: boolean;
	vegetarian?: boolean;
	vegan?: boolean;
	image: string;
}

export interface StoreStatus {
	isOpen: boolean;
	openingHoursToday: string;
	currentWaitMinutes: number;
	ovenTemperatureCelsius: number;
	address: string;
	city: string;
	phone: string;
}
