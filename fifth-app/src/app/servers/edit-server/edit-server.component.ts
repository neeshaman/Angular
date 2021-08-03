import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ServersService } from '../servers.service';
import { CanComponentDeactivate, CanDeactivateGaurd } from './can-deactivate-gaurd.service';

@Component({
  selector: 'app-edit-server',
  templateUrl: './edit-server.component.html',
  styleUrls: ['./edit-server.component.css']
})
export class EditServerComponent implements OnInit ,CanComponentDeactivate{
  server: any;
  serverName = '';
  serverStatus = '';
  allowEdit = false;
  changesSaved = false;

  constructor(private serversService: ServersService,private route: ActivatedRoute,private router:Router  ) { }

  ngOnInit() {

    this.route.queryParams.subscribe(
      (queryParams:Params) => {
        this.allowEdit = queryParams['allowEdit'] === '1' ? true : false;
      }
    );
    console.log(this.route.snapshot.queryParams);
    console.log(this.route.snapshot.fragment);

    //alternative of snapshot
    //access the param
    //this.route.queryParams.subscribe();
    this.route.fragment.subscribe();
    const id = +this.route.snapshot.params['id'];
      //subscribe route params to update the id if params

    this.server = this.serversService.getServer(id);
    this.serverName = this.server.name;
    this.serverStatus = this.server.status;
  }

  onUpdateServer() {
    this.serversService.updateServer(this.server.id, {name: this.serverName, status: this.serverStatus});
    this.changesSaved = true;
    this.router.navigate(['../'],{relativeTo:this.route});
  }
  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean{
    //actual logic while we are allowed to leave or not
    if(!this.allowEdit){
      return true;
    }
    if((this.serverName !== this.server.name || this.serverStatus !== this.server.status) && !this.changesSaved){
      return confirm('Do you want to discard the Changes?');
    }else{
      return true;
    }
  }
}
