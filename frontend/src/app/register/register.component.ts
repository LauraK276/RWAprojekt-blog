import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  username: string = '';
  password: string = '';
  confirmPassword: string = '';

  constructor(private http: HttpClient) {} // Dodaj HttpClient u konstruktor

  register() {
    // Provjeri je li lozinka jednaka potvrdi lozinke
    if (this.password !== this.confirmPassword) {
      console.error('Lozinke se ne podudaraju.');
      return;
    }

    const body = {
      username: this.username,
      password: this.password
    };

    // Pošalji POST zahtjev na backend API za registraciju
    this.http.post('http://localhost:3000/auth/register', body, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    }).subscribe(
      response => {
        console.log('Korisnik uspješno registriran', response);
      },
      error => {
        console.error('Greška prilikom registracije', error);
      }
    );
  }
}
