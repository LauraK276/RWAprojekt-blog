import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [FormsModule]  // Dodaj FormsModule ovdje
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  login() {
    // Implementacija za login
    console.log('Username:', this.username);
    console.log('Password:', this.password);
  }
} // <-- Provjeri je li ova zagrada zatvorena
