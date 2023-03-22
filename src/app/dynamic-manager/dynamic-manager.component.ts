import { Component, Input, ViewChild, ComponentRef, ViewContainerRef, OnChanges, SimpleChanges  } from '@angular/core';
import { Element } from 'src/models/interfaces/element.interface';
import { ModuleConfigMessage } from 'src/models/interfaces/module.config.interface';
import { AnalogMessage } from '../../models/interfaces/analog.message.interface';
import { DigitalMessage } from '../../models/interfaces/digital.message.interface';
import { StringMessage } from '../../models/interfaces/string.message.interface';
import { AmoduleComponent } from '../Modules/amodule/amodule.component';
import { KeypadComponent } from '../Modules/keypad/keypad.component';
import { SourceSelectComponent } from '../Modules/source-select/source-select.component';
import { ThermostatComponent } from "../Modules/thermostat/thermostat.component";
import { ButtonPanelComponent } from "../Modules/button-panel/button-panel.component";
import { ModuleType } from "../Enums/ModuleType";

interface ModuleInterface {
  id: number;
  type: ModuleType;
  elements: Element[];
  elementCount: number;
}

@Component({
  selector: 'app-dynamic-manager',
  templateUrl: './dynamic-manager.component.html',
  styleUrls: ['./dynamic-manager.component.css']
})
export class DynamicManagerComponent {
  @Input() modules: ModuleConfigMessage[];
  private componentRefs: ComponentRef<AmoduleComponent>[] = [];
  @ViewChild('dynamicComponentTemplate', { read: ViewContainerRef, static: true }) container: ViewContainerRef;

  constructor() {}

  private getComponentInstanceById(componentId: number): AmoduleComponent | null {
    for (const componentRef of this.componentRefs) {
      const instance = componentRef.instance;
      if (instance.id === componentId) {
        return instance;
      }
    }
    return null;
  }

  sendAnalogMessageToComponent(message: AnalogMessage) {
    const componentInstance = this.getComponentInstanceById(message.ModuleId);
    if (componentInstance) {
      componentInstance.receiveAnalogMessage(message.ElementId, message.Value);
    }
  }

  sendDigitalMessageToComponent(message: DigitalMessage) {
    const componentInstance = this.getComponentInstanceById(message.ModuleId);
    if (componentInstance) {
      componentInstance.receiveDigitalMessage(message.ElementId, message.State);
    }
  }

  sendStringMessageToComponent(message: StringMessage) {
    const componentInstance = this.getComponentInstanceById(message.ModuleId);
    if (componentInstance) {
      componentInstance.receiveStringMessage(message.ElementId, message.Value);
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    this.updateModules();
  }

  updateModules() {
    this.componentRefs.forEach(componentRef => {
      componentRef.destroy();
    });
    this.componentRefs = [];

    if(this.container === null){
      console.log("This container is null");
      return;
    }
    //console.log("Module Length: " + this.modules.length);
    this.modules.forEach(module => {
      //console.log("Types: "+ module.type)
      if(module.Type === ModuleType.source_select)
      {
        //console.log("Creating Source Select");
        const componentRef = this.container.createComponent(SourceSelectComponent);
        this.componentRefs.push(componentRef);
        let moduleInstance = <ModuleInterface>componentRef.instance;
        moduleInstance.id = module.Id;
        moduleInstance.elements = module.Elements;
        moduleInstance.type = module.Type;
      }
      else if(module.Type === ModuleType.Keypad)
      {
        //console.log("Creating Keypad");
        const componentRef = this.container.createComponent(KeypadComponent);
        this.componentRefs.push(componentRef);
        let moduleInstance = <ModuleInterface>componentRef.instance;
        moduleInstance.id = module.Id;
        moduleInstance.elements = module.Elements;
        moduleInstance.type = module.Type;
      }
      else if(module.Type === ModuleType.ButtonPanel)
      {
        //console.log("Creating ButtonPanel");
        const componentRef = this.container.createComponent(ButtonPanelComponent);
        this.componentRefs.push(componentRef);
        let moduleInstance = <ModuleInterface>componentRef.instance;
        moduleInstance.id = module.Id;
        moduleInstance.elements = module.Elements;
        moduleInstance.type = module.Type;
      }
      else if(module.Type === ModuleType.Thermostat)
      {
        //console.log("Creating Thermostat");
        const componentRef = this.container.createComponent(ThermostatComponent);
        this.componentRefs.push(componentRef);
        let moduleInstance = <ModuleInterface>componentRef.instance;
        moduleInstance.id = module.Id;
        moduleInstance.elements = module.Elements;
        moduleInstance.type = module.Type;
        // module.elements.forEach(element => {
        //   console.log("Thermostat: " + element.type);
        //   console.log("Thermostat: " + element.label);
        // });
      }

      //const componentRef = this.container.createComponent(ModuleComponent);

    });
  }

  ngOnDestroy() {
    this.container.clear();
  }
}
