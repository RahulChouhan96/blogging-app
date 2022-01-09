import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlogService } from '../blog.service';

@Component({
  selector: 'app-create-edit',
  templateUrl: './create-edit.component.html',
  styleUrls: ['./create-edit.component.css']
})
export class CreateEditComponent implements OnInit {

  blog: any = {};
  updated: boolean = false;
  mode: string;

  constructor(private blogService: BlogService, private route: ActivatedRoute) { }

  ngOnInit(): void {

    // If URL has `blog`, allow user to read
    // Otherwise, user must be able to see an edit blog form
    if (!window.location.href.includes("blog"))
      this.mode = "edit";

    // Get blog details when blog id exist in URL
    this.route.queryParams.subscribe(params => {
      if (params.id) {
        this.blog._id = params.id;

        this.blogService.getBlog(this.blog._id).subscribe(blogObj => this.blog = blogObj);
      }
    });
  }

  // Create/Edit a blog
  createBlog() {
    this.blog._user = sessionStorage.getItem("userId");
    this.blog.url = this.blog.title.toLowerCase().split(" ").join("-");

    // If blog already exists
    // Then edit otherwise create a new one
    if (this.blog._id)
      this.blogService.updateBlog(this.blog).subscribe(blogObj => {
        this.updated = true;
      });

    else
      this.blogService.createBlog(this.blog).subscribe(blogObj => {
        this.updated = true;
      });
  }
}
