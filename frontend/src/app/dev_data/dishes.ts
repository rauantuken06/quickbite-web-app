export interface Dish {
	id: number;
	name: string;
	description: string;
	price: number;
	category: string;
	cuisine: string;
	restaurantId: number;
	image: string;
}

export const dishes: Dish[] = [
	{
		id: 1,
		name: 'Margherita Pizza',
		description: 'Classic pizza with fresh mozzarella, tomatoes, and basil',
		price: 12.99,
		category: 'Pizza',
		cuisine: 'Italian',
		restaurantId: 1,
		image: 'https://images.unsplash.com/photo-1664309641932-0e03e0771b97?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYXJnaGVyaXRhJTIwcGl6emElMjBmb29kfGVufDF8fHx8MTc3NTU5OTIwN3ww&ixlib=rb-4.1.0&q=80&w=1080'
	},
	{
		id: 2,
		name: 'Pepperoni Pizza',
		description: 'Loaded with pepperoni and melted cheese',
		price: 14.99,
		category: 'Pizza',
		cuisine: 'Italian',
		restaurantId: 1,
		image: 'https://images.unsplash.com/photo-1631347155591-c162abe23014?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZXBwZXJvbmklMjBwaXp6YSUyMHNsaWNlfGVufDF8fHx8MTc3NTYyMDA4OHww&ixlib=rb-4.1.0&q=80&w=1080'
	},
	{
		id: 5,
		name: 'Spaghetti Carbonara',
		description: 'Creamy pasta with bacon and parmesan cheese',
		price: 13.99,
		category: 'Pasta',
		cuisine: 'Italian',
		restaurantId: 1,
		image: 'https://images.unsplash.com/photo-1574885014162-92e4f12928db?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcGFnaGV0dGklMjBwYXN0YSUyMGNhcmJvbmFyYXxlbnwxfHx8fDE3NzU1ODA0Njl8MA&ixlib=rb-4.1.0&q=80&w=1080'
	},
	{
		id: 10,
		name: 'Tiramisu',
		description: 'Classic Italian dessert with coffee and mascarpone',
		price: 7.99,
		category: 'Desserts',
		cuisine: 'Italian',
		restaurantId: 1,
		image: 'https://images.unsplash.com/photo-1714385905983-6f8e06fffae1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0aXJhbWlzdSUyMGRlc3NlcnQlMjBjb2ZmZWV8ZW58MXx8fHwxNzc1NTM3NDQ4fDA&ixlib=rb-4.1.0&q=80&w=1080'
	},
	{
		id: 3,
		name: 'Classic Burger',
		description: 'Juicy beef patty with lettuce, tomato, and special sauce',
		price: 10.99,
		category: 'Burgers',
		cuisine: 'American',
		restaurantId: 2,
		image: 'https://images.unsplash.com/photo-1591336277932-f0579b75992b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjbGFzc2ljJTIwY2hlZXNlYnVyZ2VyJTIwZm9vZHxlbnwxfHx8fDE3NzU2NDM3MTB8MA&ixlib=rb-4.1.0&q=80&w=1080'
	},
	{
		id: 8,
		name: 'French Fries',
		description: 'Crispy golden fries with sea salt',
		price: 4.99,
		category: 'Sides',
		cuisine: 'American',
		restaurantId: 2,
		image: 'https://images.unsplash.com/photo-1599211469310-9b0b50a2955a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVuY2glMjBmcmllcyUyMGNyaXNweXxlbnwxfHx8fDE3NzU1NjM5MjJ8MA&ixlib=rb-4.1.0&q=80&w=1080'
	},
	{
		id: 9,
		name: 'Chicken Wings',
		description: 'Crispy fried wings with your choice of sauce',
		price: 9.99,
		category: 'Sides',
		cuisine: 'American',
		restaurantId: 2,
		image: 'https://images.unsplash.com/photo-1600555379765-f82335a7b1b0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGlja2VuJTIwd2luZ3MlMjBmcmllZHxlbnwxfHx8fDE3NzU1NzM2MTl8MA&ixlib=rb-4.1.0&q=80&w=1080'
	},
	{
		id: 7,
		name: 'Chocolate Cake',
		description: 'Rich and moist chocolate cake with ganache',
		price: 6.99,
		category: 'Desserts',
		cuisine: 'American',
		restaurantId: 2,
		image: 'https://images.unsplash.com/photo-1607257882338-70f7dd2ae344?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaG9jb2xhdGUlMjBjYWtlJTIwZGVzc2VydHxlbnwxfHx8fDE3NzU1OTI5Mjl8MA&ixlib=rb-4.1.0&q=80&w=1080'
	},
	{
		id: 11,
		name: 'Sushi Rolls',
		description: 'Fresh salmon and tuna rolls with wasabi and ginger',
		price: 15.99,
		category: 'Sushi',
		cuisine: 'Japanese',
		restaurantId: 3,
		image: 'https://images.unsplash.com/photo-1712183718471-dab51f0748ac?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdXNoaSUyMHJvbGxzJTIwamFwYW5lc2V8ZW58MXx8fHwxNzc1NTM4NzU3fDA&ixlib=rb-4.1.0&q=80&w=1080'
	},
	{
		id: 12,
		name: 'Ramen Bowl',
		description: 'Rich tonkotsu broth with noodles, pork, and soft-boiled egg',
		price: 14.99,
		category: 'Ramen',
		cuisine: 'Japanese',
		restaurantId: 3,
		image: 'https://images.unsplash.com/photo-1697701830191-c2b535e8ec51?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyYW1lbiUyMG5vb2RsZXMlMjBhc2lhbnxlbnwxfHx8fDE3NzU2MjkxNjd8MA&ixlib=rb-4.1.0&q=80&w=1080'
	},
	{
		id: 13,
		name: 'Beef Tacos',
		description: 'Three soft tacos with seasoned beef, salsa, and guacamole',
		price: 11.99,
		category: 'Tacos',
		cuisine: 'Mexican',
		restaurantId: 4,
		image: 'https://images.unsplash.com/photo-1707604341704-74abdc25e52a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0YWNvcyUyMG1leGljYW4lMjBmb29kfGVufDF8fHx8MTc3NTU1NzUwN3ww&ixlib=rb-4.1.0&q=80&w=1080'
	},
	{
		id: 4,
		name: 'Caesar Salad',
		description: 'Fresh romaine lettuce with parmesan and caesar dressing',
		price: 8.99,
		category: 'Salads',
		cuisine: 'Asian',
		restaurantId: 5,
		image: 'https://images.unsplash.com/photo-1739436776460-35f309e3f887?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYWVzYXIlMjBzYWxhZCUyMGZyZXNofGVufDF8fHx8MTc3NTU4NDUzNHww&ixlib=rb-4.1.0&q=80&w=1080'
	},
	{
		id: 14,
		name: 'Grilled Ribeye Steak',
		description: 'Premium 12oz ribeye with herb butter and vegetables',
		price: 29.99,
		category: 'Steak',
		cuisine: 'Steakhouse',
		restaurantId: 6,
		image: 'https://images.unsplash.com/photo-1693422660544-014dd9f3ef73?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdGVhayUyMGdyaWxsZWQlMjBtZWF0fGVufDF8fHx8MTc3NTY0NDIwOXww&ixlib=rb-4.1.0&q=80&w=1080'
	},
	{
		id: 6,
		name: 'Coca Cola',
		description: 'Classic refreshing soda',
		price: 2.99,
		category: 'Drinks',
		cuisine: 'Italian',
		restaurantId: 1,
		image: 'https://images.unsplash.com/photo-1770329374091-4c363812e69f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2NhJTIwY29sYSUyMGRyaW5rJTIwZ2xhc3N8ZW58MXx8fHwxNzc1NTYwODA4fDA&ixlib=rb-4.1.0&q=80&w=1080'
	}
];
