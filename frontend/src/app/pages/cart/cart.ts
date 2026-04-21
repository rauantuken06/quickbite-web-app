import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { CartItem, CartService } from '../../services/cart.service';
import { LucideAngularModule } from 'lucide-angular';
import { OrderService } from '../../services/order.service';
import { Auth } from '../../services/auth';


@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterLink, LucideAngularModule,],
  templateUrl: './cart.html',
  styleUrl: './cart.css'
})
export class Cart implements OnInit{
  private cartService = inject(CartService);
  private orderService = inject(OrderService);
  private router = inject(Router);
  showAuthModal = false;
  private auth = inject(Auth);

  deliveryFee = 3.99;
  placing = false;

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
    alert(name + ' removed from cart');
  }

  clearCart(): void {
    this.cartService.clearCart();
  }

  handlePlaceOrder(): void {
    if (this.items.length === 0) {
    alert('Your cart is empty');
    return;
    }
    this.router.navigate(['/order-completion']);
  }
  getFinalTotal(): number {
    return this.totalPrice + this.deliveryFee;
  }
  ngOnInit(): void {
    if (!this.auth.isLoggedIn()) {
      this.showAuthModal = true;
    }
  }
  closeModal(): void {
    this.showAuthModal = false;
    this.router.navigate(['/menu']);
  }
}