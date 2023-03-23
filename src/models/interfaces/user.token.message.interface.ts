import {MessageType} from "../../app/Enums/MessageType";

export interface UserTokenMessage {
  Username: string;
  Token: string;
  MessageType: MessageType.UserToken;
}
