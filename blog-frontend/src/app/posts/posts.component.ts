import { Component, OnInit } from '@angular/core'; // Dodaj OnInit ovdje
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css'],
  standalone: true,
  imports: [CommonModule]  // Dodaj CommonModule za korištenje *ngFor
})
export class PostsComponent implements OnInit {
  posts = [
    { title: 'Post 1', content: 'Ovo je sadržaj posta 1' },
    { title: 'Post 2', content: 'Ovo je sadržaj posta 2' }
  ];

  constructor() { }

  ngOnInit(): void {
    // Implementacija za OnInit ako je potrebna
  }
}
