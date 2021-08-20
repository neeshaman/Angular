import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import * as Highcharts from 'highcharts';
export interface User {
  id:number;
  name:string;
  email:string;
}
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  private userSub!:Subscription;
  isAuthenticated:boolean = false;
  users!: User[];

  cols!: any[];
  constructor(private authService:AuthService) { }
  ngOnInit() {
  this.userSub = this.authService.user.subscribe(user=>{
    this.isAuthenticated = !!user; // similar to !user ? false :true
  });

  this.users = [
     { id: 1, name: 'kiran',email:'kiran@gmail.com' },
     { id: 2, name: 'tom',email:'tom@gmail.com' },
     { id: 3, name: 'john',email:'john@gmail.com' },
     { id: 4, name: 'Frank',email:'frank@gmail.com' },

  ];
  this.cols = [
       { field: 'id', header: 'Id' },
       { field: 'name', header: 'Name' },
       { field: 'email', header: 'Email' },
  ];
}
  ngOnDestroy(){
    this.userSub.unsubscribe();  
  }
  onLogout(){
    this.authService.logout();
  }

  highcharts = Highcharts;
  chartOptions: Highcharts.Options = {
    title: {
      text: "Infosys stock value"
    },
    xAxis: {
      categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    },
    yAxis: {
      title: {
        text: "Infosys Stock value in dollar"
      }
    },
    series: [{
      data: [12, 8, 43, 35, 20, 90, 100, 110],
      type: 'line'
    }]
  }
}
