import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription, Observable } from 'rxjs';
import { AuthService, AuthResponseData } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  isLoginMode = true;
  isLoading = false;
  error:any = null;
  private closeSub!:Subscription;
  constructor(private authService:AuthService,private router:Router) { }

  ngOnInit(): void {
  }
  onSwitchMode(){
    this.isLoginMode = !this.isLoginMode; 
  }
  onSubmit(form:NgForm){
    console.log(form.value);

    if(!form.valid){
      return;
    }//extra validation

    const email = form.value.email;
    const password = form.value.password;

    let authObs :Observable<AuthResponseData>;

    this.isLoading = true;
    if(this.isLoginMode){
      authObs =  this.authService.login(email,password);
    }else{
     authObs = this.authService.signup(email,password);
    }

    authObs.subscribe(resData=>{
      console.log(resData);
      this.isLoading =false;
      this.router.navigate(['/home']);
    },errorMessage=>{
       this.error = errorMessage;
      this.isLoading =false;
    });
    form.reset();
  }
  onHandleError(){
    this.error = null;
  }

  ngOnDestroy(){
    if(this.closeSub)
      this.closeSub.unsubscribe();
  }

}
