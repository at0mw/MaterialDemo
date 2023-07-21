export enum MessageType {
  Unknown = 0,
  Query = "Query",
  AvailableRooms = "AvailableRooms",
  Navigation = "Navigation",
  Action = "ActionCommand",
  Analog = "AnalogCommand",
  Digital = "DigitalCommand",
  String = "StringCommand",
  Login = "Login",
  AvailableUsers = "AvailableUsers",
  LogOut = "LogOut",
  AvailableDevices = 'AvailableDevices',
  User = "User",
  ClientInfo = "ClientInfo",
  DeviceConfig = "DeviceConfig"
}
