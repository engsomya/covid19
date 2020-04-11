import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';


import { AppComponent } from './app.component';
import { RegisterComponent } from './components/common/register.component';
import { PageNotFoundComponent } from './components/common/page-not-found.component';
import { DashboardComponent } from './components/users/dashboard.component';
import { ProfileComponent } from './components/users/profile.component';
import { MapsComponent } from './components/users/maps.component';


@NgModule({
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        HttpClientModule,
        AppRoutingModule
    ],
    declarations: [
        AppComponent,
        RegisterComponent,
        PageNotFoundComponent,
        DashboardComponent,
        ProfileComponent,
        MapsComponent
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
