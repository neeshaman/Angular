import { Directive,ElementRef,Host,HostBinding,HostListener,Input,OnInit,Renderer} from '@angular/core';

@Directive({
  selector: '[appBetterHighlight]'
})
export class BetterHighlightDirective implements OnInit{
 
  @Input() defaultColor:string = 'transparent';
  @Input('appBetterHighlight') highlightColor:string = 'blue';
  @HostBinding('style.backgroundColor') backgroundColor:string ;

  constructor(private elRef:ElementRef,private renderer:Renderer) { }
  ngOnInit(){
    this.backgroundColor =this.defaultColor;
    // this.renderer.setElementStyle(this.elRef.nativeElement,'background-color','blue');
  }
  //better approach then native element
  @HostListener('mouseenter') mouseOver(eventData:Event){
    //listen to mouse enter event
    //this.renderer.setElementStyle(this.elRef.nativeElement,'background-color','blue');
    this.backgroundColor = this.highlightColor;
  }
  
  @HostListener('mouseleave') mouseLeave(eventData:Event){
    //listen to mouse enter event
   // this.renderer.setElementStyle(this.elRef.nativeElement,'background-color','transparent');
   this.backgroundColor =this.defaultColor;
  }

}
