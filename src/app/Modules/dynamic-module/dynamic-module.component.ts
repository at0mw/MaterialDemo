import {Component, Input, SimpleChanges, ComponentRef, ViewChild, ViewContainerRef} from '@angular/core';
import {ModuleConfigMessage} from "../../../models/interfaces/module.config.interface";
import {ModuleType} from "../../Enums/ModuleType";
import {StringMessage} from "../../../models/interfaces/string.message.interface";
import {SourceSelectComponent} from "../source-select/source-select.component";
import {KeypadComponent} from "../keypad/keypad.component";
import {ButtonPanelComponent} from "../button-panel/button-panel.component";
import {ThermostatComponent} from "../thermostat/thermostat.component";
import {QueryMessage} from "../../../models/interfaces/query.message.interface";
import {MessageType} from "../../Enums/MessageType";
import {QueryType} from "../../Enums/QueryType";
import {DigitalMessage} from "../../../models/interfaces/digital.message.interface";
import {ProtocolService} from "../../ServerComs/Protocol/protocol.service";
import {AnalogMessage} from "../../../models/interfaces/analog.message.interface";
import {AModuleComponent} from "../a-module/a-module.component";

@Component({
  selector: 'app-dynamic-module',
  templateUrl: './dynamic-module.component.html',
  styleUrls: ['./dynamic-module.component.scss']
})
export class DynamicModuleComponent {
  @ViewChild('dynamicComponentTemplate', { read: ViewContainerRef, static: true }) container!: ViewContainerRef;
  // Initialise as Default Component
  @Input() tileModuleConfig: ModuleConfigMessage = {
    Id: -1,
    Elements: [] = [],
    Type: ModuleType.Undefined,
  }
  private componentRefs: ComponentRef<AModuleComponent> [] = [];

  constructor(private protoService: ProtocolService) {}

  sendAnalogMessageToComponent(message: AnalogMessage) {
    if(message.ModuleId === this.tileModuleConfig.Id){
      for (const componentRef of this.componentRefs) {
        const componentInstance = componentRef.instance;
        if (componentInstance) {
          componentInstance.receiveAnalogMessage(message.ElementId, message.Value);
        }
      }
    }
  }

  sendDigitalMessageToComponent(message: DigitalMessage) {
    console.log("Receiving Digital Message in Dynamic Module")
    if(message.ModuleId === this.tileModuleConfig.Id){
      for (const componentRef of this.componentRefs) {
        const componentInstance = componentRef.instance;
        if (componentInstance) {
          componentInstance.receiveDigitalMessage(message.ElementId, message.State);
        }
      }
    }
  }

  sendStringMessageToComponent(message: StringMessage) {
    console.log("Receiving String Message in Dynamic Module")
    if(message.ModuleId === this.tileModuleConfig.Id){
      for (const componentRef of this.componentRefs) {
        const componentInstance = componentRef.instance;
        if (componentInstance) {
          componentInstance.receiveStringMessage(message.ElementId, message.Value);
        }
      }
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    this.updateModule();
  }

  updateModule() {
    this.componentRefs.forEach(componentRef => {
      componentRef.destroy();
    });
    this.componentRefs = [];

    if(this.container === null){
      console.log("This container is null");
      return;
    }
    if(this.tileModuleConfig === null){
      return;
    }

    if(this.tileModuleConfig.Type === ModuleType.source_select)
    {
      //console.log("Creating Source Select");
      const componentRef = this.container.createComponent(SourceSelectComponent);
      this.componentRefs.push(componentRef);
      let moduleInstance = componentRef.instance;
      moduleInstance.id = this.tileModuleConfig.Id;
      moduleInstance.elements = this.tileModuleConfig.Elements;
      moduleInstance.type = this.tileModuleConfig.Type;
    }
    else if(this.tileModuleConfig.Type === ModuleType.ButtonPanel)
    {
      //console.log("Creating ButtonPanel");
      const componentRef = this.container.createComponent(ButtonPanelComponent);
      this.componentRefs.push(componentRef);
      let moduleInstance = componentRef.instance;
      moduleInstance.id = this.tileModuleConfig.Id;
      moduleInstance.elements = this.tileModuleConfig.Elements;
      moduleInstance.type = this.tileModuleConfig.Type;
    }
    else if(this.tileModuleConfig.Type === ModuleType.Thermostat)
    {
      //console.log("Creating Thermostat");
      const componentRef = this.container.createComponent(ThermostatComponent);
      this.componentRefs.push(componentRef);
      let moduleInstance = componentRef.instance;
      moduleInstance.id = this.tileModuleConfig.Id;
      moduleInstance.elements = this.tileModuleConfig.Elements;
      moduleInstance.type = this.tileModuleConfig.Type;
    }


    // Ask for data update
    let moduleDataQueryMessage: QueryMessage = {
      ModuleId: this.tileModuleConfig.Id,
      QueryType: QueryType.SingleModuleDataQuery,
      MessageType: MessageType.Query
    };

    this.protoService.send(moduleDataQueryMessage);
  }

  ngOnDestroy() {
    this.container.clear();
  }


}
