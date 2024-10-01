import { Component } from '@angular/core';
import { HttpClient, HttpHeaders, HttpClientModule } from '@angular/common/http'; 
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  standalone: true,
  imports: [FormsModule, HttpClientModule],  // Dodaj HttpClientModule ovdje
})
export class ProfileComponent {
  user = {
    username: 'ana',
    email: 'ana@example.com'
  };

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    // Provjeri da li smo u browser okruženju prije pristupa localStorage
    if (typeof window !== 'undefined' && localStorage) {
      const token = localStorage.getItem('token'); // Dohvati JWT token iz localStorage
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}` // Dodaj token u zaglavlje
      });

      // Dohvati korisničke podatke prilikom inicijalizacije
      this.http.get<any>('http://localhost:3000/users/profile', { headers })
        .subscribe(data => {
          this.user.username = data.username;
          this.user.email = data.email;
        }, error => {
          console.error('Greška prilikom dohvaćanja profila:', error);
        });
    } else {
      console.error('LocalStorage nije dostupan');
    }
  }

  updateProfile() {
    // Provjeri da li smo u browser okruženju prije pristupa localStorage
    if (typeof window !== 'undefined' && localStorage) {
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
    } else {
      console.error('LocalStorage nije dostupan');
    }
  }
}
