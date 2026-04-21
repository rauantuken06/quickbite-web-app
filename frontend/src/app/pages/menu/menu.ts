import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

import { Dish, DishService } from '../../services/dish.service';
import { Restaurant, RestaurantService } from '../../services/restaurant.service';
import { CartService } from '../../services/cart.service';

import { LucideAngularModule, Star, Clock } from 'lucide-angular';

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
  categories: string[] = ['All'];
  toastMessage = '';

  allDishes: Dish[] = [];
  loading = false;

  constructor(
    private restaurantService: RestaurantService,
    private dishService: DishService,
    private cartService: CartService
  ) { }

  ngOnInit(): void {
    this.loadRestaurants();
    this.loadDishes();
  }

  loadRestaurants(): void {
    this.restaurantService.getAll().subscribe({
      next: (data) => {
        this.restaurants = data;
      },
      error: (err) => {
        console.error('Failed to load restaurants', err);
      }
    });
  }

  loadDishes(): void {
    this.loading = true;
    this.dishService.getAll().subscribe({
      next: (data) => {
        this.allDishes = data;
        this.categories = this.buildCategories(data);
        this.loading = false;
      },
      error: (err) => {
        console.error('Failed to load dishes', err);
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
    this.cartService.addItem({
      id: dish.id,
      restaurantId: dish.restaurantId,
      name: dish.name,
      price: dish.price,
      image: dish.image,
      quantity: 1
    });

  }

  showToast(message: string): void {
    this.toastMessage = message;
    setTimeout(() => {
      this.toastMessage = '';
    }, 2000);
  }

  private buildCategories(dishes: Dish[]): string[] {
    const set = new Set<string>();
    for (const d of dishes) set.add(d.category);
    return ['All', ...Array.from(set)];
  }
}