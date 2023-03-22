import {ElementType} from "../../app/Enums/ElementType";

export interface Element {
    Id: number;
    Type?: ElementType;
    Label?: string;
    Icon?:string;
    SecondaryLabel?: string;
    Minimum?: number;
    Maximum?: number;
    StepSize?: number;
  }
