import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private apiUrl = 'http://localhost:3000/posts';

  constructor(private http: HttpClient) { }

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  getPosts(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl, { headers: this.getAuthHeaders() });
  }

  deletePost(postId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${postId}`, { headers: this.getAuthHeaders() });
  }

  updatePost(postId: number, updatedPost: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${postId}`, updatedPost, { headers: this.getAuthHeaders() });
  }

  getPost(postId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${postId}`, { headers: this.getAuthHeaders() });
  }
}
