import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { AccountsService } from '../../../services/accounts.service';
import { environment } from '../../../../environments/environment';
import { Account } from '../../../models/account.model';

@Component({
  selector: 'app-add-edit-card',
  templateUrl: './add-edit-card.component.html',
  styleUrl: './add-edit-card.component.scss'
})
export class AddEditCardComponent {

  user !: any
  loading: boolean = false
  deleteloading: boolean = false
  id!: number;
  accountForm!: FormGroup
  account!: Account
  constructor(
  
    private authService: AuthService,
    private accountService: AccountsService,
    private router: Router,
    private route: ActivatedRoute,
  ) {

  
  }

  ngOnInit(): void {
    let id = this.captureIdFromURL();
    this.getUservalue();
    this.id = id;
    if (this.id) {
      this.getCard(this.id);
      this.generateform(this.account);
    } else {
      this.generateform(null);
    }
   

  }
  private captureIdFromURL() {
    return Number(this.route.snapshot.paramMap.get('id'));
  }

  generateform(account: Account | null) {
    this.accountForm = new FormGroup({
      name:  new FormControl(account? account.name : '', Validators.required),
      number: new FormControl(account? account.number : null),
      balance: new FormControl(account? account.balance : '', Validators.required),
      //created_at: new FormControl(account? account.created_at : null),
      color: new FormControl(account? account.color : 'blue'),
      user_id: new FormControl(this.user.id, Validators.required)
    });
  }

  getCard(id: number) {
    this.accountService.getAccount(id).subscribe((res) => {
      this.account = res[0];
      this.generateform(this.account);
      console.log("acc", this.account);
      
    });
  }

  getUservalue() {
    this.authService.user.subscribe((user) => {
      if (user) {
        this.user = user;
        //this.accountForm.patchValue({ user_id: user.id });
      }
    })
  }

  onaddCard() {
    if (this.accountForm.valid) {
      this.loading = true
      console.log("valid");
      console.log(this.accountForm.value);
      if(this.account){
        
        this.accountService.updateAccount(this.account.id, this.accountForm.value).subscribe((res) => {  
          console.log(res);
          this.loading = false
          this.router.navigate([environment.baseHref, 'home']);
      })
      }else{
        this.accountService.addAccount(this.accountForm.value).subscribe((res) => {  
          console.log(res);
          this.loading = false
          this.router.navigate([environment.baseHref, 'home']);
      })
      }
  }
  }

  deleteCard(){
    this.deleteloading = true
    this.accountService.deleteAccount(this.account.id).subscribe(res => {
      this.deleteloading = false
   
      this.router.navigate([environment.baseHref, 'home']);
      
    })
  }
}
