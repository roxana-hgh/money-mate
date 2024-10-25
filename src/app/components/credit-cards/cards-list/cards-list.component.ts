import { Component  } from '@angular/core';

@Component({
  selector: 'app-cards-list',
  templateUrl: './cards-list.component.html',
  styleUrl: './cards-list.component.scss',

})
export class CardsListComponent {
  

  swiperbreakpoints = {
    0: {
      spaceBetween: 5,
      slidesPerView: 1.1,
      center: true
    },
    640: {
      slidesPerView: 2,
    },
    1024: {
      slidesPerView: 3,
    }
  }

  constructor() {}

  ngOnInit() {}

  

}
