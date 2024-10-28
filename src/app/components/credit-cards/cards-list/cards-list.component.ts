import { Component  } from '@angular/core';
import { AccountsService } from '../../../services/accounts.service';
import { Account } from '../../../models/card.model';

@Component({
  selector: 'app-cards-list',
  templateUrl: './cards-list.component.html',
  styleUrl: './cards-list.component.scss',

})
export class CardsListComponent {
  accounts !: Account[]

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

  constructor(private accountsService: AccountsService) {}

  ngOnInit() {
    this.accountsService.getAccounts().subscribe((res:Account[]) => {
      this.accounts = res
      //console.log("acc",this.accounts);
    });
  }

  

}
