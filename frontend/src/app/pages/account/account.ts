import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
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
  deliveryAddressId: number | null;
  deliveryAddress: string;
  paymentMethods: PaymentMethod[];
}

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [CommonModule, FormsModule, LucideAngularModule],
  templateUrl: './account.html',
  styleUrl: './account.css'
})
export class Account implements OnInit {
  user: AccountUser = {
    name: '',
    email: '',
    phone: '',
    deliveryAddressId: null,
    deliveryAddress: '',
    paymentMethods: []
  };

  editingPersonal = false;
  editingAddress = false;
  showAddPayment = false;
  editingPaymentId: number | null = null;
  saving = false;

  personalForm = { name: '', email: '', phone: '' };
  addressForm = '';
  newPaymentForm = { type: '', details: '' };
  editPaymentForm = { type: '', details: '' };

  constructor(private auth: Auth) { }

  ngOnInit(): void {
    this.auth.getMe().subscribe({
      next: (me) => {
        const firstAddress = me.addresses && me.addresses.length ? me.addresses[0] : null;
        this.user = {
          name: me.name || me.username,
          email: me.email,
          phone: me.phone || '',
          deliveryAddressId: firstAddress ? firstAddress.id : null,
          deliveryAddress: firstAddress ? firstAddress.address : '',
          paymentMethods: (me.paymentMethods || []).map((m) => ({
            id: m.id,
            type: m.type,
            details: m.details,
            isDefault: m.is_default
          }))
        };
      },
      error: (err) => console.error('Failed to load account', err)
    });
  }

  startEditPersonal(): void {
    this.personalForm = { name: this.user.name, email: this.user.email, phone: this.user.phone };
    this.editingPersonal = true;
  }

  cancelEditPersonal(): void {
    this.editingPersonal = false;
  }

  savePersonalInfo(): void {
    this.saving = true;
    this.auth.updateMe(this.personalForm).subscribe({
      next: (me) => {
        this.user.name = me.name || me.username;
        this.user.email = me.email;
        this.user.phone = me.phone || '';
        this.editingPersonal = false;
        this.saving = false;
      },
      error: (err) => { console.error('Failed to save', err); this.saving = false; }
    });
  }

  startEditAddress(): void {
    this.addressForm = this.user.deliveryAddress;
    this.editingAddress = true;
  }

  cancelEditAddress(): void {
    this.editingAddress = false;
  }

  saveAddress(): void {
    if (!this.addressForm.trim()) return;
    this.saving = true;
    if (this.user.deliveryAddressId !== null) {
      this.auth.updateAddress(this.user.deliveryAddressId, this.addressForm).subscribe({
        next: (addr) => {
          this.user.deliveryAddress = addr.address;
          this.editingAddress = false;
          this.saving = false;
        },
        error: (err) => { console.error('Failed to save address', err); this.saving = false; }
      });
    } else {
      this.auth.addAddress(this.addressForm).subscribe({
        next: (addr) => {
          this.user.deliveryAddress = addr.address;
          this.user.deliveryAddressId = addr.id;
          this.editingAddress = false;
          this.saving = false;
        },
        error: (err) => { console.error('Failed to save address', err); this.saving = false; }
      });
    }
  }

  submitAddPayment(): void {
    if (!this.newPaymentForm.type.trim() || !this.newPaymentForm.details.trim()) return;
    this.saving = true;
    this.auth.addPaymentMethod(this.newPaymentForm.type, this.newPaymentForm.details).subscribe({
      next: (p) => {
        this.user.paymentMethods.push({ id: p.id, type: p.type, details: p.details, isDefault: p.is_default });
        this.newPaymentForm = { type: '', details: '' };
        this.showAddPayment = false;
        this.saving = false;
      },
      error: (err) => { console.error('Failed to add payment method', err); this.saving = false; }
    });
  }

  startEditPayment(method: PaymentMethod): void {
    this.editingPaymentId = method.id;
    this.editPaymentForm = { type: method.type, details: method.details };
  }

  cancelEditPayment(): void {
    this.editingPaymentId = null;
  }

  savePaymentMethod(id: number): void {
    this.saving = true;
    this.auth.updatePaymentMethod(id, this.editPaymentForm).subscribe({
      next: (p) => {
        const idx = this.user.paymentMethods.findIndex(m => m.id === id);
        if (idx !== -1) {
          this.user.paymentMethods[idx] = { ...this.user.paymentMethods[idx], type: p.type, details: p.details };
        }
        this.editingPaymentId = null;
        this.saving = false;
      },
      error: (err) => { console.error('Failed to save payment method', err); this.saving = false; }
    });
  }

  setDefaultPaymentMethod(id: number): void {
    this.auth.updatePaymentMethod(id, { is_default: true }).subscribe({
      next: () => {
        this.user.paymentMethods = this.user.paymentMethods.map((m) => ({
          ...m,
          isDefault: m.id === id
        }));
      },
      error: (err) => console.error('Failed to set default', err)
    });
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

