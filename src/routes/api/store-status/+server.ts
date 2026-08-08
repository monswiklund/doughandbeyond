import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import type { StoreStatus } from '$lib/types';

export const GET: RequestHandler = async () => {
	const status: StoreStatus = {
		isOpen: true,
		openingHoursToday: '11:00 - 21:00',
		currentWaitMinutes: 15,
		ovenTemperatureCelsius: 485,
		address: 'Staplaregatan 6',
		city: 'Lidköping',
		phone: '0510-123 45'
	};

	return json(status);
};
