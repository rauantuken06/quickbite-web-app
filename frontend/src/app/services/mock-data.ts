import { Injectable } from '@angular/core';
import { restaurants, Restaurant } from '../dev_data/restaurant';
import { dishes, Dish } from '../dev_data/dishes';
import { mockOrders, Order } from '../dev_data/orders';
import { categories } from '../dev_data/categories';

@Injectable({
  providedIn: 'root'
})
export class MockData {
  getRestaurants(): Restaurant[] {
    return restaurants;
  }

  getRestaurantById(id: number): Restaurant | undefined {
    return restaurants.find((r) => r.id === id);
  }

  getDishes(): Dish[] {
    return dishes;
  }

  getDishesByRestaurant(restaurantId: number): Dish[] {
    return dishes.filter((d) => d.restaurantId === restaurantId);
  }

  getOrders(): Order[] {
    return mockOrders;
  }

  getCategories(): string[] {
    return categories;
  }
}
