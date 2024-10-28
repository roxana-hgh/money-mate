import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  session: any;
  constructor(private authservice : AuthService){
    this.session = this.authservice.getSession()
  }

  ngOnInit(): void {
    this.authservice.authChanges((_, session) => this.session = session);
    console.log("session", this.session);



   
    
   // this.authservice.autoLogin();
    console.log("isAuthenticated", this.authservice.isAuthenticated());
    console.log("isAuthenticatedSubject", this.authservice.isAuthenticatedSubject);
  }


}
