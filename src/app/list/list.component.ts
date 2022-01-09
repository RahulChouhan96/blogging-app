import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BlogService } from '../blog.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  blogs: Array<any> = [];
  user: any = {};

  constructor(private blogService: BlogService, private router: Router) { }

  ngOnInit(): void {

    // Get user blogs if user is logged in
    this.user._id = sessionStorage.getItem("userId");
    this.blogService.getUserBlogs(this.user._id).subscribe(userObj => {
      this.blogs = userObj.blogs;
    });
  }

  // Open editor to edit the blog
  openEditor(blogId: string) {
    this.router.navigate(["/edit"], { queryParams: { id: blogId } });
  }

  // Open blog read page
  openBlog(blogId: string) {
    this.router.navigate(["/blog"], { queryParams: { id: blogId } });
  }

  // Delete a particular blog
  delBlog(blogId: string) {
    if (confirm("Are you sure?")) {
      this.blogService.deleteBlog(blogId).subscribe(res => {
        for (let blog of this.blogs) {
          if (blog._id == blogId)
            blog.deleted = true;
        }
      });
    }
  }
}
