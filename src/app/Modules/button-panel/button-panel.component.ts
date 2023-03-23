import { Component } from '@angular/core';
import {AModuleComponent} from "../a-module/a-module.component";
import {ProtocolService} from "../../ServerComs/Protocol/protocol.service";
import {ActionMessage} from "../../../models/interfaces/action.message.interface";
import {MessageType} from "../../Enums/MessageType";

@Component({
  selector: 'app-button-panel',
  templateUrl: './button-panel.component.html',
  styleUrls: ['./button-panel.component.scss']
})
export class ButtonPanelComponent extends AModuleComponent {

  public testIcon: string = 'https://upload.wikimedia.org/wikipedia/commons/3/3e/Disney%2B_logo.svg';

  constructor(
    private protoService: ProtocolService
  ) {
    super();
  }
  onSelect(num: number): void {
    this.sendAction(num);
  }

  sendAction(buttonId: number) {
    let actionMessage: ActionMessage = {
      ModuleId: this.id,
      ElementId: buttonId,
      MessageType: MessageType.Action
    };
    this.protoService.send(actionMessage);
  }

  receiveAnalogMessage(elementId: number, value: number): void {
  }

  receiveDigitalMessage(elementId: number, state: boolean): void {
  }

  receiveStringMessage(elementId: number, value: string): void {
  }

}
