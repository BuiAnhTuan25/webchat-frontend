import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { AuthenticationService } from '../auth.service'; 
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']

})
export class RegisterComponent implements OnInit {

  constructor(private fb:FormBuilder,private router: Router, private authenticationService: AuthenticationService) { }
 registerForm=this.fb.group({
 username:[''],
 password:[''],
 retypePassword:[''],
 name:['']
 });
 errorMessage!:String;
  ngOnInit(): void {
  }
  onBack(){
    this.router.navigate(['/login']);
    }
  register() {
    
    if(this.registerForm.value.username!=''&&this.registerForm.value.password!=''&&this.registerForm.value.name!=''){
    if(this.registerForm.value.password==this.registerForm.value.retypePassword){
      
    this.authenticationService.register(this.registerForm.value.username,this.registerForm.value.password,
    this.registerForm.value.name).subscribe((response)=> {
      var code=response.status;
      if(code==201){
      
        alert('Đăng ký thành công !');
      }
      else alert('Username đã tồn tại !');     
      }
    
      );
      }
      else alert('Password không trùng khớp ! ');
      }
      else alert('Bạn phải nhập đầy đủ thông tin');
    } 
}
