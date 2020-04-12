import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AgmCoreModule } from '@agm/core';

import { AppComponent } from './app.component';
import { RegisterComponent } from './components/users/register.component';
import { PageNotFoundComponent } from './components/common/page-not-found.component';
import { DashboardComponent } from './components/users/dashboard.component';
import { ProfileComponent } from './components/users/profile.component';
import { MapsComponent } from './components/users/maps.component';
import { HomeComponent } from './components/common/home.component';
import { HeaderComponent } from './components/common/header.component';
import { FooterComponent } from './components/common/footer.component';


@NgModule({
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        HttpClientModule,
        AppRoutingModule,
        AgmCoreModule.forRoot({
          apiKey: 'AIzaSyACkYvi1c0PxR1LHhwHjoVmwlx5XTWjC7M'
        })
    ],
    declarations: [
        AppComponent,
        RegisterComponent,
        PageNotFoundComponent,
        DashboardComponent,
        ProfileComponent,
        MapsComponent,
        HomeComponent,
        HeaderComponent,
        FooterComponent
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
