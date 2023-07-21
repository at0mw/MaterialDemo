import {Injectable} from "@angular/core"
import {environment} from "../../Environments/environments"
import {Observable, Subject, tap} from "rxjs"
import {DeviceConfigMessage} from 'src/models/interfaces/device.config.interface'
import {AnalogMessage} from "../../../models/interfaces/analog.message.interface"
import {DigitalMessage} from "../../../models/interfaces/digital.message.interface"
import {StringMessage} from "../../../models/interfaces/string.message.interface"
import {AvailableRoomsMessage} from "../../../models/interfaces/available.rooms.message.interface"
import {ClientInfoMessage} from "../../../models/interfaces/client.info.message.interface"
import {RoomMessage} from "../../../models/interfaces/room.message.interface"
import {QueryMessage} from "../../../models/interfaces/query.message.interface"
import {MessageType} from "../../Enums/MessageType"
import {AvailableDevicesMessage} from "../../../models/interfaces/available.devices.message.interface"
import {DeviceMessage} from "../../../models/interfaces/device.message.interface"
import {QueryType} from "../../Enums/QueryType";
import {AvailableUsersMessage} from "../../../models/interfaces/client.users.message.interface";
import { UserMessage } from "src/models/interfaces/user.message.interface"

@Injectable({
  providedIn: 'root'
})

export class WebsocketService {
  private ws!: WebSocket
  private messages: Subject<string> = new Subject<string>()

  private analogMessages: Subject<AnalogMessage> = new Subject<AnalogMessage>()
  private digitalMessages: Subject<DigitalMessage> = new Subject<DigitalMessage>()
  private stringMessages: Subject<StringMessage> = new Subject<StringMessage>()
  private deviceConfig: Subject<DeviceConfigMessage | null> = new Subject<DeviceConfigMessage | null>()
  private updates: Subject<DeviceConfigMessage[]> = new Subject<DeviceConfigMessage[]>()
  private availableDevices: Subject<DeviceMessage[]> = new Subject<DeviceMessage[]>()
  private availableViews: Subject<RoomMessage[]> = new Subject<RoomMessage[]>()
  private onClose: Subject<CloseEvent> = new Subject<CloseEvent>()

  private users: Subject<UserMessage[]> = new Subject<UserMessage[]>()
  constructor() {
    console.log("Begin WebSocketService")
    this.InitialiseWebSocket()
    this.AddWebSocketEventListeners()
  }
  private InitialiseWebSocket() {
    const encodedClientId = "tomTestClientBrowser"//encodeURIComponent(username)
    const encodedToken = ""//encodeURIComponent(password)

    const url = `${environment.CHAT_URL}?clientId=${encodedClientId}&auth-token=${encodedToken}`
    this.ws = new WebSocket(url)
  }

  private AddWebSocketEventListeners() {
    this.ws.addEventListener('open', () => {
      console.log('WebSocket connection opened')
      console.log('Request Configuration...')
      this.requestConfiguration()
    })

    this.ws.addEventListener('message', async (event: MessageEvent) => {
      console.log('Received message...')
      const data = event.data
      this.handleMessage(data)
    })

    this.ws.addEventListener('close', (event: CloseEvent) => {
      console.log('WebSocket connection closed')
      this.onClose.next(event)
    })

    this.ws.addEventListener('error', (event: Event) => {
      console.error('WebSocket error:', event)
    })
  }

  handleMessage(message: string) {
    console.log('Received message:', message)
    const messageObject = JSON.parse(message)
    const messageType = messageObject.MessageType

    switch (messageType) {
      case MessageType.AvailableDevices:
        this.handleAvailableDevicesMessage(messageObject as AvailableDevicesMessage)
        break
      case MessageType.AvailableRooms:
        this.handleAvailableViewMessage(messageObject as AvailableRoomsMessage)
        break
      case MessageType.Analog:
        this.handleAnalogMessage(messageObject as AnalogMessage)
        break
      case MessageType.Digital:
        this.handleDigitalMessage(messageObject as DigitalMessage)
        break
      case MessageType.String:
        this.handleStringMessage(messageObject as StringMessage)
        break
      case MessageType.AvailableUsers:
        this.handleClientUsersMessage(messageObject as AvailableUsersMessage)
        break
      case MessageType.ClientInfo:
        this.handleClientInfoMessage(messageObject as ClientInfoMessage)
        break;
      case MessageType.DeviceConfig:
        this.handleDeviceConfigMessage(messageObject as DeviceConfigMessage)
        break;
      default:
        console.log("Invalid Type")
        break
    }
  }

  handleDeviceConfigMessage(message: DeviceConfigMessage) {
    this.deviceConfig.next(message)
  }


  private handleClientInfoMessage(message: ClientInfoMessage) {
    console.log('ClientInfo: ', message.InfoType, message.Message)
  }

  private handleClientUsersMessage(message: AvailableUsersMessage) {
    this.users.next(message.Users)
    //this.user = message.Users
  }


  handleAvailableViewMessage(message: AvailableRoomsMessage) {
    this.deviceConfig.next(null)
    this.availableViews.next(message.Rooms)
  }

  handleAvailableDevicesMessage(message: AvailableDevicesMessage) {
    this.availableDevices.next(message.Devices)
  }

  handleAnalogMessage(message: AnalogMessage) {
    this.analogMessages.next(message)
  }

  handleDigitalMessage(message: DigitalMessage) {
    this.digitalMessages.next(message)
  }

  handleStringMessage(message: StringMessage) {
    this.stringMessages.next(message)
  }

  send(message: any) {
    if (this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(message)
    } else {
      console.error('WebSocket is not open')
    }
  }

  // close() {
  //   this.ws.close()
  // }

  requestConfiguration() {
    if (this.ws.readyState === WebSocket.OPEN) {
      console.log('WebSocket is open')

    let queryMessage: QueryMessage = {
      MessageType: MessageType.Query,
      QueryType: QueryType.GenericQuery
    }

    let jsonString = JSON.stringify(queryMessage)
    this.send(jsonString)

    let userQueryMessage: QueryMessage = {
      MessageType: MessageType.Query,
      QueryType: QueryType.ClientLoggedInUsers
    }
    let jsonString2 = JSON.stringify(userQueryMessage)
    this.send(jsonString2)
    } else {
      console.error('WebSocket is not open')
    }
    }

  ////////// [Subscription Getters] //////////
  get isConnected() {
    return this.ws.readyState === WebSocket.OPEN
  }

  get analogMessages$(): Observable<AnalogMessage> {
    return this.analogMessages.asObservable()
  }

  get digitalMessages$(): Observable<DigitalMessage> {
    return this.digitalMessages.asObservable()
  }

  get stringMessages$(): Observable<StringMessage> {
    return this.stringMessages.asObservable()
  }

  get messages$(): Observable<string> {
    return this.messages.asObservable()
  }

  get updates$(): Observable<DeviceConfigMessage[]> {
    return this.updates.asObservable()
  }

  get deviceConfig$(): Observable<DeviceConfigMessage | null> {
    return this.deviceConfig.asObservable()
  }

  get availableViews$(): Observable<RoomMessage[]> {
    return this.availableViews.asObservable()
  }

  get availableDevices$(): Observable<DeviceMessage[]> {
    return this.availableDevices.asObservable()
  }

  get close$(): Observable<CloseEvent> {
    return this.onClose.asObservable()
  }
  
  get users$(): Observable<UserMessage[]> {
    return this.users.asObservable()
  }
}
