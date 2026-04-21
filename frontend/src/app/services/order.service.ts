import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

export type OrderStatus = 'pending' | 'preparing' | 'delivered' | 'cancelled';

export interface OrderItem {
    name: string;
    quantity: number;
    price: number;
}

export interface Order {
    id: number;
    date: string;
    items: OrderItem[];
    total: number;
    status: OrderStatus;
    restaurantName: string;
    restaurantCuisine: string;
    deliveryAddress: string;
    paymentMethod: string;
    estimatedDelivery?: string;
    estimatedMinutes?: number;
    placedAtTimestamp?: number;
}

export interface CreateOrderPayload {
    restaurant: number;
    items: Array<{ dishId: number; quantity: number }>;
    delivery_address: string;
    payment_method: string;
    estimated_delivery: string;
}

interface ApiOrder {
    id: number;
    date: string;
    items: Array<{ name: string; quantity: number; price: number }>;
    total: number;
    status: OrderStatus;
    restaurantName: string;
    restaurantCuisine: string;
    delivery_address: string;
    payment_method: string;
    estimated_delivery: string;
}

@Injectable({
    providedIn: 'root'
})
export class OrderService {
    private http = inject(HttpClient);
    private apiUrl = 'http://localhost:8000/api/orders/';

    getAll(): Observable<Order[]> {
        return this.http.get<ApiOrder[]>(this.apiUrl).pipe(
            map((rows) => rows.map((o) => this.mapOrder(o)))
        );
    }

    getById(id: number): Observable<Order> {
        return this.http.get<ApiOrder>(this.apiUrl + id + '/').pipe(
            map((o) => this.mapOrder(o))
        );
    }

    create(payload: CreateOrderPayload): Observable<Order> {
        return this.http.post<ApiOrder>(this.apiUrl, payload).pipe(
            map((o) => this.mapOrder(o))
        );
    }

    private mapOrder(o: ApiOrder): Order {
        const minutes = this.extractMinutes(o.estimated_delivery);
        const ts = o.date ? new Date(o.date).getTime() : undefined;
        return {
            id: o.id,
            date: o.date ? o.date.slice(0, 10) : '',
            items: o.items || [],
            total: o.total,
            status: o.status,
            restaurantName: o.restaurantName,
            restaurantCuisine: this.toTitle(o.restaurantCuisine),
            deliveryAddress: o.delivery_address || '',
            paymentMethod: o.payment_method || '',
            estimatedDelivery: o.estimated_delivery || '',
            estimatedMinutes: minutes,
            placedAtTimestamp: ts
        };
    }

    private extractMinutes(value: string): number | undefined {
        if (!value) return undefined;
        const m = value.match(/(\d+)/);
        return m ? Number(m[1]) : undefined;
    }

    private toTitle(value: string): string {
        if (!value) return '';
        return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
    }
}