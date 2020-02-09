import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl, AbstractControl, ValidationErrors } from '@angular/forms';
import { CustomValidators } from '../custom-validators';
import { User } from '../auth/User';
import { AuthService } from '../auth/auth.service';
import { ToastService } from 'angular-toastify';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private auth: AuthService,private _toastService: ToastService) { }
  hide = true;
  haserror = 0;
  registerForm: FormGroup;

 passwordMatchValidator(g: FormGroup) {

    return g.get('password').value === g.get('passwordConfirm').value
       ? null : {'mismatch': true};
 }


  ngOnInit() {
    this.registerForm = new FormGroup({
      'userName': new FormControl('', [ Validators.required]),
      'password': new FormControl('',[Validators.required,
          CustomValidators.patternValidator(/\d/, { hasNumber: true }),
          CustomValidators.patternValidator(/^(?=.*[!@#\$%\^&\*])/,{ hasSpecialCharacters: true }),
          Validators.minLength(6), ]),
      'passwordConfirm': new FormControl('',[Validators.required])},this.passwordMatchValidator );

    }
  get userName() { return this.registerForm.get('userName'); }
  get password() { return this.registerForm.get('password'); }
  get passwordConfirm(){ return this.registerForm.get('passwordConfirm');}
  onSubmit(){

   console.log(this.registerForm.errors);
    if (this.registerForm.invalid)
   {
           return;
   }

   let user = new User();
   user.username = this.registerForm.value.userName;
   user.password = this.registerForm.value.password;
   this.auth.register(user).subscribe(()=>{
    this._toastService.success("success");
   },error=>{

    for(const i in error.messages)
    {
      this._toastService.error(error.messages[i]);
    }
    console.dir(error);
   }
   )
  }
}


