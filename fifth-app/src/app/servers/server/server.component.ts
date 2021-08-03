import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data, Params, Router } from '@angular/router';
import { ServersService } from '../servers.service';

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.css']
})
export class ServerComponent implements OnInit {
 public server:any;

  constructor(private serversService: ServersService,private route:ActivatedRoute,private router:Router) { }

  ngOnInit() {

    this.route.data.subscribe(
      (data:Data) =>{
        this.server = data['server']; //data[server should match to app routing module]
      }
    );


    // const id = +this.route.snapshot.params['id'];//adding + will convert it to string
    // this.server = this.serversService.getServer(id);
    // this.route.params.subscribe(
    //   (params:Params) => {
    //     this.server = this.serversService.getServer(+params['id'])//uodate the server whenever the change is trigerred
    
    //   }
    // );
  //  this.server = this.serversService.getServer(1);
  }
  onEdit(){
    this.router.navigate(['edit'],{relativeTo:this.route, queryParamsHandling:'preserve'});
  }
  //merge old query param 
}