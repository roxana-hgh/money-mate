import { Component, Input } from '@angular/core';
import { Account } from '../../../models/account.model';

@Component({
  selector: 'app-credit-card-item',
  templateUrl: './credit-card-item.component.html',
  styleUrl: './credit-card-item.component.scss'
})
export class CreditCardItemComponent {
   @Input() account!: Account;
}
