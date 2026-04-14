export interface Restaurant {
  id: number;
  name: string;
  cuisine: string;
  description: string;
  image: string;
  photos: string[];
  rating: number;
  deliveryTime: string;
}

export const restaurants: Restaurant[] = [
  {
    id: 1,
    name: 'Bella Italia',
    cuisine: 'Italian',
    description: 'Authentic Italian cuisine with fresh pasta and wood-fired pizzas',
    image: 'https://images.unsplash.com/photo-1722587539644-03164d2d327b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpdGFsaWFuJTIwcmVzdGF1cmFudCUyMGludGVyaW9yfGVufDF8fHx8MTc3NTU2NTQ4OHww&ixlib=rb-4.1.0&q=80&w=1080',
    photos: [
      'https://images.unsplash.com/photo-1722587539644-03164d2d327b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpdGFsaWFuJTIwcmVzdGF1cmFudCUyMGludGVyaW9yfGVufDF8fHx8MTc3NTU2NTQ4OHww&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1528137871618-79d2761e3fd5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
      'https://images.unsplash.com/photo-1595295333158-4742f28fbd85?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
      'https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080'
    ],
    rating: 4.8,
    deliveryTime: '25-35 min'
  },
  {
    id: 2,
    name: 'American Diner',
    cuisine: 'American',
    description: 'Classic American burgers, fries, and comfort food',
    image: 'https://images.unsplash.com/photo-1728836485840-93054eef0f2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbWVyaWNhbiUyMGRpbmVyJTIwcmVzdGF1cmFudHxlbnwxfHx8fDE3NzU2NDQyMDR8MA&ixlib=rb-4.1.0&q=80&w=1080',
    photos: [
      'https://images.unsplash.com/photo-1728836485840-93054eef0f2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbWVyaWNhbiUyMGRpbmVyJTIwcmVzdGF1cmFudHxlbnwxfHx8fDE3NzU2NDQyMDR8MA&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1551782450-17144efb9c50?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
      'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
      'https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080'
    ],
    rating: 4.6,
    deliveryTime: '20-30 min'
  },
  {
    id: 3,
    name: 'Tokyo Ramen House',
    cuisine: 'Japanese',
    description: 'Traditional Japanese ramen, sushi, and authentic dishes',
    image: 'https://images.unsplash.com/photo-1725122194872-ace87e5a1a8d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxqYXBhbmVzZSUyMHN1c2hpJTIwcmVzdGF1cmFudHxlbnwxfHx8fDE3NzU2NDQyMDV8MA&ixlib=rb-4.1.0&q=80&w=1080',
    photos: [
      'https://images.unsplash.com/photo-1725122194872-ace87e5a1a8d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxqYXBhbmVzZSUyMHN1c2hpJTIwcmVzdGF1cmFudHxlbnwxfHx8fDE3NzU2NDQyMDV8MA&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
      'https://images.unsplash.com/photo-1547592180-85f173990554?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
      'https://images.unsplash.com/photo-1617093727343-374698b1b08d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080'
    ],
    rating: 4.9,
    deliveryTime: '30-40 min'
  },
  {
    id: 4,
    name: 'El Mariachi',
    cuisine: 'Mexican',
    description: 'Vibrant Mexican flavors with fresh tacos and burritos',
    image: 'https://images.unsplash.com/photo-1732798068339-4a686b74589f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZXhpY2FuJTIwcmVzdGF1cmFudCUyMGNvbG9yZnVsfGVufDF8fHx8MTc3NTY0NDIwNXww&ixlib=rb-4.1.0&q=80&w=1080',
    photos: [
      'https://images.unsplash.com/photo-1732798068339-4a686b74589f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZXhpY2FuJTIwcmVzdGF1cmFudCUyMGNvbG9yZnVsfGVufDF8fHx8MTc3NTY0NDIwNXww&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
      'https://images.unsplash.com/photo-1599974579688-8dbdd335c77f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
      'https://images.unsplash.com/photo-1582169296194-e4d644c48063?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080'
    ],
    rating: 4.7,
    deliveryTime: '25-35 min'
  },
  {
    id: 5,
    name: 'Dragon Wok',
    cuisine: 'Asian',
    description: 'Pan-Asian cuisine with noodles, rice, and stir-fry dishes',
    image: 'https://images.unsplash.com/photo-1770552367015-d1261ab90879?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhc2lhbiUyMHJlc3RhdXJhbnQlMjBtb2Rlcm58ZW58MXx8fHwxNzc1NjQ0MjA1fDA&ixlib=rb-4.1.0&q=80&w=1080',
    photos: [
      'https://images.unsplash.com/photo-1770552367015-d1261ab90879?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhc2lhbiUyMHJlc3RhdXJhbnQlMjBtb2Rlcm58ZW58MXx8fHwxNzc1NjQ0MjA1fDA&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
      'https://images.unsplash.com/photo-1585032226651-759b368d7246?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
      'https://images.unsplash.com/photo-1563245372-f21724e3856d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080'
    ],
    rating: 4.5,
    deliveryTime: '30-40 min'
  },
  {
    id: 6,
    name: 'Prime Steakhouse',
    cuisine: 'Steakhouse',
    description: 'Premium cuts of meat and elegant dining experience',
    image: 'https://images.unsplash.com/photo-1766832255363-c9f060ade8b0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdGVha2hvdXNlJTIwcmVzdGF1cmFudCUyMGVsZWdhbnR8ZW58MXx8fHwxNzc1NjQ0MjA1fDA&ixlib=rb-4.1.0&q=80&w=1080',
    photos: [
      'https://images.unsplash.com/photo-1766832255363-c9f060ade8b0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdGVha2hvdXNlJTIwcmVzdGF1cmFudCUyMGVsZWdhbnR8ZW58MXx8fHwxNzc1NjQ0MjA1fDA&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1600891964092-4316c288032e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
      'https://images.unsplash.com/photo-1544025162-d76694265947?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
      'https://images.unsplash.com/photo-1559339352-11d035aa65de?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080'
    ],
    rating: 4.8,
    deliveryTime: '35-45 min'
  }
];