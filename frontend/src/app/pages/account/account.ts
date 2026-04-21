import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { LucideAngularModule, SquareUserRound, Mails, PhoneCall, MapPinHouse, BadgeDollarSign, CreditCard, PencilLine } from 'lucide-angular';
import { Auth } from '../../services/auth';

interface PaymentMethod {
  id: number;
  type: string;
  details: string;
  isDefault: boolean;
}

interface AccountUser {
  name: string;
  email: string;
  phone: string;
  deliveryAddress: string;
  paymentMethods: PaymentMethod[];
}

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './account.html',
  styleUrl: './account.css'
})
export class Account implements OnInit {
  user: AccountUser = {
    name: '',
    email: '',
    phone: '',
    deliveryAddress: '',
    paymentMethods: []
  };

  constructor(private auth: Auth) { }

  ngOnInit(): void {
    this.auth.getMe().subscribe({
      next: (me) => {
        this.user = {
          name: me.name || me.username,
          email: me.email,
          phone: me.phone || '',
          deliveryAddress: me.addresses && me.addresses.length ? me.addresses[0].address : '',
          paymentMethods: (me.paymentMethods || []).map((m) => ({
            id: m.id,
            type: m.type,
            details: m.details,
            isDefault: m.is_default
          }))
        };
      },
      error: (err) => {
        console.error('Failed to load account', err);
      }
    });
  }

  setDefaultPaymentMethod(id: number): void {
    this.user.paymentMethods = this.user.paymentMethods.map((method) => ({
      ...method,
      isDefault: method.id === id
    }));
  }

  trackByPaymentId(_: number, method: PaymentMethod): number {
    return method.id;
  }

  readonly SquareUserRound = SquareUserRound;
  readonly Mails = Mails;
  readonly PhoneCall = PhoneCall;
  readonly MapPinHouse = MapPinHouse;
  readonly BadgeDollarSign = BadgeDollarSign;
  readonly CreditCard = CreditCard;
  readonly PencilLine = PencilLine;
}

