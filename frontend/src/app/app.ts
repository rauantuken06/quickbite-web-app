import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet, Router } from '@angular/router';
import { Footer } from './pages/footer/footer';
import { LucideAngularModule, ShoppingCart, PackageOpen, UserRoundCog, UserRound, KeyRound, SquarePlus, UtensilsCrossed, LogOut } from 'lucide-angular';
import { OrderService } from './services/order.service';
import { CartService } from './services/cart.service';
import { Auth } from './services/auth';
import { OrderWsService } from './services/order-ws.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterOutlet, Footer, LucideAngularModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit, OnDestroy {
  readonly ShoppingCart = ShoppingCart;
  readonly PackageOpen = PackageOpen;
  readonly UserRoundCog = UserRoundCog;
  readonly UserRound = UserRound;
  readonly KeyRound = KeyRound;
  readonly SquarePlus = SquarePlus;
  readonly UtensilsCrossed = UtensilsCrossed;
  readonly LogOut = LogOut;

  totalOrders = 0;
  private wsSub?: Subscription;

  constructor(
    public router: Router,
    private orderService: OrderService,
    private cartService: CartService,
    private auth: Auth,
    private orderWs: OrderWsService
  ) { }

  ngOnInit(): void {
    this.wsSub = this.orderWs.totalOrders$.subscribe(count => {
      this.totalOrders = count;
    });
    if (this.auth.isLoggedIn()) {
      this.orderWs.connect();
    }
  }

  ngOnDestroy(): void {
    this.wsSub?.unsubscribe();
    this.orderWs.disconnect();
  }

  get totalItems(): number {
    return this.cartService.items.reduce((sum, item) => sum + item.quantity, 0);
  }

  isActive(path: string): boolean {
    return this.router.url === path;
  }
  isLoggedIn(): boolean {
    return this.auth.isLoggedIn();
  }

  isAdmin(): boolean {
    return this.auth.isAdmin();
  }

  logout(): void {
    this.orderWs.disconnect();
    this.totalOrders = 0;
    this.auth.logout();
  }
}