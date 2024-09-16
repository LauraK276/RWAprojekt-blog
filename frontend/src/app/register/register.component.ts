import { Component } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  username: string = '';  // Dodaj polje username
  password: string = '';  // Dodaj polje password

  register() {
    // Dodaj logiku za registraciju
    console.log('Korisničko ime:', this.username);
    console.log('Lozinka:', this.password);
  }
}
