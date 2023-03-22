import {MessageType} from "../../app/Enums/MessageType";

export interface ModuleQueryMessage {
  ModuleId: number;
  MessageType: MessageType.QueryModule;
}
