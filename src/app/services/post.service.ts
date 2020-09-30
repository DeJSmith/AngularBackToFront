import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Post } from '../Models/Post';

const HttpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class PostService {
  postsUrl: string = 'https://jsonplaceholder.typicode.com/posts';

  constructor(private _http: HttpClient) {}

  getPosts(): Observable<Post[]> {
    return this._http.get<Post[]>(this.postsUrl);
  }

  savePost(post: Post): Observable<Post> {
    return this._http.post<Post>(this.postsUrl, post, HttpOptions);
  }

  updatePost(post: Post): Observable<Post> {
    const url = `${this.postsUrl}/${post.id}`;
    return this._http.put<Post>(url, post, HttpOptions);
  }

  removePost(post: Post | number): Observable<Post> {
    const id = typeof post === 'number' ? post : post.id;
    const url = `${this.postsUrl}/${id}`;
    return this._http.delete<Post>(url, HttpOptions);
  }

  getPost(id: number): Observable<Post> {
    const url = `${this.postsUrl}/${id}`;
    return this._http.get<Post>(url);
  }
}
