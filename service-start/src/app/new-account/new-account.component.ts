import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AccountsService } from 'app/account.service';
import { LoggingService } from 'app/logging.service';
@Component({
  selector: 'app-new-account',
  templateUrl: './new-account.component.html',
  styleUrls: ['./new-account.component.css'],
 // providers: [LoggingService]
})
export class NewAccountComponent implements OnInit {
  
  ngOnInit(){
   
  }
  constructor(private loggingService:LoggingService ,private accoutService:AccountsService){

  }

  onCreateAccount(accountName: string, accountStatus: string) {
    this.accoutService.addAccount(accountName,accountStatus);
   
    // this.loggingService.logStatusChange(accountStatus);
    // const service = new LoggingService();
    // service.logStatusChange(accountStatus);
    //console.log('A server status changed, new status: ' + accountStatus);
  }
}
