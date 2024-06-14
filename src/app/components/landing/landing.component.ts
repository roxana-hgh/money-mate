import { Component } from '@angular/core';
import { navigateTo } from '../../utils/url-util';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.scss'
})
export class LandingComponent {
  getFullUrl(path: string): string {
    return navigateTo(path);
  }
}
