import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, tap } from "rxjs/operators";
import{BehaviorSubject, Subject, throwError} from 'rxjs';
import { User } from "./user.model";
import { Router } from "@angular/router";

export interface AuthResponseData{
    kind:string;
    idToken:string;
    email:string;
    refreshToken:string;
    expiresin:string;
    localId:string;
    registered?:boolean;
}

@Injectable()
export class AuthService{

    user = new BehaviorSubject< any>(null);


    constructor(private http:HttpClient,private router:Router){}
  
    signup(email:string,password:string){
       return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDD4IBHw_CKrAruAIyBmJ4ASN0a4rYhBDk',{
            email:email,
            password:password,
            returnSecureToken:true
        }).pipe(
            catchError(this.handleError) , tap (resData=>{
               this.handleAuthentication(resData.email,resData.localId,resData.idToken,+resData.expiresin)
            })
        );
    }

    login(email:string,password:string){
        return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDD4IBHw_CKrAruAIyBmJ4ASN0a4rYhBDk',{
            email:email,
            password:password,
            returnSecureToken:true
        }).pipe(
            catchError(this.handleError), tap (resData=>{
                this.handleAuthentication(resData.email,resData.localId,resData.idToken,+resData.expiresin)
             })
        );
    }   

    logout(){
        this.user.next(null); //entire app treat user unauthenticated
        this.router.navigate(['/auth']);
    }
    private handleAuthentication(email:string,userId:string,token:string,expiresin:number){
        const expirationDate = new Date(new Date().getTime() + expiresin * 1000);
        const user = new User(email,userId,token,expirationDate);
        this.user.next(user);
    }

    private handleError(errorResponse:HttpErrorResponse){
        let errorMessage = 'An unkwown error occurred';
        if(!errorResponse.error || !errorResponse.error.error){
            return throwError(errorMessage);
        }
        switch(errorResponse.error.error.message){
            case 'EMAIL_EXISTS':
                errorMessage = 'This email exists already';
                break;
            case 'EMAIL_NOT_FOUND':
                errorMessage = 'This email does not exists!!';
                break;
            case 'INVALID_PASSWORD':
                errorMessage = 'This password is not correct!!';
        }
        return throwError(errorMessage);
    }
}