import {MessageType} from "../../app/Enums/MessageType";

export interface DigitalMessage {
    ModuleId: number;
    ElementId: number;
    State: boolean;
    MessageType: MessageType.Digital;
  }
