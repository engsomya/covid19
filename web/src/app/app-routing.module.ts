import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CommonModule } from '@angular/common';
import { PageNotFoundComponent } from './components/common/page-not-found.component';
import { HomeComponent } from './components/common/home.component';
import { RegisterComponent } from './components/users/register.component';
import { DashboardComponent } from './components/users/dashboard.component';
import { MapsComponent } from './components/users/maps.component';
import { ProfileComponent } from './components/users/profile.component';

const appRoutes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'maps', component: MapsComponent },
  { path: 'profile', component: ProfileComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(
      appRoutes
    )
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
