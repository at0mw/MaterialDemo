import {Component, Input, SimpleChanges, ViewChild} from '@angular/core';
import {RoomMessage} from "../../models/interfaces/room.message.interface";
import {DeviceMessage} from "../../models/interfaces/device.message.interface";
import {DeviceConfigMessage} from "../../models/interfaces/device.config.interface";
import {DynamicTileGridManagerComponent} from "../dynamic-tile-grid-manager/dynamic-tile-grid-manager.component";
import {AnalogMessage} from "../../models/interfaces/analog.message.interface";
import {DigitalMessage} from "../../models/interfaces/digital.message.interface";
import {StringMessage} from "../../models/interfaces/string.message.interface";

@Component({
  selector: 'app-devices-view',
  templateUrl: './devices-view.component.html',
  styleUrls: ['./devices-view.component.scss']
})
export class DevicesViewComponent {
  // Uni-directional Data Flow
  @Input() availableDevices: DeviceMessage[] = [];
  @Input() deviceConfig?: DeviceConfigMessage | null
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


  selectDevice(Id: number) {

  }


}
