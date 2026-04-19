import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet, Router } from '@angular/router';
import { mockOrders } from './dev_data/orders';
import { Footer } from './pages/footer/footer';
import { LucideAngularModule, ShoppingCart, PackageOpen, UserRoundCog, UserRound, User, KeyRound, SquarePlus, UtensilsCrossed } from 'lucide-angular';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterOutlet, Footer, LucideAngularModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  readonly ShoppingCart = ShoppingCart;
  readonly PackageOpen = PackageOpen;
  readonly UserRoundCog = UserRoundCog;
  readonly UserRound = UserRound;
  readonly KeyRound = KeyRound;
  readonly SquarePlus = SquarePlus;
  readonly UtensilsCrossed = UtensilsCrossed;

  totalItems = 0;
  totalOrders = mockOrders.length;

  constructor(public router: Router) {}

  isActive(path: string): boolean {
    return this.router.url === path;
  }
}