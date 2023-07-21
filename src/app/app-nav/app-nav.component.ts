import {Component, ViewChild} from '@angular/core';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {Observable, Subscription} from 'rxjs';
import {map, shareReplay} from 'rxjs/operators';
import {RoomMessage} from "../../models/interfaces/room.message.interface";
import {WebsocketService} from "../ServerComs/Websocket Service/websocket.service";
import {ProtocolService} from "../ServerComs/Protocol/protocol.service";
import {NavigationMessage} from "../../models/interfaces/navigation.message.interface";
import {MessageType} from "../Enums/MessageType";
import {DeviceMessage} from "../../models/interfaces/device.message.interface";
import {DeviceConfigMessage} from "../../models/interfaces/device.config.interface";
import {RoomNavigationComponent} from "../room-navigation/room-navigation.component";
import {UserMessage} from "../../models/interfaces/user.message.interface";
import {QueryMessage} from "../../models/interfaces/query.message.interface";
import {QueryType} from "../Enums/QueryType";
import {DevicesViewComponent} from "../devices-view/devices-view.component";
import { NavigationType } from '../Enums/NavigationType';

@Component({
  selector: 'app-app-nav',
  templateUrl: './app-nav.component.html',
  styleUrls: ['./app-nav.component.scss']
})
export class AppNavComponent {
  @ViewChild('roomNav') roomNav! : RoomNavigationComponent;

  @ViewChild(DevicesViewComponent) devicesViewComponent!: DevicesViewComponent;
  showLoginForm: boolean = false;
  isHome: boolean = true;
  currentViewLabel: string = "Home"
  availableViews: RoomMessage[] = []
  availableDevices: DeviceMessage[] = []
  deviceConfigMessage?: DeviceConfigMessage | null
  // This will be a list of UserObjects but not yet
  loggedInUsers: UserMessage[] = []
  loggedInUsersMessageSubscription: Subscription
  availableViewsMessagesSubscription: Subscription
  deviceConfigMessageSubscription: Subscription
  availableModulesMessageSubscription: Subscription
  wsCloseSubscription: Subscription
  analogSubscription: Subscription;
  digitalSubscription: Subscription;
  stringSubscription: Subscription;
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Medium)
    .pipe(
      map(result => result.matches),
      shareReplay()
    )

  constructor(private breakpointObserver: BreakpointObserver, private websocketService: WebsocketService, private protoService: ProtocolService) {
    this.availableViewsMessagesSubscription = this.websocketService.availableViews$.subscribe(views => {
      this.availableViews = views
    })

    this.availableModulesMessageSubscription = this.websocketService.availableDevices$.subscribe(devices => {
      this.availableDevices = devices
    })

    this.deviceConfigMessageSubscription = this.websocketService.deviceConfig$.subscribe(deviceConfig => {
      this.deviceConfigMessage = deviceConfig
    })

    this.loggedInUsersMessageSubscription = this.websocketService.users$.subscribe(users => {
      this.loggedInUsers = users
    })

    this.analogSubscription = this.websocketService.analogMessages$.subscribe(analogMessage => {
      this.devicesViewComponent.relayAnalog(analogMessage);
    });

    this.digitalSubscription = this.websocketService.digitalMessages$.subscribe(digitalMessage => {
      this.devicesViewComponent.relayDigital(digitalMessage);
    });

    this.stringSubscription = this.websocketService.stringMessages$.subscribe(stringMessage => {
      this.devicesViewComponent.relayString(stringMessage);
    });

    this.wsCloseSubscription = this.websocketService.close$.subscribe((event: CloseEvent) => {
      this.availableViews = []
      this.deviceConfigMessage = null
    })
  }
  navigateToView(viewId: number, viewLabel: string): void {
    // Navigate to the selected view using your preferred routing mechanism?
    this.currentViewLabel = viewLabel
    this.sendNavigateCommand(viewId)
    //this.requestPossibleTileModules()
  }

  sendNavigateCommand(viewId: number) {
    this.isHome = false;
    let navigationMessage: NavigationMessage = {
      RoomId: viewId,
      NavigationType: NavigationType.SpecificLocation,
      MessageType: MessageType.Navigation
    }
    this.protoService.send(navigationMessage)
  }

  private requestPossibleTileModules() {
    let queryMessage: QueryMessage = {
      QueryType: QueryType.TileModulesConfigQuery,
      MessageType: MessageType.Query
    }
    this.protoService.send(queryMessage)
  }

  ngOnDestroy() {
    this.availableViewsMessagesSubscription.unsubscribe()
    this.wsCloseSubscription.unsubscribe()
  }

  signIn(username: string, password: string) {
    //console.log("Signing In... Login Page?")
  }

  triggerDrawer() {
    //console.log("triggerDrawer")
    this.roomNav.triggerDrawer();
  }

  signOut() {
    //console.log("Signing Out... Current User?")
  }

  navigateToHome() {
    //console.log("Trigger Home Page...")
    this.isHome = true;
  }

  onLoginPressed() {
    this.showLoginForm = false;
  }
}
