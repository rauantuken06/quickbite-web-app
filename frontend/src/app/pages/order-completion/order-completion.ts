import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Auth } from '../../services/auth';
import { CartItem, CartService } from '../../services/cart.service';
import { OrderService } from '../../services/order.service';

interface SavedAddress { id: number; address: string; is_default: boolean; }
interface SavedPayment { id: number; type: string; details: string; is_default: boolean; }

@Component({
    selector: 'app-order-completion',
    standalone: true,
    imports: [CommonModule, FormsModule, RouterLink],
    templateUrl: './order-completion.html',
    styleUrl: './order-completion.css'
})
export class OrderCompletion implements OnInit {
    addresses: SavedAddress[] = [];
    paymentMethods: SavedPayment[] = [];
    selectedAddressId: number | null = null;
    selectedPaymentId: number | null = null;
    newAddress = '';
    newPayment = '';
    useNewAddress = false;
    useNewPayment = false;
    placing = false;
    readonly deliveryFee = 3.99;

    constructor(
        private auth: Auth,
        private cartService: CartService,
        private orderService: OrderService,
        private router: Router
    ) {}

    ngOnInit(): void {
        if (this.cartService.items.length === 0) {
            this.router.navigate(['/menu']);
            return;
        }
        this.auth.getMe().subscribe({
            next: (me) => {
                this.addresses = me.addresses || [];
                this.paymentMethods = me.paymentMethods || [];
                const defAddr = this.addresses.find((a) => a.is_default);
                if (defAddr) this.selectedAddressId = defAddr.id;
                const defPay = this.paymentMethods.find((p) => p.is_default);
                if (defPay) this.selectedPaymentId = defPay.id;
            }
        });
    }

    get items(): CartItem[] { return this.cartService.items; }
    get subtotal(): number { return this.cartService.totalPrice; }
    get total(): number { return this.subtotal + this.deliveryFee; }

    private resolvedAddress(): string {
        if (this.useNewAddress) return this.newAddress.trim();
        const a = this.addresses.find((a) => a.id === this.selectedAddressId);
        return a ? a.address : '';
    }

    private resolvedPayment(): string {
        if (this.useNewPayment) return this.newPayment.trim();
        const p = this.paymentMethods.find((p) => p.id === this.selectedPaymentId);
        return p ? p.type + ' - ' + p.details : '';
    }

    confirmOrder(): void {
        const address = this.resolvedAddress();
        const payment = this.resolvedPayment();
        if (!address) { alert('Please select or enter a delivery address'); return; }
        if (!payment) { alert('Please select or enter a payment method'); return; }
        this.placing = true;
        this.orderService.create({
            restaurant: this.items[0].restaurantId,
            items: this.items.map((i) => ({ dishId: i.id, quantity: i.quantity })),
            delivery_address: address,
            payment_method: payment,
            estimated_delivery: '30 minutes'
        }).subscribe({
            next: (created) => {
                this.cartService.clearCart();
                this.placing = false;
                this.router.navigate(['/orders', created.id]);
            },
            error: () => {
                this.placing = false;
                alert('Failed to place order. Please try again.');
            }
        });
    }
}