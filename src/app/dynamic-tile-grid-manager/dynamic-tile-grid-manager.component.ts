import {Component, Input, SimpleChanges} from '@angular/core';
import {ModuleConfigMessage} from "../../models/interfaces/module.config.interface";

@Component({
  selector: 'app-dynamic-tile-grid-manager',
  templateUrl: './dynamic-tile-grid-manager.component.html',
  styleUrls: ['./dynamic-tile-grid-manager.component.scss']
})
export class DynamicTileGridManagerComponent {
  @Input() tileModulesConfig: ModuleConfigMessage[] = []
  //private componentRefs: ComponentRef<AModuleComponent>[] = []

  ngOnChanges(changes: SimpleChanges) {
    this.updateModuleConfigs();
  }

  private updateModuleConfigs() {
    this.tileModulesConfig.forEach(module => {
      console.log("Module Type: " + module.Type);
    })
  }
}
