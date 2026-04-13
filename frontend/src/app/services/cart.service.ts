import { Injectable } from "@angular/core";

export interface CartItem {
    id: number,
    name: string,
    price: number,
    image: string,
    quantity: number;
}

@Injectable({
    providedIn: 'root'
})
export class CartService {
    items: CartItem[] = [
        {
            id: 1,
            name: 'Pepperoni Pizza',
            price: 12.99,
            image: 'https://via.placeholder.com/150',
            quantity: 1
        },
        {
            id: 2,
            name: 'Cheeseburger',
            price: 8.5,
            image: 'https://via.placeholder.com/150',
            quantity: 2
        }
    ];

    get totalPrice(): number {
        return this.items.reduce((sum, item) => sum += item.price * item.quantity, 0);
    }

    updateQuantity(id: number, quantity: number): void {
        const item = this.items.find(i => i.id === id);

        if (!item) return;

        if (quantity <= 0) {
            this.removeFromChart(id);
            return;
        }

        item.quantity = quantity;
    } 

    removeFromChart(id: number): void {
        this.items = this.items.filter(item => item.id !== id);
    }

    clearCart(): void {
        this.items = [];
    }
}