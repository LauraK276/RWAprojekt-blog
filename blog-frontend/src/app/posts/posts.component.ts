import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpClientModule } from '@angular/common/http';  // Uvezi HttpHeaders
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css'],
  standalone: true,
  imports: [CommonModule, HttpClientModule]  // Dodaj HttpClientModule za HTTP zahtjeve
})
export class PostsComponent implements OnInit {
  posts: any[] = [];

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.http.get<any[]>('http://localhost:3000/posts')
      .subscribe(data => {
        this.posts = data;
      });
  }

  navigateToAddPost() {
    this.router.navigate(['/add-post']);  // Preusmjeravanje na komponentu za dodavanje posta
  }

  navigateToEditPost(postId: number) {
    this.router.navigate([`/edit-post/${postId}`]);  // Preusmjeravanje na komponentu za izmjenu posta
  }

  deletePost(postId: number) {
    const token = localStorage.getItem('jwt'); // Uzimanje JWT tokena iz localStorage
  
    if (!token) {
      console.error('Token nije pronađen!'); // Debug informacija
      return; // Prekidanje ako token nije pronađen
    }
  
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}` // Dodaj token u zaglavlje
    });
  
    this.http.delete(`http://localhost:3000/posts/${postId}`, { headers })
      .subscribe(() => {
        this.posts = this.posts.filter(post => post.id !== postId);
      }, error => {
        console.error('Došlo je do greške prilikom brisanja posta:', error);
      });
  }
}
