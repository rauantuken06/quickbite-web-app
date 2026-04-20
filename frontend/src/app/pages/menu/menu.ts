import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

import { Dish, dishes as localDishes } from '../../dev_data/dishes';
import { categories } from '../../dev_data/categories';
import { MockData } from '../../services/mock-data';
import { Restaurant } from '../../dev_data/restaurant';

import { DishService } from '../../services/dish.service';

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
export class Menu implements OnInit {
  readonly Star = Star;
  readonly Clock = Clock;

  restaurants: Restaurant[] = [];
  selectedRestaurant: Restaurant | null = null;
  selectedCategory = 'All';
  searchQuery = '';
  categories = categories;
  toastMessage = '';

  allDishes: Dish[] = [];
  loading = false;

  constructor(
    private mockData: MockData,
    private dishService: DishService
  ) {
    this.restaurants = this.mockData.getRestaurants();
  }

  ngOnInit(): void {
    this.loadDishes();
  }

  loadDishes(): void {
    this.loading = true;

    this.dishService.getAll().subscribe({
      next: (data) => {
        this.allDishes = data;
        this.loading = false;
        console.log('Loaded from backend:', data);
      },
      error: (err) => {
        console.error('Backend failed -> fallback to dev_data', err);
        this.allDishes = localDishes;
        this.loading = false;
      }
    });
  }

  get filteredDishes(): Dish[] {
    if (!this.selectedRestaurant) return [];

    return this.allDishes.filter((dish) => {
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

    const existing = cart.find((c) => c.id === dish.id);

    if (existing) {
      existing.quantity += 1;
    } else {
      cart.push({
        id: dish.id,
        name: dish.name,
        price: dish.price,
        image: dish.image,
        quantity: 1
      });
    }

    localStorage.setItem(key, JSON.stringify(cart));

    this.showToast(`${dish.name} added to cart`);
  }

  showToast(message: string) {
    this.toastMessage = message;

    setTimeout(() => {
      this.toastMessage = '';
    }, 2000);
  }
}