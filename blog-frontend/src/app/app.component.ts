import { Component } from '@angular/core';
import { RouterOutlet, RouterModule } from '@angular/router'; // Dodajte RouterModule za routerLink
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterModule],  // Dodajte RouterModule ovdje
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']  // Ispravno je styleUrls, ne styleUrl
})
export class AppComponent {
  constructor(private router: Router) {}

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
