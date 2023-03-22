import {MessageType} from "../../app/Enums/MessageType";

export interface LoginMessage {
  Username: string;
  Password: string;
  MessageType: MessageType.Login;
}
