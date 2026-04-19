export type OrderStatus = 'pending' | 'preparing' | 'delivered';

export interface OrderItem {
	name: string;
	quantity: number;
	price: number;
}

export interface Order {
	id: number;
	date: string;
	items: OrderItem[];
	total: number;
	status: OrderStatus;
	restaurantName: string;
	restaurantCuisine: string;
	deliveryAddress: string;
	paymentMethod: string;
	estimatedDelivery?: string;
	estimatedMinutes?: number;
	placedAtTimestamp?: number;
}

export const mockOrders: Order[] = [
	{
		id: 1001,
		date: '2026-04-08',
		items: [
			{ name: 'Margherita Pizza', quantity: 2, price: 12.99 },
			{ name: 'Coca Cola', quantity: 2, price: 2.99 }
		],
		total: 31.96,
		status: 'delivered',
		restaurantName: 'Bella Italia',
		restaurantCuisine: 'Italian',
		deliveryAddress: '123 Main Street, Apt 4B, New York, NY 10001',
		paymentMethod: 'Credit Card (****1234)'
	},
	{
		id: 1002,
		date: '2026-04-07',
		items: [
			{ name: 'Classic Burger', quantity: 1, price: 10.99 },
			{ name: 'French Fries', quantity: 1, price: 4.99 },
			{ name: 'Chocolate Cake', quantity: 1, price: 6.99 }
		],
		total: 22.97,
		status: 'delivered',
		restaurantName: 'American Diner',
		restaurantCuisine: 'American',
		deliveryAddress: '123 Main Street, Apt 4B, New York, NY 10001',
		paymentMethod: 'PayPal'
	},
	{
		id: 1003,
		date: '2026-04-06',
		items: [
			{ name: 'Spaghetti Carbonara', quantity: 1, price: 13.99 },
			{ name: 'Caesar Salad', quantity: 1, price: 8.99 }
		],
		total: 22.98,
		status: 'preparing',
		restaurantName: 'Bella Italia',
		restaurantCuisine: 'Italian',
		deliveryAddress: '123 Main Street, Apt 4B, New York, NY 10001',
		paymentMethod: 'Credit Card (****1234)',
		estimatedDelivery: '15-20 minutes',
		estimatedMinutes: 20,
		placedAtTimestamp: Date.now() - 5 * 60 * 1000,
	},
	{
		id: 1004,
		date: '2026-04-08',
		items: [
			{ name: 'Pepperoni Pizza', quantity: 1, price: 14.99 },
			{ name: 'Chicken Wings', quantity: 1, price: 9.99 }
		],
		total: 24.98,
		status: 'pending',
		restaurantName: 'Bella Italia',
		restaurantCuisine: 'Italian',
		deliveryAddress: '123 Main Street, Apt 4B, New York, NY 10001',
		paymentMethod: 'Credit Card (****1234)',
		estimatedDelivery: 'Waiting for restaurant confirmation',
		estimatedMinutes: 30,
		placedAtTimestamp: Date.now() - 2 * 60 * 1000,
	}
];
