import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Post } from './post.model';
import { PostsService } from './posts.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy{
  loadedPosts:Post[] = [];
  isFetching = false;
  error !:any;
  private errorSub!:Subscription;
  
  constructor(private http: HttpClient,private postsService:PostsService) {}

  ngOnInit() {
   this.errorSub= this.postsService.error.subscribe(errorMessage=>{
      this.error = errorMessage;
    })

    this.isFetching = true;
     this.postsService.fetchPosts().subscribe((posts:any)=>{
     this.isFetching = false;
     this.loadedPosts = posts;
   },error=>{
      this.isFetching = false;
      this.error = error.message;
   });
  }

  onCreatePost(postData:Post) {
    // Send Http request
    console.log(postData);
    //posts.json for firebase it will create folders
    this.postsService.createAndStorePost(postData.title,postData.content);
  
  }
  onHandleError(){
    this.error = null;
  }
  onFetchPosts(){
    this.isFetching = true;
    this.postsService.fetchPosts().subscribe(posts=>{
      this.isFetching = false;
      this.loadedPosts = posts;
    },error=>{
      this.isFetching = false;
        this.error = error.message;
    });
  }
  onClearPosts() {
    // Send Http request
    this.postsService.deletePost().subscribe( ()=>{
      this.loadedPosts = [];
    })
  }
  ngOnDestroy(){
    this.errorSub.unsubscribe();
  }
}
