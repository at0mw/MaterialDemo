import { Injectable } from '@angular/core';
import {WebsocketService} from "../Websocket Service/websocket.service";

@Injectable({
  providedIn: 'root'
})
export class ProtocolService {

  constructor(
    private wsService: WebsocketService
  ) { }

  //////// [Handle Send Message] //////////
  send(message: any){

    let jsonString = JSON.stringify(message);
    console.log("Sending: ",jsonString);
    this.wsService.send(jsonString);
  }
}


