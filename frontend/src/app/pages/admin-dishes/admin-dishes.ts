import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Dish, DishService } from '../../services/dish.service';
import { RestaurantService } from '../../services/restaurant.service';

@Component({
  selector: 'app-admin-dishes',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './admin-dishes.html',
  styleUrl: './admin-dishes.css'
})
export class AdminDishes implements OnInit {
  private dishService = inject(DishService);
  private restaurantService = inject(RestaurantService);

  categories = ['Pizza', 'Burgers', 'Pasta', 'Salads', 'Sides', 'Drinks', 'Desserts', 'Sushi', 'Ramen', 'Tacos', 'Steak'];
  cuisines = ['Italian', 'Japanese', 'American', 'Mexican', 'Asian', 'Steakhouse', 'Korean', 'Kazakh'];
  restaurantIds: number[] = [];

  dishes: Dish[] = [];
  isDialogOpen = false;
  editingDish: Dish | null = null;
  loading = false;

  formData = {
    name: '',
    description: '',
    price: '',
    category: '',
    cuisine: '',
    restaurantId: '',
    image: ''
  };

  ngOnInit(): void {
    this.loadRestaurants();
    this.loadDishes();
  }

  loadRestaurants(): void {
    this.restaurantService.getAll().subscribe({
      next: (rows) => {
        this.restaurantIds = rows.map((r) => r.id);
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
        this.dishes = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Failed to load dishes:', err);
        this.loading = false;
      }
    });
  }

  openDialog(dish?: Dish): void {
    if (dish) {
      this.editingDish = dish;
      this.formData = {
        name: dish.name,
        description: dish.description,
        price: String(dish.price),
        category: dish.category,
        cuisine: dish.cuisine,
        restaurantId: String(dish.restaurantId),
        image: dish.image
      };
    } else {
      this.editingDish = null;
      this.formData = {
        name: '',
        description: '',
        price: '',
        category: '',
        cuisine: '',
        restaurantId: '',
        image: ''
      };
    }

  }

  closeDialog(): void {
    this.isDialogOpen = false;
    this.editingDish = null;
  }

  submitForm(): void {
    if (
      !this.formData.name.trim() ||
      !this.formData.description.trim() ||
      !this.formData.price.trim() ||
      !this.formData.category.trim() ||
      !this.formData.cuisine.trim() ||
      !this.formData.restaurantId.trim()
    ) {
      alert('Please fill in all required fields.');
      return;
    }
    const parsedPrice = Number(this.formData.price);
    const parsedRestaurantId = Number(this.formData.restaurantId);

    if (!Number.isFinite(parsedPrice) || parsedPrice <= 0) {
      alert('Price must be a valid positive number');
      return;
    }

    if (!Number.isFinite(parsedRestaurantId) || parsedRestaurantId <= 0) {
      alert('Restaurant ID must be valid');
      return;
    }

    if (this.editingDish) {
      const updatedDish: Dish = {
        ...this.editingDish,
        name: this.formData.name,
        description: this.formData.description,
        price: parsedPrice,
        category: this.formData.category,
        cuisine: this.formData.cuisine,
        restaurantId: parsedRestaurantId,
        image: this.formData.image
      };

      this.dishService.update(updatedDish).subscribe({
        next: () => {
          alert('Dish updated successfully');
          this.closeDialog();
          this.loadDishes();
        },
        error: (err) => {
          console.error('Failed to update dish', err);
          alert('Failed to update dish');
        }
      });
    } else {
      const newDish: Dish = {
        id: 0,
        name: this.formData.name,
        description: this.formData.description,
        price: parsedPrice,
        category: this.formData.category,
        cuisine: this.formData.cuisine,
        restaurantId: parsedRestaurantId,
        image: this.formData.image
      };

      this.dishService.addDish(newDish).subscribe({
        next: () => {
          alert('Dish added successfully');
          this.closeDialog();
          this.loadDishes();
        },
        error: (err) => {
          console.error('Failed to add dish:', err);
          alert('Failed to add dish');
        }
      });
    }
  }

  deleteDish(id: number): void {
    this.dishService.delete(id).subscribe({
      next: () => {
        alert('Dish deleted successfully');
        this.loadDishes();
      },
      error: (err) => {
        console.error('Failed to delete dish:', err);
        alert('Failed to delete dish');
      }
    });
  }
}