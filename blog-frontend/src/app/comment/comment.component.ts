import { Component, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common'; // Importiraj CommonModule
import { FormsModule } from '@angular/forms';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule],  // Dodaj CommonModule ovdje
})
export class CommentComponent implements OnInit {
  @Input() postId!: number; // Osiguraj da je postId definiran kao Input
  comments: any[] = [];
  newComment: string = '';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadComments(); // Učitaj komentare prilikom inicijalizacije
  }

  loadComments() {
    this.http.get<any[]>(`http://localhost:3000/comments/${this.postId}`)
      .subscribe(data => {
        this.comments = data; // Postavi učitane komentare
      });
  }

  addComment() {
    const commentData = {
      content: this.newComment,  // Sadržaj komentara
    };
  
    const token = localStorage.getItem('token');  // Dohvati JWT token iz localStorage
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  
    // POST zahtjev na URL s ID-em posta
    this.http.post(`http://localhost:3000/comments/${this.postId}`, commentData, { headers })
      .subscribe(response => {
        this.comments.push({ content: this.newComment, author: { username: 'user' } });
        this.newComment = ''; // Očisti textarea nakon dodavanja
      }, error => {
        console.error('Greška prilikom dodavanja komentara:', error);
      });
  }
}
