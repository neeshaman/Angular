import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './auth/auth.gaurd';
import { LoginComponent } from './auth/login/login.component';
import { AuthComponent } from './auth/auth.component';
import { SignupComponent } from './auth/signup/signup.component';

const routes: Routes = [
  {path: '' ,redirectTo: '/home' , pathMatch: 'full'},

  {path:'home', component:HomeComponent ,canActivate :[AuthGuard]},

  {
    path:'auth', children:[
      {
        path:'login',component:LoginComponent
      },
      {
        path:'signup',component:SignupComponent
      }
    ]
  }
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
