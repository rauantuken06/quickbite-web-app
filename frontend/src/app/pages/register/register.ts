import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { LucideAngularModule, UtensilsCrossed } from 'lucide-angular';
import { Auth } from '../../services/auth';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, LucideAngularModule],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {
  readonly UtensilsCrossed = UtensilsCrossed;

  username = '';
  email = '';
  password = '';
  confirmPassword = '';
  error = '';
  success = false;
  loading = false;

  constructor(private auth: Auth, private router: Router) { }

  handleSubmit(event: Event): void {
    event.preventDefault();
    this.error = '';
    this.success = false;
    if (this.password !== this.confirmPassword) {
      this.error = 'Passwords do not match';
      return;
    }
    this.loading = true;
    this.auth.register({ username: this.username, email: this.email, password: this.password }).subscribe({
      next: () => {
        this.loading = false;
        this.router.navigate(['/login']);
      },
      error: () => {
        this.loading = false;
        this.error = 'Registration failed. Username may already be taken.';
      }
    });
  }
}