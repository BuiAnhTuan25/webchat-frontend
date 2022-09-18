import { Component , OnInit,DoCheck} from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { AuthenticationService } from '../auth.service'; 
import { NgForm } from '@angular/forms';
import { WebsocketService } from '../websocket.service';
import { Message } from '../models/Message';
import {Friends} from '../models/Friends';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent  implements OnInit { 
  constructor(public auth : AuthenticationService,public router: Router,public fb: FormBuilder,public websocket: WebsocketService) { }
  chatForm=this.fb.group({
    messages:['']
    });
  friends:any;
  messages:any;
  id_me=this.auth.id;
  id_friend:any;
  ngOnInit(): void {
    this.getListMessage(this.id_me);
    this.auth.updateStatusTrue(this.id_me).subscribe((response) => {
      console.log(response.status);
    });
    this.displayFriends();
    this.websocket.openWebSocket();
  }
  //khi component bị phá hủy
  ngOnDestroy(): void {
    this.websocket.closeWebSocket();
    this.auth.updateStatusFalse(this.id_me).subscribe((response) => {
      console.log(response.status);
    });
    this.websocket.messages=[];
  }
 //hiển thị bạn bè
  displayFriends(){
    this.auth.getListFriends().subscribe((data:Array<Friends>)=>this.friends=data);
  }
  profile(){
    this.router.navigate(['/profile']);
  }
  chatgroup(){
    this.router.navigate(['/chatgroup']);
  }
  login(){
    this.router.navigate(['/login']);
  }
  // click vào bạn bè 
  selectUser(name:string,id:string){
    //var nameFriend=(document.getElementById("i")as HTMLDivElement).innerText;
    //var idFriend=(document.getElementById("idFriend")as HTMLDivElement).innerText;
    
    this.id_friend=id;
    var selectedUserId=document.getElementById('selectedUserId');
    //this.getListMessage(this.auth.id,id);
    selectedUserId!.innerText="Chat with "+name;

    this.displayFriends();
  }
  //hiển thị lịch sử chat
  // getListMessage(sender:string,receiver:string){
  //   this.auth.getListMessage(sender,receiver).subscribe((data:Array<Message>)=>this.messages=data);
    
  // }
  //hiển thị lịch sử chat
  getListMessage(id:string){
    this.auth.getListMessage(id).subscribe((data:Array<Message>)=>this.messages=data);
    
  }
  //gửi tin nhắn
  sendMessage(sendForm: NgForm){
     this.websocket.sendMessage(this.id_me,sendForm.value.message,this.id_friend);
     
     sendForm.controls.message.reset();
     
     this.displayFriends();
  }

show(){
  
}
}
