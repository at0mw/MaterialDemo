import {MessageType} from "../../app/Enums/MessageType";
import { ModuleConfigMessage } from "./module.config.interface";

export interface GridModuleConfigsMessage {
  TileModules: ModuleConfigMessage[];
  CurrentViewId: string;
  MessageType: MessageType.TileModulesConfigMessage;
}
