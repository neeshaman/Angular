import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription, Observable } from 'rxjs';
import { AuthService, AuthResponseData } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['../auth.component.css']
})
export class SignupComponent implements OnInit {

  error!:string;
  private closeSub!:Subscription;
  constructor(private authService:AuthService,private router:Router) { }

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
    const username = form.value.username;
    const phone = form.value.phone;

    let authObs :Observable<AuthResponseData>;

    
    authObs = this.authService.signup(email,password,username,phone);   
    authObs.subscribe(resData=>{
      this.router.navigate(['/auth/login']);
    },errorMessage=>{
      this.error = errorMessage;
    });
    form.reset();
  }
  ngOnDestroy(){
    if(this.closeSub)
      this.closeSub.unsubscribe();
  }

}
