import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-singup',
  templateUrl: './singup.component.html',
  styleUrl: './singup.component.scss'
})
export class SingupComponent {
  RegisterForm: FormGroup = this.fb.group({
    name: ['', Validators.required],
    email: ['', Validators.required],
    password: ['', Validators.required],
  });

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
  onRegister() {
    const email = this.RegisterForm.get('email')?.value;
    const password = this.RegisterForm.get('password')?.value;
    const name = this.RegisterForm.get('name')?.value;
    this.authService.signup(email, password, name).subscribe(
      (signupData) => {
        console.log(signupData);
        this.wasSuccess = true;
        this.router.navigate(['home']);
      },
      (errorMessage) => {
        this.wasFailed =true;
        console.log('error');
        console.log(errorMessage);
        this.error = errorMessage;
      }
    );
  }
}
