import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Order, OrderService, OrderStatus } from '../../services/order.service';
import { Auth } from '../../services/auth';



@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './orders.html',
  styleUrl: './orders.css'
})
export class Orders implements OnInit {
  orders: Order[] = [];
  expandedOrder: number | null = null;
  loading = false;
  showAuthModal = false;



  constructor(
    private router: Router,
    private orderService: OrderService,
    private auth: Auth
  ) { }

  ngOnInit(): void {
    if (!this.auth.isLoggedIn()) {
      this.showAuthModal = true;
      return;
    }
    this.loading = true;
    this.orderService.getAll().subscribe({
      next: (rows) => {
        this.orders = rows;
        this.loading = false;
      },
      error: (err) => {
        console.error('Failed to load orders', err);
        this.loading = false;
      }
    });
  }

  toggleExpand(orderId: number): void {
    this.expandedOrder = this.expandedOrder === orderId ? null : orderId;
  }

  isExpanded(orderId: number): boolean {
    return this.expandedOrder === orderId;
  }

  viewOrderDetails(orderId: number): void {
    this.router.navigate(['/orders', orderId]);
  }

  getStatusClass(status: OrderStatus): string {
    switch (status) {
      case 'delivered':
        return 'status-delivered';
      case 'preparing':
        return 'status-preparing';
      case 'pending':
      default:
        return 'status-pending';
    }
  }

  getStatusIcon(status: OrderStatus): string {
    switch (status) {
      case 'delivered':
        return 'check_circle';
      case 'preparing':
        return 'schedule';
      case 'pending':
      default:
        return 'inventory_2';
    }
  }

  getItemCountText(count: number): string {
    return count + ' item' + (count > 1 ? 's' : '');
  }

  getLineTotal(price: number, quantity: number): number {
    return price * quantity;
  }

  trackByOrderId(_: number, order: Order): number {
    return order.id;
  }

  trackByIndex(index: number): number {
    return index;
  }
  
  closeModal(): void {
    this.showAuthModal = false;
    this.router.navigate(['/menu']);
  }
}