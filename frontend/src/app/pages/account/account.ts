import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { mockUser, PaymentMethod } from '../../dev_data/user';

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [CommonModule],
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
}