import {MessageType} from "../../app/Enums/MessageType";

export interface AnalogMessage {
    ModuleId: number;
    ElementId: number;
    Value: number;
    MessageType: MessageType.Analog;
  }
