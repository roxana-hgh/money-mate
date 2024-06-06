import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'; 

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
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    TranslatePipe,
    CardsListComponent,
    CreditCardItemComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [TranslationService, provideFirebaseApp(() => initializeApp({"projectId":"moneymate-83cdf","appId":"1:187782230521:web:e0a2aa81944feacfafcd28","storageBucket":"moneymate-83cdf.appspot.com","apiKey":"AIzaSyB_akkexqHlxGMSiAFC2uro0uNmQQxVQ-0","authDomain":"moneymate-83cdf.firebaseapp.com","messagingSenderId":"187782230521"})), provideAuth(() => getAuth()), provideFirestore(() => getFirestore())],
  bootstrap: [AppComponent]
})
export class AppModule { }
