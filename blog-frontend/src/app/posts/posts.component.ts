import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';  // Dodaj HttpClientModule
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
}
