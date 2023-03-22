import { Component, Input, SimpleChanges } from '@angular/core';
import {ViewMessage} from "../../models/interfaces/view.message.interface";
import {ModuleMessage} from "../../models/interfaces/module.message.interface";
import {ModuleConfigMessage} from "../../models/interfaces/module.config.interface";

@Component({
  selector: 'app-modules-view',
  templateUrl: './modules-view.component.html',
  styleUrls: ['./modules-view.component.scss']
})
export class ModulesViewComponent {
  // Uni-directional Data Flow
  @Input() availableModules: ModuleMessage[] = [];
  @Input() availableModuleConfigs: ModuleConfigMessage[] = []

  ngOnChanges(changes: SimpleChanges) {
    this.updateAvailableModules();
    this.updateModuleConfigs();
  }

  updateAvailableModules(){
    this.availableModules.forEach(module => {
      console.log("Module: " + module.Label);
    })
  }

  private updateModuleConfigs() {
    this.availableModuleConfigs.forEach(module => {
      console.log("Module Type: " + module.Type);
    })
  }

  selectModule(Id: number) {

  }


}
