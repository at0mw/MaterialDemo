import {MessageType} from "../../app/Enums/MessageType";
import {NavigationType} from "../../app/Enums/NavigationType";

export interface NavigationMessage {
  RoomId?: number;
  NavigationType: NavigationType;
  MessageType: MessageType.Navigation;
}
