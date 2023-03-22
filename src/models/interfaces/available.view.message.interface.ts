import {MessageType} from "../../app/Enums/MessageType";
import {ViewMessage} from "./view.message.interface";

export interface AvailableViewMessage {
  AvailableViews: ViewMessage[];
  MessageType: MessageType.AvailableViews;
}
