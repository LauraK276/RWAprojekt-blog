import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css'],
  standalone: true,
  imports: [FormsModule, CommonModule]  // FormsModule za formu
})
export class AddPostComponent {
  title = '';
  content = '';

  constructor(private http: HttpClient, private router: Router) {}

  addPost() {
    const postData = { title: this.title, content: this.content };
    const token = localStorage.getItem('token');  // Dohvati JWT token iz localStorage

    // Definiraj zaglavlja s Authorization tokenom
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    // Pošalji zahtjev na backend
    this.http.post('http://localhost:3000/posts', postData, { headers })  // Poziv backendu s tokenom
      .pipe(
        catchError((error) => {
          console.error('Greška prilikom dodavanja posta', error);
          return of(null);  // Vrati prazan rezultat u slučaju greške
        })
      )
      .subscribe(response => {
        if (response) {
          console.log('Post je uspješno dodan!', response);
          this.router.navigate(['/posts']);  // Preusmjeri na stranicu postova
        } else {
          console.log('Greška prilikom dodavanja posta');
        }
      });
  }
}
