import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Dish, dishes } from '../../dev_data/dishes';
import { categories } from '../../dev_data/categories';
import { MockData } from '../../services/mock-data';
import { Restaurant } from '../../dev_data/restaurant';
import { LucideAngularModule, Star, Clock } from 'lucide-angular';



interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, LucideAngularModule],
  templateUrl: './menu.html',
  styleUrl: './menu.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]

})
export class Menu {
  readonly Star = Star;
  readonly Clock = Clock;

  restaurants: Restaurant[] = [];
  selectedRestaurant: Restaurant | null = null;
  selectedCategory = 'All';
  searchQuery = '';
  categories = categories;
  toastMessage = '';

  constructor(private mockData: MockData) {
    this.restaurants = this.mockData.getRestaurants();
  }

  get filteredDishes(): Dish[] {
    if (!this.selectedRestaurant) return [];

    return dishes.filter((dish) => {
      const sameRestaurant = dish.restaurantId === this.selectedRestaurant!.id;
      const sameCategory = this.selectedCategory === 'All' || dish.category === this.selectedCategory;
      const sameSearch = dish.name.toLowerCase().includes(this.searchQuery.toLowerCase());
      return sameRestaurant && sameCategory && sameSearch;
    });
  }
  selectRestaurant(restaurant: Restaurant): void {
    this.selectedRestaurant = restaurant;
    this.selectedCategory = 'All';
    this.searchQuery = '';
  }

  backToRestaurants(): void {
    this.selectedRestaurant = null;
    this.selectedCategory = 'All';
    this.searchQuery = '';
  }

  addToCart(dish: Dish): void {
    const key = 'cart';
    const raw = localStorage.getItem(key);
    const cart: CartItem[] = raw ? JSON.parse(raw) : [];
  }
}