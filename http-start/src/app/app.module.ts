import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import  {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http'
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PostsService } from './posts.service';
import { AuthInterceptorService } from './auth-interceptor.service';
import { loggingInceptorService } from './logging-inceptor.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  //Interceptors will executed on the way we set first come first kinda
  providers: [PostsService,{provide:HTTP_INTERCEPTORS,useClass:AuthInterceptorService,multi:true},{provide:HTTP_INTERCEPTORS,useClass:loggingInceptorService,multi:true}],
  bootstrap: [AppComponent]
})
export class AppModule { }