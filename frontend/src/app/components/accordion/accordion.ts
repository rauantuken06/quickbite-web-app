import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface AccordionItem {
  title: string;
  content: string;
}

@Component({
  selector: 'app-accordion',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './accordion.html',
  styleUrl: './accordion.css',
})
export class Accordion {
  @Input() items: AccordionItem[] = [];
  @Input() allowMultiple = false;

  openIndexes: number[] = [];

  isOpen(index: number): boolean {
    return this.openIndexes.includes(index);
  }

  toggleItem(index: number): void {
    if (this.allowMultiple) {
      if (this.isOpen(index)) {
        this.openIndexes = this.openIndexes.filter(i => i !== index);
      } else {
        this.openIndexes = [...this.openIndexes, index]
      }
    } else {
      this.openIndexes = this.isOpen(index) ? [] : [index];
    }
  }
}
