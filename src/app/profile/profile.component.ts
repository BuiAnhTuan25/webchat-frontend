import { Component, OnInit,DoCheck } from '@angular/core';
import {AuthenticationService} from '../auth.service';
import { FormBuilder } from '@angular/forms';
import {User} from '../models/User';
import {Friends} from '../models/Friends';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private auth:AuthenticationService,private fb:FormBuilder ,private router: Router) { }
  
    
    
    friends:any;
    check:any;
    user:any;
    user1:any;
    thongBao!:string;
    idUser=this.auth.id;
    //nameUser=this.auth.name;
    username=this.auth.username;
    //password=this.auth.password;
    
  ngOnInit() :void{
    this.auth.updateStatusTrue(this.idUser).subscribe((response) => {
      console.log(response.status);
    });
   this.displayFriends();
   this.displayProfile();
  }
  //khi component bị phá hủy
  ngOnDestroy(): void {
    this.auth.updateStatusFalse(this.idUser).subscribe((response) => {
      console.log(response.status);
    });
  }
  //mở chat
  chat(){
    this.router.navigate(['/chat']);
  }
  chatgroup(){
    this.router.navigate(['/chatgroup']);
  }
  login(){
    this.router.navigate(['/login']);
  }
  //hiển thị thông tin người dùng
  displayProfile(){
 this.auth.getProfile().subscribe((data:User)=>this.user=data );
}
//hiển thị bạn bè
displayFriends(){
  this.auth.getListFriends().subscribe((data:Array<Friends>)=>this.friends=data);
  
}

//tìm bạn by ID
findUserById(sendForm: NgForm){
  this.auth.findUser(sendForm.value.id_find).subscribe((data:Array<User>)=>this.user1=data);
  //kiểm tra ID tìm được đã kết bạn chưa
  this.check=false;
  for(var i=0;i<this.friends.length;i++) {
    if(this.friends[i].name==this.user1[0].name){
      this.check=true;
      console.log("Đã kết bạn"+this.user1[0].name);
    }   
  }
  
  sendForm.controls.id_find.reset();
}
//Xóa bạn
deleteFriend(id_friend:string){
  this.auth.deleteFriend(this.auth.id,id_friend).subscribe((response)=>{
    if(response!==null){
      console.log('Xóa bạn thành công');
      for(var i=0;i<this.friends.length;i++){
        if(this.friends[i].id_friend==response){
          this.friends.splice(i,1);
        }
      }
      this.auth.deleteFriend(id_friend,this.auth.id).subscribe((response)=>{
        if(response!==null){
          console.log('Xóa bạn thành công');
          
          }
      });
    }
  });
  
}
//thêm bạn bè
addFriend(idFriend:string,nameFriend:string){
  this.auth.addFriend(idFriend,nameFriend,this.idUser,false).subscribe((response) =>{
    if(response!==null){
      console.log('Thêm bạn thành công');
      this.friends=[response,...this.friends];
      this.auth.addFriend(this.idUser,this.user.name,idFriend,true).subscribe((response) =>{
        if(response!==null){
          console.log('Thêm bạn thành công');
          alert('Bạn và '+nameFriend+' đã trở thành bạn bè');
        }
      });
    }
  });
  this.user1=null;
}
//thay đổi tên người dùng
updateNameUser(nameForm:NgForm){
  this.auth.updateNameUser(nameForm.value.nameUser).subscribe((response) =>{
    console.log(response)
    if(response!==null){
      console.log('Update user thành công');
      this.user=response;
    }

  });
  nameForm.controls.nameUser.reset();
  
}
//thay đổi password
updatePassword(passwordForm:NgForm){
  this.auth.updatePassword(passwordForm.value.password).subscribe((response) =>{
    
    if(response!=null){
      console.log('Update user thành công');
      this.user=response;
    }
  });
  
  passwordForm.controls.password.reset();
}

}
