import {InfoType} from "../../app/Enums/InfoType"
import {MessageType} from "../../app/Enums/MessageType"
import {UserMessage} from "./user.message.interface"

export interface ClientInfoMessage {
  InfoType: InfoType
  Message: string
  MessageType: MessageType.ClientInfo
}
