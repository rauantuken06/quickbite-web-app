import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { OrderService, Order, OrderStatus } from '../../services/order.service';

@Component({
  selector: 'app-admin-orders',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './admin-orders.html',
  styleUrl: './admin-orders.css'
})
export class AdminOrders implements OnInit {
  orders: Order[] = [];
  loading = false;
  selectedStatus = '';
  updatingId: number | null = null;

  readonly statuses: OrderStatus[] = ['pending', 'preparing', 'delivered', 'cancelled'];

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders(): void {
    this.loading = true;
    this.orderService.getAllAdmin(this.selectedStatus || undefined).subscribe({
      next: (data) => {
        this.orders = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Failed to load orders', err);
        this.loading = false;
      }
    });
  }

  onStatusFilterChange(value: string): void {
    this.selectedStatus = value;
    this.loadOrders();
  }

  updateStatus(order: Order, newStatus: string): void {
    this.updatingId = order.id;
    this.orderService.updateStatus(order.id, newStatus).subscribe({
      next: (updated) => {
        const idx = this.orders.findIndex(o => o.id === updated.id);
        if (idx !== -1) this.orders[idx] = updated;
        this.updatingId = null;
      },
      error: (err) => {
        console.error('Failed to update status', err);
        this.updatingId = null;
      }
    });
  }

  statusClass(s: string): string {
    switch (s) {
      case 'pending':   return 'badge-pending';
      case 'preparing': return 'badge-preparing';
      case 'delivered': return 'badge-delivered';
      case 'cancelled': return 'badge-cancelled';
      default:          return '';
    }
  }
}
