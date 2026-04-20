import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { LucideAngularModule, UtensilsCrossed } from 'lucide-angular';

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

  handleSubmit(event: Event) {
    event.preventDefault();
    this.error = '';

  }
}