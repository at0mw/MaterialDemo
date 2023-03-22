import {MessageType} from "../../app/Enums/MessageType";

export interface ActionMessage {
  ModuleId: number;
  ElementId: number;
  MessageType: MessageType.Action;
}
