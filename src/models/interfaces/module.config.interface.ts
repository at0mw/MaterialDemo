import { Element } from "./element.interface"
import {ModuleType} from "../../app/Enums/ModuleType"
import { GridDetails } from "./grid.details.interface"


export interface ModuleConfig {
    ModuleId: number
    ModuleType: string
    GridDetails: GridDetails
    Elements: Element[]
  }
