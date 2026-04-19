import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { CartItem, CartService } from '../../services/cart.service';
import { mockOrders, Order } from '../../dev_data/orders';
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
  private router = inject(Router);

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

    const newId = Math.max(...mockOrders.map(o => o.id)) + 1;
    const newOrder: Order = {
      id: newId,
      date: new Date().toISOString().split('T')[0],
      items: this.items.map(i => ({ name: i.name, price: i.price, quantity: i.quantity })),
      total: this.getFinalTotal(),
      status: 'pending',
      restaurantName: 'Bella Italia',
      restaurantCuisine: 'Italian',
      deliveryAddress: '123 Main Street, Apt 4B, New York, NY 10001',
      paymentMethod: 'Credit Card',
      estimatedDelivery: '30 minutes',
      estimatedMinutes: 30,
      placedAtTimestamp: Date.now(),
    };

    mockOrders.push(newOrder);
    this.clearCart();
    this.router.navigate(['/orders', newOrder.id]);
  }

  getFinalTotal(): number {
    return this.totalPrice + this.deliveryFee;
  }
}
