import {Component, Input, SimpleChanges, ViewChild} from '@angular/core';
import {ViewMessage} from "../../models/interfaces/view.message.interface";
import {ModuleMessage} from "../../models/interfaces/module.message.interface";
import {ModuleConfigMessage} from "../../models/interfaces/module.config.interface";
import {DynamicTileGridManagerComponent} from "../dynamic-tile-grid-manager/dynamic-tile-grid-manager.component";
import {AnalogMessage} from "../../models/interfaces/analog.message.interface";
import {DigitalMessage} from "../../models/interfaces/digital.message.interface";
import {StringMessage} from "../../models/interfaces/string.message.interface";

@Component({
  selector: 'app-modules-view',
  templateUrl: './modules-view.component.html',
  styleUrls: ['./modules-view.component.scss']
})
export class ModulesViewComponent {
  // Uni-directional Data Flow
  @Input() availableModules: ModuleMessage[] = [];
  @Input() tileModulesConfig: ModuleConfigMessage[] = []
  @ViewChild(DynamicTileGridManagerComponent) dynamicTileGridComponent!: DynamicTileGridManagerComponent;

  relayAnalog(analogMessage : AnalogMessage){
    this.dynamicTileGridComponent.relayAnalog(analogMessage)
  }

  relayDigital(digitalMessage : DigitalMessage){
    this.dynamicTileGridComponent.relayDigital(digitalMessage)
  }

  relayString(stringMessage : StringMessage){
    this.dynamicTileGridComponent.relayString(stringMessage)
  }


  selectModule(Id: number) {

  }


}
