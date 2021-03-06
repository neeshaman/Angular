import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { ServersService } from "../servers.service";


interface Server{
    id:number;
    name:string;
    status:string;
}
@Injectable()
export class ServerResolver implements Resolve<Server>{

    constructor(private serversService:ServersService) {
        
    }

    resolve(route:ActivatedRouteSnapshot,state:RouterStateSnapshot) : any{
        const id = + route.params['id'];
        console.log(id);
            return this.serversService.getServer(id);
    }
}