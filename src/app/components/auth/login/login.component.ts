import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../../services/auth.service';
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

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  loginSubmit(): void {
    this.wasSuccess = false;
    this.wasFailed = false;

    const email = this.loginForm.get('email')?.value;
    const password = this.loginForm.get('password')?.value;
    this.authService.signIn(email, password).subscribe(
      (signInData) => {
        console.log(signInData);
        this.wasSuccess = true;
        this.router.navigate(['home']);
      },
      (errorMessage) => {
        console.log('error');
        console.log(errorMessage);
        this.error = errorMessage;
      }
    );
    
  }
}
