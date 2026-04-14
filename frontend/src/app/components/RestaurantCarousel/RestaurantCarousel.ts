import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-restaurant-carousel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './RestaurantCarousel.html',
  styleUrl: './RestaurantCarousel.css'
})
export class RestaurantCarousel implements OnInit, OnChanges, OnDestroy {
  @Input() photos: string[] = [];
  @Input() restaurantName = 'Restaurant';

  currentIndex = 0;
  isFading = false;

  private autoplayMs = 5500;
  private fadeMs = 420;
  private timerId: ReturnType<typeof setInterval> | null = null;
  private fadeTimerId: ReturnType<typeof setTimeout> | null = null;

  ngOnInit(): void {
    this.startAutoplay();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['photos']) {
      if (!this.photos?.length) {
        this.currentIndex = 0;
        this.stopAutoplay();
        return;
      }

      if (this.currentIndex >= this.photos.length) {
        this.currentIndex = 0;
      }

      this.restartAutoplay();
    }
  }

  ngOnDestroy(): void {
    this.stopAutoplay();
    if (this.fadeTimerId) {
      clearTimeout(this.fadeTimerId);
    }
  }

  next(): void {
    if (!this.photos?.length) return;
    const target = (this.currentIndex + 1) % this.photos.length;
    this.setSlide(target);
  }

  prev(): void {
    if (!this.photos?.length) return;
    const target = (this.currentIndex - 1 + this.photos.length) % this.photos.length;
    this.setSlide(target);
  }

  goTo(index: number): void {
    if (index < 0 || index >= this.photos.length) return;
    this.setSlide(index);
    this.restartAutoplay();
  }

  private setSlide(targetIndex: number): void {
    if (targetIndex === this.currentIndex || this.isFading) return;

    this.isFading = true;
    if (this.fadeTimerId) {
      clearTimeout(this.fadeTimerId);
    }

    this.fadeTimerId = setTimeout(() => {
      this.currentIndex = targetIndex;
      this.isFading = false;
    }, this.fadeMs);
  }

  pauseAutoplay(): void {
    this.stopAutoplay();
  }

  resumeAutoplay(): void {
    this.startAutoplay();
  }

  private startAutoplay(): void {
    if (!this.photos || this.photos.length <= 1 || this.timerId) return;

    this.timerId = setInterval(() => {
      this.next();
    }, this.autoplayMs);
  }

  private stopAutoplay(): void {
    if (!this.timerId) return;
    clearInterval(this.timerId);
    this.timerId = null;
  }

  private restartAutoplay(): void {
    this.stopAutoplay();
    this.startAutoplay();
  }
}