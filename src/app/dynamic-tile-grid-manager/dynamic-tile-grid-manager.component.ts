import {Component, ComponentRef, Input, SimpleChanges, ViewChild, ViewContainerRef} from '@angular/core';
import {DeviceConfigMessage, ModuleConfigMessage} from "../../models/interfaces/device.config.interface";
import {AModuleComponent} from "../Modules/a-module/a-module.component";
import {ModuleType} from "../Enums/ModuleType";
import {ButtonPanelComponent} from "../Modules/button-panel/button-panel.component";
import {KeypadComponent} from "../Modules/keypad/keypad.component";
import {SourceSelectComponent} from "../Modules/source-select/source-select.component";
import {ThermostatComponent} from "../Modules/thermostat/thermostat.component";
import {AnalogMessage} from "../../models/interfaces/analog.message.interface";
import {DigitalMessage} from "../../models/interfaces/digital.message.interface";
import {StringMessage} from "../../models/interfaces/string.message.interface";
import {DynamicModuleComponent} from "../Modules/dynamic-module/dynamic-module.component";

interface ModuleInterface {
  id: number;
  type: ModuleType;
  elements: Element[];
  elementCount: number;
}

@Component({
  selector: 'app-dynamic-tile-grid-manager',
  templateUrl: './dynamic-tile-grid-manager.component.html',
  styleUrls: ['./dynamic-tile-grid-manager.component.scss']
})
export class DynamicTileGridManagerComponent {
  @Input() deviceConfig?: DeviceConfigMessage | null
  @ViewChild(DynamicModuleComponent) dynamicModuleComponent!: DynamicModuleComponent;

  relayAnalog(analogMessage : AnalogMessage){
    this.dynamicModuleComponent.sendAnalogMessageToComponent(analogMessage)
  }

  relayDigital(digitalMessage : DigitalMessage){
    this.dynamicModuleComponent.sendDigitalMessageToComponent(digitalMessage)
  }

  relayString(stringMessage : StringMessage){
    this.dynamicModuleComponent.sendStringMessageToComponent(stringMessage)
  }
}
