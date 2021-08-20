import { Component, OnInit } from '@angular/core';
import {  NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { AuthResponseData, AuthService } from '../auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../auth.component.css']
})
export class LoginComponent implements OnInit {

  error!:string ;
  private userSub!:Subscription;

  constructor(private authService:AuthService,private router:Router,private route:ActivatedRoute) { }
  ngOnInit(): void {
    if(this.authService.gettoken()){
      this.router.navigate(['/home']);
    }
  }
  onSubmit(form:NgForm){
   
    if(!form.valid){
      return;
    }//extra validation

    const email = form.value.email;
    const password = form.value.password;

    let authObs :Observable<AuthResponseData>;
    authObs =  this.authService.login(email,password);
    
    authObs.subscribe(resData=>{
      this.router.navigate(['/home']);
    },errorMessage=>{
       this.error = errorMessage;
    });
    form.reset();
  }
  ngOnDestroy(){
    if(this.userSub)
      this.userSub.unsubscribe();
  }
}
