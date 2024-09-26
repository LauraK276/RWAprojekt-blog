import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient, withFetch } from '@angular/common/http';  // Uključujemo withFetch za SSR podršku
import { provideRouter } from '@angular/router';
import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';  // Definirane rute

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),            // Rutiranje aplikacije
    provideHttpClient(withFetch())    // Dodaj withFetch() za bolju SSR podršku
  ]
}).catch(err => console.error(err));
