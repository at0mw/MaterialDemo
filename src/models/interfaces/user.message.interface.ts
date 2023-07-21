import {MessageType} from "../../app/Enums/MessageType"
import {AccessLevel} from "../../app/Enums/AccessLevel"

export interface UserMessage {
  Username: string;
  ProfilePicture: string;
  Protected: boolean;
  AccessLevel: AccessLevel;
  MessageType: MessageType.User;
}
