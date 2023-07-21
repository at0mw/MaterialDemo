import {MessageType} from "../../app/Enums/MessageType";
import {DeviceMessage} from "./device.message.interface";

export interface AvailableDevicesMessage {
  Devices: DeviceMessage[];
  MessageType: MessageType.AvailableDevices;
}
