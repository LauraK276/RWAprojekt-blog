import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';  // Dodaj HttpClientModule

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  standalone: true,
  imports: [FormsModule, HttpClientModule]  // Uključi i HttpClientModule
})
export class RegisterComponent {
  username = '';
  password = '';

  constructor(private http: HttpClient) {}

  register() {
    const registerData = { username: this.username, password: this.password };
    this.http.post('http://localhost:3000/auth/register', registerData)
      .subscribe(() => {
        alert('Registracija uspješna!');
      });
  }
}
