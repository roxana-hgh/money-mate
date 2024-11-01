import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { AccountsService } from '../../../services/accounts.service';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-add-new-card',
  templateUrl: './add-new-card.component.html',
  styleUrl: './add-new-card.component.scss'
})
export class AddNewCardComponent {
  accountForm: FormGroup = this.fb.group({
    name: ['', Validators.required],
    number: [],
    balance: ['', Validators.required],
    color: ['blue'],
    user_id: ['', Validators.required]
  });
  user !: any
  loading: boolean = false

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private accountService: AccountsService,
    private router: Router
  ) {

  
  }

  ngOnInit(): void {
    this.authService.user.subscribe((user) => {
      if (user) {
        this.user = user;
        
        this.accountForm.patchValue({ user_id: user.id });
      }
    })
  }

  onaddCard() {
    this.loading = true
    if (this.accountForm.valid) {
      console.log("valid");
      console.log(this.accountForm.value);

      this.accountService.addAccount(this.accountForm.value).subscribe((res) => {  
        console.log(res);
        this.loading = false
        this.router.navigate([environment.baseHref, 'home']);

    })
  }
  }
}
