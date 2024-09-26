import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  standalone: true,
  imports: [FormsModule]  // Dodaj FormsModule ovdje
})
export class RegisterComponent {
  username: string = '';
  password: string = '';

  register() {
    // Implementacija za registraciju
    console.log('Username:', this.username);
    console.log('Password:', this.password);
  }
}
