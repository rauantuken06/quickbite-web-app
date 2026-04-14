export interface PaymentMethod {
  id: number;
  type: string;
  details: string;
  isDefault: boolean;
}

export interface MockUser {
  name: string;
  email: string;
  phone: string;
  deliveryAddress: string;
  paymentMethods: PaymentMethod[];
}

export const mockUser: MockUser = {
  name: 'Alex Johnson',
  email: 'alex.johnson@email.com',
  phone: '+1 (555) 123-4567',
  deliveryAddress: '123 Main Street, Apt 4B, New York, NY 10001',
  paymentMethods: [
    { id: 1, type: 'Visa', details: '**** **** **** 1234', isDefault: true },
    { id: 2, type: 'Mastercard', details: '**** **** **** 5678', isDefault: false },
    { id: 3, type: 'PayPal', details: 'alex.johnson@email.com', isDefault: false }
  ]
};