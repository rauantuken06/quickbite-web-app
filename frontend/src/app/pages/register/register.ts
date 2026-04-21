import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { LucideAngularModule, UtensilsCrossed } from "lucide-angular";

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

  handleSubmit(event: Event): void {
    event.preventDefault();
    this.error = '';
    this.success = false;

  }
}

