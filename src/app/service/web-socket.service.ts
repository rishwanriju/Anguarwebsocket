import { Injectable } from '@angular/core';
import { ChatMessageDto } from '../models/chatMessageDTO';


@Injectable({
  providedIn: 'root'
})
export class WebSocketService {

  webSocket : WebSocket | any 
  chatMessages: ChatMessageDto[] = [];
  

  constructor() { }

  public openWebSocket(){
    this.webSocket = new WebSocket('ws://localhost:8000/ws/notify/');

    this.webSocket.onopen = (event : any) => {
      console.log('Open: ', event);
    };

    this.webSocket.onmessage = (event : any) => {
      const chatMessageDto = JSON.parse(event.data);
      console.log(event.data)
      this.chatMessages.push(chatMessageDto);
    };

    this.webSocket.onclose = (event : any) => {
      console.log('Close: ', event);
    };
  }

  public sendMessage(chatMessageDto: ChatMessageDto){
    this.webSocket.send(JSON.stringify(chatMessageDto));
  }

  public closeWebSocket() {
    this.webSocket.close();
  }

 
}


