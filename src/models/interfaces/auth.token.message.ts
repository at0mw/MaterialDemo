import {MessageType} from "../../app/Enums/MessageType";

export interface AuthTokenMessage {
  ClientId: string;
  Token: string;
  MessageType: MessageType.AuthToken;
}
