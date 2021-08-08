import { Component, ComponentFactoryResolver, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { AuthResponseData, AuthService } from './auth.service';
import { AlertComponent } from '../shared/alert/alert.component';
import { PlaceholderDirective } from '../shared/placeholder/placeholder.directive';
@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit,OnDestroy {

  @ViewChild(PlaceholderDirective)  alertHost!: PlaceholderDirective;   
  isLoginMode = true;
  isLoading = false;
  error:any = null;
  private closeSub!:Subscription;
  constructor(private authService:AuthService,private router:Router,private componentFactoryResolver:ComponentFactoryResolver) { }

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
      this.router.navigate(['/recipes']);
    },errorMessage=>{
      // this.error = errorMessage;
      this.showErrorAlert(errorMessage);
      this.isLoading =false;
    });
    form.reset();
  }
  onHandleError(){
    this.error = null;
  }


  private showErrorAlert(message:string){
    //const alertCmp = new AlertComponent(); not valid in angular it's valid in TS
    const alertCmpFactory = this.componentFactoryResolver.resolveComponentFactory(AlertComponent);//will return a cmp factory not the cmp itself
   const hostViewContainerRef = this.alertHost.viewContainer;
   hostViewContainerRef.clear(); 

  const componentRef= hostViewContainerRef.createComponent(alertCmpFactory);
//for msg and close button
  componentRef.instance.message = message;
  this.closeSub = componentRef.instance.close.subscribe(()=>{
    this.closeSub.unsubscribe();
    hostViewContainerRef.clear();
  });

  }
  ngOnDestroy(){
    if(this.closeSub)
      this.closeSub.unsubscribe();
  }
}
