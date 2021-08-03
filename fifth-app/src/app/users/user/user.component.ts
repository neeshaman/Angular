import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit ,OnDestroy{
  
  user!: { id: number, name: string};
  paramSubscription!:Subscription;
  
  constructor(private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.user = {
      id:this.route.snapshot.params['id'],
      name:this.route.snapshot.params['name']
    };
    //observable is an easy to subscribe to some event which might happen in the future to then execute the code when it happens.
    //fetching route param reactively
    this.paramSubscription=this.route.params.subscribe(
      //when new data is send through observable
      (params:Params) => {
        this.user.id = params['id'];
        this.user.name = params['name'];
      } //executed if params got change
    );
  }
  ngOnDestroy(){
this.paramSubscription.unsubscribe(); //angular does this for  route observable
// but need to unsubscribe when we create custom observable
  }

}
