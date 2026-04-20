import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { mockUser, PaymentMethod } from '../../dev_data/user';
import { LucideAngularModule, SquareUserRound, Mails, PhoneCall, Phone, MapPinHouse, BadgeDollarSign, CreditCard, PencilLine } from 'lucide-angular';

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './account.html',
  styleUrl: './account.css'
})
export class Account {
  user = mockUser;

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
  readonly PencilLine = PencilLine
}