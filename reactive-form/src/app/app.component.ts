import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  
  genders = ['male', 'female'];
  signupForm!:FormGroup;
  forbiddenUsernames= ['Chris' , 'Anna'];

  ngOnInit(){
      //initialize form before rendering
      this.signupForm = new FormGroup({
        'userData': new FormGroup({
          'username': new FormControl(null,[Validators.required,this.forbiddenNames.bind(this)]),
          'email': new FormControl(null,[Validators.required,Validators.email],[this.forbiddenEmails]),
        }),
        'gender':new FormControl('female'),
        'hobbies':new FormArray([])
      });
      this.signupForm.valueChanges.subscribe(
        (value)=>{
          console.log(value);
        }
      )
      this.signupForm.statusChanges.subscribe(
        (value)=>{
          console.log(value);
        }
      );
      this.signupForm.setValue({
        'userData':{
          'username':'Maxxx',
          'email':'max@test.com'    
        },
        'gender':'male',
        'hobbies':[]
      });
      //patch value to update the part only
      this.signupForm.patchValue({
        'userData':{
          'username':'Maxxx1',
         }
      });

  }

  onSubmit(){
   console.log( this.signupForm);
   this.signupForm.reset();
  }
  //validate in ts file while using reactive forms

  getControls() {
    return (<FormArray>this.signupForm.get('hobbies')).controls;
  }
  onAddHobby(){
    const control = new FormControl(null,Validators.required);
    (<FormArray>this.signupForm.get('hobbies')).push(control);
  }

  //custom validator its a normal func that ang. form check

  forbiddenNames(control:FormControl): {[s:string]:boolean}{
    if(this.forbiddenUsernames.indexOf(control.value) !== -1){
      return {'nameIsForbidden': true};
    }
   return null as any;
  }
//async validators
  forbiddenEmails(control:AbstractControl): Promise<any> | Observable<any>{
    const promise = new Promise<any>((resolve,reject)=>{
      setTimeout(()=>{
        if(control.value == 'test@test.com'){
          resolve({'EmailIsForbidden':true});
        }else{
          resolve(null);
        }
      },1500);
    });
    return promise;
  }
}
