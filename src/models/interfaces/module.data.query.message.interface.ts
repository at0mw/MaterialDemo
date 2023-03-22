import {MessageType} from "../../app/Enums/MessageType";

export interface ModuleDataQueryMessage {
  ModuleId: number;
  MessageType: MessageType.QueryModuleData;
}
