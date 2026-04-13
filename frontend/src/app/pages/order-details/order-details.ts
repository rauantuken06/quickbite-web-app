import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { mockOrders, Order, OrderStatus } from '../../dev_data/orders';

@Component({
  selector: 'app-order-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './order-details.html',
  styleUrl: './order-details.css'
})
export class OrderDetails implements OnInit {
  order: Order | undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.order = mockOrders.find((o) => o.id === id);
  }

  goBackToOrders(): void {
    this.router.navigate(['/orders']);
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

  getLineTotal(price: number, quantity: number): number {
    return price * quantity;
  }

  trackByIndex(index: number): number {
    return index;
  }
}