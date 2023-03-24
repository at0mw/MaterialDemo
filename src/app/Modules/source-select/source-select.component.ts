import { Component } from '@angular/core';
import {MessageType} from "../../Enums/MessageType";
import {DigitalMessage} from "../../../models/interfaces/digital.message.interface";
import {ProtocolService} from "../../ServerComs/Protocol/protocol.service";
import {AModuleComponent} from "../a-module/a-module.component";

@Component({
  selector: 'app-source-select',
  templateUrl: './source-select.component.html',
  styleUrls: ['./source-select.component.scss']
})
export class SourceSelectComponent extends AModuleComponent {
  // @Input() componentId: number;
  // @Input() sources: CompElement[];

  selectedSource: number = -1;

  constructor(
    private protoService: ProtocolService
  ) {
    super();
  }

  onSource(num: number): void {
    // Set last source false: Purely demo
    if (this.selectedSource === num) {
      //console.log("Doing selec === num");
      this.SendSourceState(this.selectedSource, false);
      this.selectedSource = -1;
      return;
    } else if (this.selectedSource !== -1) {
      //console.log("Doing selec !== -1");
      this.SendSourceState(this.selectedSource, false);
    }

    //this.selectedSource = num;
    this.SendSourceState(num, true);
    //console.log("Setting Selected Source True" + num);
  }

  SendSourceState(sourceId: number, state: boolean) {
    let digitalMessage: DigitalMessage = {
      ModuleId: this.id,
      ElementId: sourceId,
      State: state,
      MessageType: MessageType.Digital
    };

    this.protoService.send(digitalMessage);
  }

  receiveAnalogMessage(elementId: number, value: number) {
    //console.log("Analog Message Received. ElementID: " + elementId + " Value: " + value);
  }

  receiveDigitalMessage(elementId: number, state: boolean) {
    console.log("Digital Message Received. ElementID: " + elementId + " State: " + state);
    this.updateSourceActive(elementId, state);
  }

  updateSourceActive(elementId: number, state: boolean){
    if(state){
      this.selectedSource = elementId;
    }
    // else{
    //   this.selectedSource = -1;
    // }
  }

  receiveStringMessage(elementId: number, value: string) {
    //console.log("String Message Received. ElementID: " + elementId + " Value: " + value);
  }
}
