import { Injectable } from '@angular/core';
import { Message } from '../app/models/Message';
import { AuthenticationService } from './auth.service';
@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  webSocket!: WebSocket;
  messages: Message[] = [];
    
  constructor(private auth: AuthenticationService) { }

  public openWebSocket(){
    this.webSocket = new WebSocket('ws://localhost:8080/chat');
    this.webSocket.onopen = (event) => {
      console.log('Open: ', event);
    };

    this.webSocket.onmessage = (event) => {
      console.log('Send: ', event);
      const chatMessageDto = JSON.parse(event.data);
        this.messages.push(chatMessageDto); 
        
        
    };

    this.webSocket.onclose = (event) => {
      console.log('Close: ', event);
      
    };
  }

  public sendMessage(sender: string, content: string,receiver:string){
    console.log('SendMessage: ');
    this.webSocket.send(JSON.stringify({
      sender:sender,
      content:content,
      receiver:receiver
    }));
      this.auth.addMessage(sender,content,receiver).subscribe((response)=>{
        var code=response.status;
        if(code==200){
        console.log('Lưu message thành công ');
        }
      });
  }
  

  public closeWebSocket() {
    this.webSocket.close();
  }
}