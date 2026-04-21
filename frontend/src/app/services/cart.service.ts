import { Injectable } from '@angular/core';

export interface CartItem {
    id: number;
    restaurantId: number;
    name: string;
    price: number;
    image: string;
    quantity: number;
}

@Injectable({
    providedIn: 'root'
})
export class CartService {
    private storageKey = 'cart';
    items: CartItem[] = [];

    constructor() {
        this.items = this.read();
    }

    get totalPrice(): number {
        return this.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    }

    addItem(item: CartItem): void {
        const existing = this.items.find((x) => x.id === item.id);
        if (existing) {
            existing.quantity += item.quantity;
        } else {
            this.items.push(item);
        }
        this.write();
    }

    updateQuantity(id: number, quantity: number): void {
        const item = this.items.find((x) => x.id === id);
        if (!item) return;

    }

    removeFromChart(id: number): void {
        this.items = this.items.filter((x) => x.id !== id);
        this.write();
    }

    clearCart(): void {
        this.items = [];
        this.write();
    }

    private read(): CartItem[] {
        const raw = localStorage.getItem(this.storageKey);
        if (!raw) return [];
        try {
            return JSON.parse(raw) as CartItem[];
        } catch {
            return [];
        }
    }

    private write(): void {
        localStorage.setItem(this.storageKey, JSON.stringify(this.items));
    }
}

