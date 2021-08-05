import { Component, OnDestroy, OnInit } from '@angular/core';
import { interval, Observable, Subscription } from 'rxjs';
import {map,filter} from 'rxjs/operators';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit ,OnDestroy{

    private firstObsSubscription!:Subscription;
  constructor() { }

  ngOnInit(): void {
      //build observable
    //  this.firstObsSubscription= interval(1000).subscribe(count =>{
        //fire new value every second
    //     console.log(count);
        //dont stop emiiting a value it will continue

        //so to stop that in order to avoid memory leaks we need to unsubscribe});
   
        const customIntervalObservable = Observable.create((observer:any)=>{
          //will take an arg. automatically through rxjs i.e observer
          let count= 0;
          setInterval(()=>{
            observer.next(count);

            //whenever observer completes no other things evaluate so error wont be execute 
            //its totaly completed
            if(count == 5){
              observer.complete();
            }

            //custom erro through observable/after observable throughs the error it will die so unsubscribing wont be an issue here.
            if(count >3){
              observer.error(new Error('Count is greater than 3'));
            }
            count++;

          },1000);
        });

        //pipes

        
        this.firstObsSubscription= customIntervalObservable.pipe(filter((data:any)=>{
          return data > 0;
        }),
          map((data:number) =>{
            return 'Round: ' + (data+1);
          })
        ).subscribe( (data: any) =>{
            console.log(data);
          },(error:any)=>{
              console.log(error);
              alert(error.message);
          }, () =>{
            console.log('Completed')
          }
        );
  }
  ngOnDestroy(){
    this.firstObsSubscription.unsubscribe();
  }

}
