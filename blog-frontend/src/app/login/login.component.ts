import { Component } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';  // Ovdje HttpClient je dovoljan
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [FormsModule, HttpClientModule]  // FormsModule je potreban za ngModel
})
export class LoginComponent {
  username = '';  // Definirano kao string
  password = '';  // Definirano kao string

  constructor(private http: HttpClient, private router: Router) {}

  login() {
    const loginData = { username: this.username, password: this.password };
    console.log('Sending login request:', loginData);  // Provjera što se šalje

    this.http.post('http://localhost:3000/auth/login', loginData)
      .pipe(
        catchError(error => {
          console.error('Login failed', error);
          return of(null);  // Vrati prazni rezultat ako dođe do greške
        })
      )
      .subscribe((response: any) => {
        console.log('Login response:', response);  // Provjera odgovora

        if (response && response.accessToken) {  // Promijenjeno s 'token' na 'accessToken'
          localStorage.setItem('token', response.accessToken);  // Spremi 'accessToken' umjesto 'token'
          this.router.navigate(['/posts']);  // Preusmjeri na postove nakon uspješne prijave
        } else {
          console.log('Invalid credentials');  // Ako nema ispravnog tokena
        }
      });
}
 
  
}
