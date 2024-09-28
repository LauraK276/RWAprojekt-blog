import { Component, OnInit } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PostService } from '../services/post.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css'],
  standalone: true,
  imports: [CommonModule, HttpClientModule] // Uključite HttpClientModule
})
export class PostsComponent implements OnInit {
  posts: any[] = [];

  constructor(private postService: PostService, private router: Router) {}

  ngOnInit(): void {
    this.loadPosts();
  }

  loadPosts() {
    this.postService.getPosts().subscribe(data => {
      this.posts = data;
    });
  }

  deletePost(postId: number) {
    this.postService.deletePost(postId).subscribe(() => {
      this.posts = this.posts.filter(post => post.id !== postId);
    });
  }

  editPost(postId: number) {
    this.router.navigate(['/edit-post', postId]);
  }

  navigateToAddPost() {
    this.router.navigate(['/add-post']);
  }
}
