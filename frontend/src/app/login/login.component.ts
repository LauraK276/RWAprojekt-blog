import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';  // Dodaj polje username
  password: string = '';  // Dodaj polje password

  login() {
    // Dodaj logiku za prijavu
    console.log('Korisničko ime:', this.username);
    console.log('Lozinka:', this.password);
  }
}
