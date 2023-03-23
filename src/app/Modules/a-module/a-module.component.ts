import {Component, Input} from '@angular/core';
import {ModuleType} from 'src/app/Enums/ModuleType';
import {Element} from "../../../models/interfaces/element.interface";


@Component({
  selector: 'app-a-module',
  templateUrl: './a-module.component.html',
  styleUrls: ['./a-module.component.scss']
})
export abstract class AModuleComponent {
  @Input() id: number = -1;
  @Input() type: ModuleType = ModuleType.Undefined;
  @Input() elementCount: number = 0;
  @Input() elements: Element[] = [];
  readonly ModuleType = ModuleType;

  abstract receiveAnalogMessage(elementId: number, value: number): void;

  abstract receiveDigitalMessage(elementId: number, state: boolean): void;

  abstract receiveStringMessage(elementId: number, value: string): void;
}
