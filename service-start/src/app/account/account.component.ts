import { Component, OnInit ,Input,EventEmitter,Output} from '@angular/core';
import { AccountsService } from 'app/account.service';
import { LoggingService } from 'app/logging.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'],
  //providers: [LoggingService]
})
export class AccountComponent implements OnInit {

  constructor(private loggingService:LoggingService ,private accountsService: AccountsService){
  }
  ngOnInit() {
  }

  @Input() account: {name: string, status: string};
  @Input() id: number;
  
  onSetTo(status: string) {
    

    this.accountsService.updateStatus(this.id,status);

    // use injecting method 
   // this.loggingService.logStatusChange(status);
  
    //not a good practice to create the instance of service 
    // const service = new LoggingService();
    // service.logStatusChange(status);

    //    console.log('A server status changed, new status: ' +status);
  }

}
