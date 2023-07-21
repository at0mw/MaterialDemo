import {ModuleType} from "../../app/Enums/ModuleType";
import {ModuleConfig} from "./module.config.interface";


export interface DeviceConfigMessage {
    DeviceId: number;
    DeviceIcon: string;
    DeviceLabel: string;
    ModuleConfigs: ModuleConfig[];
  }
