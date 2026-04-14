import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

interface Category {
  id: number;
  name: string;
}

@Component({
  selector: 'app-admin-categories',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './admin-categories.html',
  styleUrl: './admin-categories.css',
})
export class AdminCategories {
  categories: Category[] = [
    { id: 1, name: 'Pizza' },
    { id: 2, name: 'Burger' },
    { id: 3, name: 'Drinks' },
    { id: 4, name: 'Desserts' }
  ];

  isDialogOpen = false;
  editingCategory: Category | null = null;
  categoryName = '';

  openDialog(category?: Category): void {
    if (category) {
      this.editingCategory = category;
      this.categoryName = category.name;
    } else {
      this.editingCategory = null;
      this.categoryName = '';
    }

    this.isDialogOpen = true;
  }

  closeDialog(): void {
    this.isDialogOpen = false;
    this.editingCategory = null;
    this.categoryName = '';
  }

  submitForm(): void {
    if (!this.categoryName.trim()) {
      alert('Category name is required');
      return;
    }

    if (this.editingCategory) {
      this.categories = this.categories.map((category) => 
        category.id === this.editingCategory!.id
          ? { ...category, name: this.categoryName.trim() }
          : category
      );

      alert('Category updated successfully');
    } else {
      const newCategory: Category = {
        id: this.categories.length
          ? Math.max(...this.categories.map((c) => c.id)) + 1
          : 1,
        name: this.categoryName.trim()
      };

      this.categories = [...this.categories, newCategory];
      alert('Category added successfully');
    }

    this.closeDialog();
  }

  deleteCategory(id: number): void {
    this.categories = this.categories.filter((category) => category.id !== id);
    alert('Category deleted successfully');
  }
}
