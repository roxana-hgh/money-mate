import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  constructor(private authservice : AuthService){
    
  }

  ngOnInit(): void {
    this.authservice.autoLogin();
    console.log("isAuthenticated", this.authservice.isAuthenticated());
    console.log("isAuthenticatedSubject", this.authservice.isAuthenticatedSubject);
  }
}
