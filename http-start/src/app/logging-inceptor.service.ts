import { HttpEventType, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { tap } from "rxjs/operators";


export class loggingInceptorService implements HttpInterceptor{
        intercept(req:HttpRequest<any>,next:HttpHandler){
            console.log('Out Going REquest');
            console.log(req.url);
            return next.handle(req).pipe(tap(event=>{
                if(event.type === HttpEventType.Response){
                    console.log('Incoming REsponse');
                    console.log(event.type);
                }
            }));
        }
}