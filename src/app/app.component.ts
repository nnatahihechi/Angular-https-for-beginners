import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Post } from './post';
import { Observable, catchError, retry, of, map } from 'rxjs';
import { HttpParams } from '@angular/common/http';
// import { ClassGetter } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  name = 'Angular';

  readonly ROOT_URL = 'https://jsonplaceholder.typicode.com';

  posts: Observable<any>;
  newPost: Observable<any>;

  constructor(private http: HttpClient) { }

  getPosts() {
    // this.posts = this.http.get(this.ROOT_URL + './posts');

    let headers = new HttpHeaders().set('Authorization', 'auth-token');
    let params = new HttpParams().set('userId', '1');
    this.posts = this.http.get(this.ROOT_URL + '/posts', { params, headers });

    this.posts = this.http.get(this.ROOT_URL + '/posts', { headers });
  }

  createPost() {
    const data: Post = {
      id: null,
      userId: 23,
      title: 'my new post',
      body: 'hello world!',
    };

    this.newPost = this.http.post<Post>(this.ROOT_URL + '/pass', data).pipe(
      map((post) => post.body),
      (retry(3),
        catchError((err) => {
          console.log(err);
          return of(err);
        }))
    );
  }
}
