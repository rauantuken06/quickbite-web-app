import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet, Router } from '@angular/router';
import { mockOrders } from './dev_data/orders';
import { Footer } from './pages/footer/footer';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterOutlet, Footer],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  totalItems = 0;
  totalOrders = mockOrders.length;

  constructor(public router: Router) {}

  isActive(path: string): boolean {
    return this.router.url === path;
  }
}