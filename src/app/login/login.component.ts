import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { User } from '../auth/User';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  hide = true;
  
  haserror=0;
  
  userName:FormControl;
  password:FormControl;
  constructor(private auth:AuthService) { }
  
  ngOnInit() {
   
    this.userName=new FormControl('', [Validators.required]);
    this.password=new FormControl('',[ Validators.required,
      Validators.minLength(4),]);
  }
  public login()
  {
   
    let user =new User();
    
    user.username=this.userName.value;
    user.password=this.password.value; 
    
    this.auth.login(user).subscribe(message=>
      {
       console.log("success");
      }
      );
  }

 
  public hasError = (controlName: FormControl, errorName: string) =>{
    
    return controlName.hasError(errorName);
  }
}
