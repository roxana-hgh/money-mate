import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { environment } from '../../../../environments/environment';


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
    this.authService.register(email, name, password).subscribe(
      (result) => {
        console.log(result);
        
        if (result.error) {
          this.error = result.error.message;
        } else {
          this.router.navigate([environment.baseHref, 'home']);
        }
      }
    );
  }
}
