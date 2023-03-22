import {MessageType} from "../../app/Enums/MessageType";
import { ModuleConfigMessage } from "./module.config.interface";

export interface GridModuleConfigsMessage {
  Modules: ModuleConfigMessage[];
  CurrentViewId: string;
  MessageType: MessageType.AvailableGridModuleConfigs;
}
