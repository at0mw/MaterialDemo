import {MessageType} from "../../app/Enums/MessageType";
import {UserTokenMessage} from "./user.token.message.interface";

export interface ClientUsersMessage {
  LoggedInUsers: UserTokenMessage[];
  MessageType: MessageType.ClientUsers;
}
