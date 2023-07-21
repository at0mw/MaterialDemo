import {MessageType} from "../../app/Enums/MessageType";
import {UserMessage} from "./user.message.interface";

export interface AvailableUsersMessage {
  CurrentUser: UserMessage;
  Users: UserMessage[];
  MessageType: MessageType.AvailableUsers;
}
