import {Injectable} from "@angular/core"
import {environment} from "../../Environments/environments"
import {Observable, Subject, tap} from "rxjs"
import {ModuleConfigMessage} from 'src/models/interfaces/module.config.interface'
import {AnalogMessage} from "../../../models/interfaces/analog.message.interface"
import {DigitalMessage} from "../../../models/interfaces/digital.message.interface"
import {StringMessage} from "../../../models/interfaces/string.message.interface"
import {AvailableViewMessage} from "../../../models/interfaces/available.view.message.interface"
import {ViewMessage} from "../../../models/interfaces/view.message.interface"
import {GridModuleConfigsMessage} from "../../../models/interfaces/grid.module.configs.message.interface"
import {QueryMessage} from "../../../models/interfaces/query.message.interface"
import {MessageType} from "../../Enums/MessageType"
import {UserTokenMessage} from "../../../models/interfaces/user.token.message.interface"
import {AvailableModulesMessage} from "../../../models/interfaces/available.modules.message.interface"
import {ModuleMessage} from "../../../models/interfaces/module.message.interface"
import {QueryType} from "../../Enums/QueryType";
import {ClientUsersMessage} from "../../../models/interfaces/client.users.message.interface";

@Injectable({
  providedIn: 'root'
})

export class WebsocketService {
  private ws!: WebSocket
  private messages: Subject<string> = new Subject<string>()

  private analogMessages: Subject<AnalogMessage> = new Subject<AnalogMessage>()
  private digitalMessages: Subject<DigitalMessage> = new Subject<DigitalMessage>()
  private stringMessages: Subject<StringMessage> = new Subject<StringMessage>()
  private moduleConfig: Subject<ModuleConfigMessage | null> = new Subject<ModuleConfigMessage | null>()
  private moduleConfigs: Subject<ModuleConfigMessage[]> = new Subject<ModuleConfigMessage[]>()
  private updates: Subject<ModuleConfigMessage[]> = new Subject<ModuleConfigMessage[]>()
  private availableModules: Subject<ModuleMessage[]> = new Subject<ModuleMessage[]>()
  private availableViews: Subject<ViewMessage[]> = new Subject<ViewMessage[]>()
  private onClose: Subject<CloseEvent> = new Subject<CloseEvent>()

  private users: Subject<UserTokenMessage[]> = new Subject<UserTokenMessage[]>()
  private usersSave: UserTokenMessage[] = []
  constructor() {
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
    //console.log('Received message:', message)
    const messageObject = JSON.parse(message)
    const messageType = messageObject.MessageType

    switch (messageType) {
      case MessageType.AvailableModules:
        this.handleAvailableModulesMessage(messageObject as AvailableModulesMessage)
        break
      case MessageType.AvailableViews:
        this.handleAvailableViewMessage(messageObject as AvailableViewMessage)
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
      case MessageType.ClientUsers:
        this.handleClientUsersMessage(messageObject as ClientUsersMessage)
        break
      case MessageType.UserToken:
        this.handleAuthTokenMessage(messageObject as UserTokenMessage)
        break
      case MessageType.ModuleConfig:
        this.handleModuleConfigMessage(messageObject as ModuleConfigMessage)
        break
      case MessageType.TileModulesConfigMessage:
        this.handleTileModulesConfigMessage(messageObject as GridModuleConfigsMessage)
        break
      default:
        console.log("Invalid Type")
        break
    }
  }

  handleModuleConfigMessage(message: ModuleConfigMessage) {
    this.moduleConfig.next(message)
  }

  private handleTileModulesConfigMessage(message: GridModuleConfigsMessage) {
    console.log("Tile Modules Config Received...")
    this.moduleConfigs.next(message.TileModules)
  }

  private handleClientUsersMessage(message: ClientUsersMessage) {
    this.users.next(message.LoggedInUsers)
    this.usersSave = message.LoggedInUsers
  }

  handleAvailableViewMessage(message: AvailableViewMessage) {
    this.moduleConfig.next(null)
    this.availableViews.next(message.AvailableViews)
  }

  handleAvailableModulesMessage(message: AvailableModulesMessage) {
    this.availableModules.next(message.Modules)
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

  private handleAuthTokenMessage(message: UserTokenMessage) {
    //console.log("Auth Message Received: Token: " + message.Token + " User: " + message);
    this.usersSave.push(message)
    this.users.next(this.usersSave)
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

  get updates$(): Observable<ModuleConfigMessage[]> {
    return this.updates.asObservable()
  }

  get users$(): Observable<UserTokenMessage[]> {
    return this.users.asObservable()
  }

  get moduleConfig$(): Observable<ModuleConfigMessage | null> {
    return this.moduleConfig.asObservable()
  }

  get tileModuleConfig$(): Observable<ModuleConfigMessage[]> {
    return this.moduleConfigs.asObservable()
  }

  get availableViews$(): Observable<ViewMessage[]> {
    return this.availableViews.asObservable()
  }

  get availableModules$(): Observable<ModuleMessage[]> {
    return this.availableModules.asObservable()
  }

  get close$(): Observable<CloseEvent> {
    return this.onClose.asObservable()
  }

  get gridModuleConfigMessages$(): Observable<ModuleConfigMessage[]> {
    return this.moduleConfigs.asObservable()
  }

  // retryOpen(username: string, password: string) {
  //   //console.log('Trying to connect with Username: '+ username + ', Password: ' + password)
  //   if (!this.isConnected) {
  //     this.AddWebSocketEventListeners()
  //   }
  // }

}
