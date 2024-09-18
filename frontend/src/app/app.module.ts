import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; // Ovo je potrebno za ngModel
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router'; // Uvozi RouterModule

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { appRoutes } from './app.routes'; // Uvozi rute

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,  // FormsModule je potreban za ngModel
    HttpClientModule, // Dodaj HttpClientModule za HTTP zahtjeve
    RouterModule.forRoot(appRoutes)  // Povezuje rute s aplikacijom
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
