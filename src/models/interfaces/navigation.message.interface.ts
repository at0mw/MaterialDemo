import {MessageType} from "../../app/Enums/MessageType";

export interface NavigationMessage {
  ViewId?: string;
  MessageType: MessageType.Navigation;
}
