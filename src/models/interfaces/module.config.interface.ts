import { Element } from "./element.interface";
import {ModuleType} from "../../app/Enums/ModuleType";


export interface ModuleConfigMessage {
    Id: number;
    Type: ModuleType;
    Elements: Element[];
  }
