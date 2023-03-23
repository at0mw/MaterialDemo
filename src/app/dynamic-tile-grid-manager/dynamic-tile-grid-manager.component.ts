import {Component, ComponentRef, Input, SimpleChanges, ViewChild, ViewContainerRef} from '@angular/core';
import {ModuleConfigMessage} from "../../models/interfaces/module.config.interface";
import {AModuleComponent} from "../Modules/a-module/a-module.component";
import {ModuleType} from "../Enums/ModuleType";
import {ButtonPanelComponent} from "../Modules/button-panel/button-panel.component";
import {KeypadComponent} from "../Modules/keypad/keypad.component";
import {SourceSelectComponent} from "../Modules/source-select/source-select.component";
import {ThermostatComponent} from "../Modules/thermostat/thermostat.component";

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
  @Input() tileModulesConfig: ModuleConfigMessage[] = []
  //public componentRefs: ComponentRef<AModuleComponent>[] = []
  //@ViewChild('dynamicComponentTemplate', { read: ViewContainerRef, static: true }) container!: ViewContainerRef;

  ngOnChanges(changes: SimpleChanges) {
    //this.updateModuleConfigs();
    //this.updateModules();
  }

  // private updateModuleConfigs() {
  //   this.tileModulesConfig.forEach(module => {
  //     console.log("Module Type: " + module.Type);
  //   })
  // }

  // updateModuleConfigs() {
  //   this.componentRefs.forEach(componentRef => {
  //     componentRef.destroy();
  //   });
  //   this.componentRefs = [];
  //
  //   if(this.container === null){
  //     console.log("This container is null");
  //     return;
  //   }
  //   console.log("Module Length: " + this.tileModulesConfig.length);
  //   this.tileModulesConfig.forEach(module => {
  //     if(module.Type === ModuleType.source_select)
  //     {
  //       const componentRef = this.container.createComponent(SourceSelectComponent);
  //       this.componentRefs.push(componentRef);
  //       let moduleInstance = componentRef.instance;
  //       moduleInstance.id = module.Id;
  //       moduleInstance.elements = module.Elements;
  //       moduleInstance.type = module.Type;
  //     }
  //     else if(module.Type === ModuleType.ButtonPanel)
  //     {
  //       const componentRef = this.container.createComponent(ButtonPanelComponent);
  //       this.componentRefs.push(componentRef);
  //       let moduleInstance = componentRef.instance;
  //       moduleInstance.id = module.Id;
  //       moduleInstance.elements = module.Elements;
  //       moduleInstance.type = module.Type;
  //     }
  //     else if(module.Type === ModuleType.Thermostat)
  //     {
  //       const componentRef = this.container.createComponent(ThermostatComponent);
  //       this.componentRefs.push(componentRef);
  //       let moduleInstance = componentRef.instance;
  //       moduleInstance.id = module.Id;
  //       moduleInstance.elements = module.Elements;
  //       moduleInstance.type = module.Type;
  //     }
  //   });
  // }
}
