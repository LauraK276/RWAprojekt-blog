import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // Import HttpClient
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private http: HttpClient) {} // Dodaj HttpClient u konstruktor

  login() {
    const body = {
      username: this.username,
      password: this.password
    };

    this.http.post('http://localhost:3000/auth/login', body)
      .subscribe(
        (response: any) => {
          console.log('Prijava uspješna!', response);
          // Ako backend vraća JWT token, spremi ga u localStorage
          if (response && response.token) {
            localStorage.setItem('jwtToken', response.token);
            console.log('JWT token pohranjen.');
          }
        },
        (error) => {
          console.error('Došlo je do pogreške prilikom prijave:', error);
        }
      );
  }
}
