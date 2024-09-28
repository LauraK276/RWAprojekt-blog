import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  standalone: true,
  imports: [FormsModule],  // Dodaj FormsModule ovdje
})
export class ProfileComponent {
  // Pretpostavimo da ćete imati korisničke podatke, za sada placeholder
  user = {
    username: 'ana',
    email: 'ana@example.com'
  };

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    // Dohvati korisničke podatke prilikom inicijalizacije
    this.http.get<any>('http://localhost:3000/users/profile')
      .subscribe(data => {
        this.user.username = data.username;
        this.user.email = data.email;
      });
  }

  updateProfile() {
    const token = localStorage.getItem('token'); // Dohvati JWT token iz localStorage
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}` // Dodaj token u zaglavlje
    });

    // Pošalji zahtjev za ažuriranje korisničkog profila
    this.http.put('http://localhost:3000/users/profile', this.user, { headers })
      .subscribe(response => {
        console.log('Profil je uspješno ažuriran!', response);
        this.router.navigate(['/posts']); // Preusmjeri na stranicu postova
      }, error => {
        console.error('Greška prilikom ažuriranja profila:', error);
      });
  }
}
