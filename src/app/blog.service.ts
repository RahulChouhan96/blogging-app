import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  constructor(private http: HttpClient) { }

  // Fetch all blogs of a particular user
  getUserBlogs(userId: string): Observable<any> {
    let url = "/user/blogs/" + userId;

    return this.http.get(url);
  }

  // Create a blog
  createBlog(blogObj: any): Observable<any> {
    let url = "/blog";

    return this.http.post(url, blogObj);
  }

  // Get a specific blog
  getBlog(blogId: string): Observable<any> {
    let url = "/blog/" + blogId;

    return this.http.get(url);
  }

  // Update a specific blog
  updateBlog(blogObj: any): Observable<any> {
    let url = "/blog";

    return this.http.patch(url, blogObj);
  }

  // Delete a specific blog
  deleteBlog(blogId: string): Observable<any> {
    let url = "/blog/" + blogId;

    return this.http.delete(url);
  }
}
