import {
    CanActivate,
    Router,
  } from '@angular/router';
  import { Injectable } from '@angular/core';
  
  import { AuthService } from './auth.service';
  
  @Injectable({ providedIn: 'root' })
  export class AuthGuard implements CanActivate {
    constructor(private Authguardservice: AuthService, private router: Router) {}  
    canActivate(): boolean {  
        if (!this.Authguardservice.gettoken()) {  
            this.router.navigateByUrl("/auth/login");  
        }  
        return this.Authguardservice.gettoken();  
    }   
  }
  