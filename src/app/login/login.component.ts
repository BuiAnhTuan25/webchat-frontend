import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthenticationService } from '../auth.service'; 
import {User} from '../models/User';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private fb:FormBuilder,private router: Router, private authenticationService: AuthenticationService) { }
 loginForm=this.fb.group({
 username:[''],
 password:['']
 });
 invalidLogin = false;
 loginSuccess = false;
 user:any;

  ngOnInit(): void {
  }
  errorMessage:any;
  onBack(){
    this.router.navigate(['/register']);
    }

  login() {
    if(this.loginForm.value.username!=''&&this.loginForm.value.password!=''){
    this.authenticationService.login(this.loginForm.value.username,
   this.loginForm.value.password).subscribe((response)=> {
    var code=response.status;
    
    if(code==200){
    this.invalidLogin = false;
    this.loginSuccess = true;
    this.authenticationService.getUserLongin(this.loginForm.value.username).subscribe((data:User)=>this.user=data);
    this.authenticationService.username=this.loginForm.value.username;
    this.authenticationService.password=this.loginForm.value.password;
    this.authenticationService.id=this.user.id;
    this.authenticationService.name=this.user.name;
   this.authenticationService.updateStatusTrue(this.user.id).subscribe((response)=>{
     if(response.status==200) console.log(response.status);
   });
   this.authenticationService.registerSuccessfulLogin(this.user.id);
   
    this.router.navigate(['/chat']);
    }
    
    },()=>{
      this.invalidLogin = true;
      this.loginSuccess = false;
      this.errorMessage='Username hoặc password không chính xác!';
    });
    }
    else alert('Bạn chưa nhập username hoặc password');
  }
   } 
   
