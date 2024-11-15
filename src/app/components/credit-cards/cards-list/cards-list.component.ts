import { Component } from '@angular/core';
import { AccountsService } from '../../../services/accounts.service';
import { Account } from '../../../models/account.model';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-cards-list',
  templateUrl: './cards-list.component.html',
  styleUrl: './cards-list.component.scss',
})
export class CardsListComponent {
  accounts!: Account[];

  customOptions: OwlOptions = {
    loop: false,
    margin: 10,
    dots: true,
    navSpeed: 700,

    responsive: {
      0: {
        items: 1,
      },
      500: {
        items: 2,
      },
      940: {
        items: 3,
      },
    },
    nav: false,
  };

  constructor(private accountsService: AccountsService) {}

  ngOnInit() {
    this.accountsService.getAccounts().subscribe((res: Account[]) => {
      this.accounts = res;
      this.accounts = this.accounts.sort((a, b) => {
        return (new Date(b.created_at).getTime() -
          new Date(a.created_at).getTime()) as number;
      });
      //console.log("acc", this.accounts);
    });
  }
}
