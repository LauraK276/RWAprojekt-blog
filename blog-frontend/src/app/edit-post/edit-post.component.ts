import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostService } from '../services/post.service';
import { HttpClientModule } from '@angular/common/http'; // Uvezite ovdje

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css'],
  standalone: true,
  imports: [HttpClientModule] // Dodajte ovdje
})
export class EditPostComponent implements OnInit {
  postId: number | null = null;
  post: any;

  constructor(private route: ActivatedRoute, private postService: PostService) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.postId = +id;
      this.loadPost();
    } else {
      console.error('Post ID is null');
    }
  }

  loadPost() {
    if (this.postId !== null) {
      this.postService.getPost(this.postId).subscribe(data => {
        this.post = data;
      });
    }
  }

  updatePost() {
    if (this.postId !== null) {
      this.postService.updatePost(this.postId, this.post).subscribe(() => {
        // Preusmjeravanje ili obavijest o uspjehu
      });
    }
  }
}
