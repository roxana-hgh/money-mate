import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'; 
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FooterComponent } from './components/footer/footer.component';
import { TranslatePipe } from './shared/pipes/Translate.pipe';
import { TranslationService } from './services/translation.service';
import { CardsListComponent } from './components/credit-cards/cards-list/cards-list.component';
import { CreditCardItemComponent } from './components/credit-cards/credit-card-item/credit-card-item.component';
import { HomeComponent } from './components/home/home.component';

import { environment } from '../environments/environment';

import { SingupComponent } from './components/auth/singup/singup.component';
import { LoginComponent } from './components/auth/login/login.component';
import { LandingComponent } from './components/landing/landing.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthGuard } from './shared/guards/auth.guard';
import { NotloginGuard } from './shared/guards/notlogin.guard';
import { BaseComponent } from './components/base/base.component';
import { APP_BASE_HREF } from '@angular/common';
import { AddEditCardComponent } from './components/credit-cards/add-edit-card/add-edit-card.component';
import { LoaderComponent } from './components/shared/loader/loader.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { ToastComponent } from './components/shared/toast/toast.component';
import { ToastsService } from './services/toasts.service';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    TranslatePipe,
    CardsListComponent,
    CreditCardItemComponent,
    HomeComponent,
    SingupComponent,
    LoginComponent,
    LandingComponent,
    BaseComponent,
    AddEditCardComponent,
    LoaderComponent,
    ToastComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    CarouselModule
  ],
  
  providers: [TranslationService, AuthGuard, NotloginGuard, ToastsService,
    { provide: APP_BASE_HREF, useValue: environment.baseHref }
    // provideFirebaseApp(() => initializeApp(environment.firebaseConfig)), 
    // provideAuth(() => getAuth()), 
    // provideFirestore(() => getFirestore())
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
