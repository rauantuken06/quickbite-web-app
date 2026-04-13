import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CartItem, CartService } from '../../services/cart.service';
import { LucideAngularModule, Minus, Plus, Trash2 } from 'lucide-angular';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterLink, LucideAngularModule],
  templateUrl: './cart.html',
  styleUrl: './cart.css',
})
export class Cart {
  private cartService = inject(CartService);

  deliveryFee = 3.99;

  get items(): CartItem[] {
    return this.cartService.items;
  }

  get totalPrice(): number {
    return this.cartService.totalPrice;
  }

  updateQuantity(id: number, quantity: number): void {
    this.cartService.updateQuantity(id, quantity);
  }

  removeFromCart(id: number, name: string): void {
    this.cartService.removeFromChart(id);
    alert(`${name} removed from cart`);
  }

  clearCart(): void {
    this.cartService.clearCart();
  }

  handlePlaceOrder(): void {
    if (this.items.length === 0) {
      alert('Your cart is empty');
      return;
    }

    alert('Order placed successfully!');
    this.clearCart();
  }

  getFinalTotal(): number {
    return this.totalPrice + this.deliveryFee;
  }
}
