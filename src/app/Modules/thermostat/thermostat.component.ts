import { Component } from '@angular/core';
import {ElementType} from "../../Enums/ElementType";
import {AModuleComponent} from "../a-module/a-module.component";

@Component({
  selector: 'app-thermostat',
  templateUrl: './thermostat.component.html',
  styleUrls: ['./thermostat.component.scss']
})
export class ThermostatComponent extends AModuleComponent{
  public elementTypes = ElementType;

  constructor() {
    super();
    // console.log("Thermostat Elements Length: "+ this.elements)
    // this.elements.forEach(element => {
    //   console.log(element);
    // });
  }

  receiveAnalogMessage(elementId: number, value: number): void {
  }

  receiveDigitalMessage(elementId: number, state: boolean): void {
  }

  receiveStringMessage(elementId: number, value: string): void {
  }

}
