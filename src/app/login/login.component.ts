import {Component, EventEmitter, Output} from '@angular/core';
import {ProtocolService} from "../ServerComs/Protocol/protocol.service";
import {LoginMessage} from "../../models/interfaces/login.message.interface";
import {MessageType} from "../Enums/MessageType";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  @Output() loginPressed = new EventEmitter<void>();
  username: string = '';
  password: string = '';
  constructor(private protoService: ProtocolService) {}
  tryLogin(username: string, password: string) {
    console.log("Try Login...")
    this.loginPressed.emit();
    if(username === ''){

    }
    else{
      let loginMessage: LoginMessage = {
        Username: username,
        Password: password,
        MessageType: MessageType.Login
      }
      this.protoService.send(loginMessage);
    }
  }
}
