import {MessageType} from "../../app/Enums/MessageType";

export interface StringMessage {
    ModuleId: number;
    ElementId: number;
    Value: string;
    MessageType: MessageType.String;
  }
