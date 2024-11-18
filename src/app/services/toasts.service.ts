import { Injectable } from '@angular/core';
import { Toast } from '../models/toast';

@Injectable({
  providedIn: 'root',
})
export class ToastsService {
  constructor() {}

  toasts: Toast[] = [];

  show(toast: Toast) {
    this.toasts.push(toast);
  }

  remove(toast: Toast) {
    this.toasts = this.toasts.filter((t: Toast) => t != toast);
  }

  clear() {
    this.toasts.splice(0, this.toasts.length);
  }
}
