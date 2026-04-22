import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { LucideAngularModule, UtensilsCrossed } from 'lucide-angular';
import { Auth } from '../../services/auth';
import { OrderWsService } from '../../services/order-ws.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, LucideAngularModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  readonly UtensilsCrossed = UtensilsCrossed;

  username = '';
  password = '';
  error = '';
  loading = false;

  constructor(private auth: Auth, private router: Router, private orderWs: OrderWsService) { }

  handleSubmit(event: Event): void {
    event.preventDefault();
    this.error = '';
    this.loading = true;
    this.auth.login({ username: this.username, password: this.password }).subscribe({
      next: () => {
        this.loading = false;
        this.auth.getMe().subscribe(user => this.auth.storeAdminFlag(user.is_staff));        
        this.orderWs.connect();        
        this.router.navigate(['/menu']);
      },
      error: () => {
        this.loading = false;
        this.error = 'Invalid username or password';
      }
    });
  }
}