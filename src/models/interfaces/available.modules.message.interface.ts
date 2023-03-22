import {MessageType} from "../../app/Enums/MessageType";
import { ModuleMessage } from "./module.message.interface";

export interface AvailableModulesMessage {
  Modules: ModuleMessage[];
  MessageType: MessageType.AvailableModules;
}
