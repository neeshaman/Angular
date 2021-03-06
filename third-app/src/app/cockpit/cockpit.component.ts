import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-cockpit',
  templateUrl: './cockpit.component.html',
  styleUrls: ['./cockpit.component.css']
})
export class CockpitComponent implements OnInit {
  @Output('') serverCreated = new EventEmitter<{serverName: string,serverContent:string}>();
  @Output('bprintCreated') blueprintCreated =new EventEmitter<{serverName:string,serverContent:string}>(); 
  // newServerName = '';
  // newServerContent = '';

  @ViewChild('serverContentInput') serverContentInput :ElementRef;
  constructor() { }

  ngOnInit() {
  }
 
  onAddServer(nameInput: HTMLInputElement) {
   this.serverCreated.emit({serverName:nameInput.value, serverContent:this.serverContentInput.nativeElement.value});
  }

  onAddBlueprint(nameInput: HTMLInputElement) {
    this.blueprintCreated.emit({serverName:nameInput.value, serverContent:this.serverContentInput.nativeElement.value});
  }
}
