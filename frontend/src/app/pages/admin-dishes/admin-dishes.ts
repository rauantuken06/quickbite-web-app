import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { DishService } from '../../services/dish.service';
import { restaurants } from '../../dev_data/restaurant';
import { Dish } from '../../dev_data/dishes';

@Component({
  selector: 'app-admin-dishes',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './admin-dishes.html',
  styleUrl: './admin-dishes.css',
})
export class AdminDishes implements OnInit {
  private dishService = inject(DishService);

  categories = ['Pizza', 'Burger', 'Drinks', 'Desserts', 'Salads'];
  cuisines = ['Italian', 'American', 'Asian', 'Mexican'];
  restaurantIds = [1, 2, 3];

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
    image: '',
  };

  ngOnInit(): void {
    this.loadDishes();
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
        price: dish.price.toString(),
        category: dish.category,
        cuisine: dish.cuisine,
        restaurantId: dish.restaurantId.toString(),
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

    this.isDialogOpen = true;
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

    const parsedPrice = parseFloat(this.formData.price);
    const parsedRestaurantId = parseInt(this.formData.restaurantId, 10);
    
    if (Number.isNaN(parsedPrice) || parsedPrice <= 0) {
      alert('Price must be a valid positive number');
      return;
    }

    if (Number.isNaN(parsedRestaurantId) || parsedRestaurantId <= 0) {
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

      this.dishService.update(updatedDish);
      alert('Dish updated successfully');
    } else {
      const newDish: Dish = {
        id: this.dishes.length ? Math.max(...this.dishes.map(d => d.id)) + 1 : 1,
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
