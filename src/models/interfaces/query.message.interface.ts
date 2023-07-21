import {MessageType} from "../../app/Enums/MessageType";
import {QueryType} from "../../app/Enums/QueryType";

export interface QueryMessage {
  MessageType: MessageType.Query;
  QueryType: QueryType;
  DeviceId?: number;
}
