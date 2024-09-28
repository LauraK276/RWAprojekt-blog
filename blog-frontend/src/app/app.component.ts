import { Component } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router'; // Uvezite RouterModule

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [HttpClientModule, RouterModule] // Dodajte RouterModule ovdje
})
export class AppComponent {
  constructor(private router: Router) {}

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
