import { Injectable, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { Auth } from './auth';

@Injectable({
  providedIn: 'root'
})
export class OrderWsService implements OnDestroy {
  private ws: WebSocket | null = null;
  private readonly wsUrl = 'ws://localhost:8000/ws/orders/';

  readonly totalOrders$ = new Subject<number>();

  constructor(private auth: Auth) {}

  connect(): void {
    if (this.ws) {
      return;
    }
    const token = this.auth.getToken();
    if (!token) {
      return;
    }
    this.ws = new WebSocket(`${this.wsUrl}?token=${encodeURIComponent(token)}`);

    this.ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        if (typeof data.total_orders === 'number') {
          this.totalOrders$.next(data.total_orders);
        }
      } catch {
        // ignore malformed messages
      }
    };

    this.ws.onclose = () => {
      this.ws = null;
    };
  }

  disconnect(): void {
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
  }

  ngOnDestroy(): void {
    this.disconnect();
  }
}
