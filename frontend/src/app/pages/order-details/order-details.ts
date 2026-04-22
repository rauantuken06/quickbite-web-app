import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DinoGame } from '../../components/dino-game/dino-game';
import { Order, OrderService, OrderStatus } from '../../services/order.service';

@Component({
  selector: 'app-order-details',
  standalone: true,
  imports: [CommonModule, DinoGame],
  templateUrl: './order-details.html',
  styleUrl: './order-details.css'
})
export class OrderDetails implements OnInit {
  readonly CIRCUMFERENCE = 2 * Math.PI * 40;
  order: Order | undefined;
  showGame = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private orderService: OrderService
  ) { }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (!id) return;

    this.orderService.getById(id).subscribe({
      next: (order) => {
        this.order = order;
      },
      error: (err) => {
        console.error('Failed to load order', err);
      }
    });
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

  getClockProgress(): number {
    const o = this.order;
    if (!o || !o.estimatedMinutes || !o.placedAtTimestamp) return 0;
    const elapsed = (Date.now() - o.placedAtTimestamp) / 60000;
    return Math.min(elapsed / o.estimatedMinutes, 1);
  }

  getClockDashOffset(): number {
    return this.CIRCUMFERENCE * (1 - this.getClockProgress());
  }

  getElapsedMinutes(): number {
    if (!this.order || !this.order.placedAtTimestamp) return 0;
    return Math.floor((Date.now() - this.order.placedAtTimestamp) / 60000);
  }

  playGame(): void {
    this.showGame = true;
  }

  rating = 0;
  hoveredStar = 0;
  ratingSubmitted = false;

  setRating(star: number): void {
    this.rating = star;
    this.ratingSubmitted = true;
  }

  hoverStar(star: number): void {
    this.hoveredStar = star;
  }

  clearHover(): void {
    this.hoveredStar = 0;
  }

  readonly stars = [1, 2, 3, 4, 5];
}