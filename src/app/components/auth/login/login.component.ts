import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../../services/auth.service';
import { environment } from '../../../../environments/environment';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  loginForm: FormGroup = this.fb.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
  });
  isAuthenticated: boolean = false;
  wasSuccess: boolean = false;
  wasFailed: boolean = false;
  error!: string;
  loading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {}


  loginSubmit(): void {
    this.wasSuccess = false;
    this.wasFailed = false;
    this.loading = true
    
   
    

    const email = this.loginForm.get('email')?.value;
    const password = this.loginForm.get('password')?.value;

    this.authService.login(email, password).subscribe((result) => {
      if (result.error) {
        this.error = result.error.message;
        this.wasFailed = true;
      } else {
        this.wasSuccess = true;
        this.router.navigate([environment.baseHref, 'home']);
      }

      this.loading = false;
    }
    );
    
  }
}
