import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css'],
  standalone: true,
  imports: [FormsModule], // Dodaj ovdje
})
export class EditPostComponent implements OnInit {
  postId: string;
  title: string = '';
  content: string = '';

  constructor(
    public http: HttpClient,
    public router: Router,
    private route: ActivatedRoute
  ) {
    this.postId = this.route.snapshot.paramMap.get('id') || ''; // Uzimanje ID-a posta iz URL-a
  }

  ngOnInit(): void {
    // Dohvati post prema ID-u
    this.http.get<any>(`http://localhost:3000/posts/${this.postId}`)
      .subscribe(data => {
        this.title = data.title;
        this.content = data.content;
      });
  }

  updatePost() {
    const postData = { title: this.title, content: this.content };
    const token = localStorage.getItem('token');  // Dohvati JWT token iz localStorage

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}` // Dodaj token u zaglavlje
    });

    // Pošalji zahtjev za ažuriranje posta
    this.http.put(`http://localhost:3000/posts/${this.postId}`, postData, { headers })
      .pipe(
        catchError((error) => {
          console.error('Greška prilikom ažuriranja posta', error);
          return of(null); // Vrati prazan rezultat u slučaju greške
        })
      )
      .subscribe(response => {
        if (response) {
          console.log('Post je uspješno ažuriran!', response);
          this.router.navigate(['/posts']); // Preusmjeri na stranicu postova
        } else {
          console.log('Greška prilikom ažuriranja posta');
        }
      });
  }
}
