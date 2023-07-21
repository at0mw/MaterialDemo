import {MessageType} from "../../app/Enums/MessageType";
import {RoomMessage} from "./room.message.interface";

export interface AvailableRoomsMessage {
  Rooms: RoomMessage[];
  MessageType: MessageType.AvailableRooms;
}
