import { Component, ElementRef, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild('form') signupForm!:NgForm;
  defaultQuestion ="pet";
  answer='';
  genders = ['male','female']; 
  user = {
    username:'',
    email:'',
    secretQuestion:'',
    answer:'',
    gender:''
  }
  submitted = false;
  suggestUsername() {
    const suggestedName = 'Superuser';
    //setValue to set the whole form
    // this.signupForm.setValue({
    //   userData: {
    //     username: suggestedName,
    //     email:''
    //   },
    //   secret:'pet',
    //   questionAnswer:'',
    //   gender:'female'
    // });
    //patch value to override parts of the forms
    this.signupForm.form.patchValue({
        userData:{
          username:suggestedName
        }
    });
  }

  // onSubmit(form:NgForm){
  //   console.log(form);
  // }
  onSubmit(){
    this.submitted =true;
    console.log(this.signupForm);
    this.user.username = this.signupForm.value.userData.username;
    this.user.email = this.signupForm.value.userData.email;
    this.user.secretQuestion = this.signupForm.value.secret;
    this.user.answer = this.signupForm.value.questionAnswer;
    this.user.gender = this.signupForm.value.gender;


    this.signupForm.reset();
  }
}
