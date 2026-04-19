import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { LucideAngularModule, Home, Facebook, Instagram, Twitter, UtensilsCrossed } from 'lucide-angular';

@Component({
  selector: 'app-footer',
  imports: [CommonModule, RouterLink, LucideAngularModule],
  templateUrl: './footer.html',
  styleUrl: './footer.css',
})
export class Footer {
  readonly Facebook = Facebook;
  readonly Instagram = Instagram;
  readonly Twitter = Twitter;
  readonly Home = Home;
  readonly UtensilsCrossed = UtensilsCrossed;
}
