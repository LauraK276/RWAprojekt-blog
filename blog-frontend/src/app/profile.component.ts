import { Component } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  standalone: true
})
export class ProfileComponent {
  // Pretpostavimo da ćete imati korisničke podatke, za sada placeholder
  user = {
    username: 'ana',
    email: 'ana@example.com'
  };
}
