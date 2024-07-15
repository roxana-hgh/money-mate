import { Component, OnInit, TemplateRef, inject } from '@angular/core';
import { NgbActiveOffcanvas, NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslationService } from '../../services/translation.service';
import { AuthService } from '../../services/auth.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {

  constructor(private translationService: TranslationService, private authService: AuthService, private router: Router) {}
  isAuthenticated = false;
  private userSub !: Subscription;

  ngOnInit() {
    console.log(this.isAuthenticated);
    //  to check if the user is authenticated
    this.userSub = this.authService.isAuthenticated().subscribe((isAuth) => {
      this.isAuthenticated = isAuth;
    });
    
    
    console.log(this.isAuthenticated);
  }
  logout(){
    this.authService.logout();
    this.router.navigate([environment.baseHref, 'welcome']);
    this.offcanvasService.dismiss()
    

  }

  set_lang(lang: string) {
    this.translationService.setLanguage(lang);
  }
  private offcanvasService = inject(NgbOffcanvas)

  openMenu(content: TemplateRef<any>) {
		this.offcanvasService.open(content, { position: 'start' });
	}
  ngOnDestroy(): void {
   this.userSub.unsubscribe()
  }

}
