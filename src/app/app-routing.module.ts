import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/auth/login/login.component';
import { SingupComponent } from './components/auth/singup/singup.component';
import { AuthGuard } from './shared/guards/auth.guard';
import { NotloginGuard } from './shared/guards/notlogin.guard';
import { LandingComponent } from './components/landing/landing.component';
import { BaseComponent } from './components/base/base.component';
import { AddEditCardComponent } from './components/credit-cards/add-edit-card/add-edit-card.component';

const routes: Routes = [
  //{ path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'welcome', component: LandingComponent, canActivate: [NotloginGuard] },
  { path: '', component: BaseComponent, canActivate: [AuthGuard], canActivateChild: [AuthGuard] , children: [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'add-card', component: AddEditCardComponent },
    { path: 'edit-card/:id', component: AddEditCardComponent },
  ] 
},
  
  { path: 'login', component: LoginComponent, canActivate: [NotloginGuard] },
  { path: 'signup', component: SingupComponent, canActivate: [NotloginGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
