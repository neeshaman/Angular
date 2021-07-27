import { AfterContentChecked } from '@angular/core';
import { Component, OnInit ,Input, ViewEncapsulation, ViewChild, ElementRef, AfterViewInit, ContentChild, AfterContentInit} from '@angular/core';

@Component({
  selector: 'app-server-element',
  templateUrl: './server-element.component.html',
  styleUrls: ['./server-element.component.css'],
  encapsulation:ViewEncapsulation.None
})
export class ServerElementComponent implements OnInit,AfterViewInit, AfterContentInit{
  @Input('srvElement') element:{type:string,name:string,content:string};//type definition

  @ViewChild('heading') header : ElementRef; //in the same template

  @ContentChild('contentParagraph') paragraph: ElementRef;
  constructor() { }

  ngOnInit() {
    console.log(this.header.nativeElement.textContent)
    console.log("content  "+this.paragraph.nativeElement.textContent)
  }
  ngAfterViewInit(){
    console.log("view  "+this.header.nativeElement.textContent)
  }
  ngAfterContentInit(){
    console.log("content  "+this.paragraph.nativeElement.textContent)
  }

}
