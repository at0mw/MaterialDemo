import {Component, ViewChild} from '@angular/core';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {Observable, Subscription} from 'rxjs';
import {map, shareReplay} from 'rxjs/operators';
import {ViewMessage} from "../../models/interfaces/view.message.interface";
import {WebsocketService} from "../ServerComs/Websocket Service/websocket.service";
import {ProtocolService} from "../ServerComs/Protocol/protocol.service";
import {NavigationMessage} from "../../models/interfaces/navigation.message.interface";
import {MessageType} from "../Enums/MessageType";
import {ModuleMessage} from "../../models/interfaces/module.message.interface";
import {ModuleConfigMessage} from "../../models/interfaces/module.config.interface";
import {RoomNavigationComponent} from "../room-navigation/room-navigation.component";
import {UserTokenMessage} from "../../models/interfaces/user.token.message.interface";
import {QueryMessage} from "../../models/interfaces/query.message.interface";
import {QueryType} from "../Enums/QueryType";
import {ModulesViewComponent} from "../modules-view/modules-view.component";

@Component({
  selector: 'app-app-nav',
  templateUrl: './app-nav.component.html',
  styleUrls: ['./app-nav.component.scss']
})
export class AppNavComponent {
  @ViewChild('roomNav') roomNav! : RoomNavigationComponent;

  @ViewChild(ModulesViewComponent) modulesViewComponent!: ModulesViewComponent;
  showLoginForm: boolean = false;
  isHome: boolean = true;
  currentViewLabel: string = "Home"
  availableViews: ViewMessage[] = []
  availableModules: ModuleMessage[] = []
  tileModuleConfigMessages: ModuleConfigMessage[] = []
  // This will be a list of UserObjects but not yet
  loggedInUsers: UserTokenMessage[] = []
  loggedInUsersMessageSubscription: Subscription
  availableViewsMessagesSubscription: Subscription
  tileModulesConfigMessageSubscription: Subscription
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

    this.availableModulesMessageSubscription = this.websocketService.availableModules$.subscribe(modules => {
      this.availableModules = modules
    })

    this.tileModulesConfigMessageSubscription = this.websocketService.gridModuleConfigMessages$.subscribe(moduleConfigs => {
      this.tileModuleConfigMessages = moduleConfigs
    })

    this.loggedInUsersMessageSubscription = this.websocketService.users$.subscribe(users => {
      this.loggedInUsers = users
    })

    this.analogSubscription = this.websocketService.analogMessages$.subscribe(analogMessage => {
      this.modulesViewComponent.relayAnalog(analogMessage);
    });

    this.digitalSubscription = this.websocketService.digitalMessages$.subscribe(digitalMessage => {
      this.modulesViewComponent.relayDigital(digitalMessage);
    });

    this.stringSubscription = this.websocketService.stringMessages$.subscribe(stringMessage => {
      this.modulesViewComponent.relayString(stringMessage);
    });

    this.wsCloseSubscription = this.websocketService.close$.subscribe((event: CloseEvent) => {
      this.availableViews = []
      this.tileModuleConfigMessages = []
    })
  }
  navigateToView(viewId: string, viewLabel: string): void {
    // Navigate to the selected view using your preferred routing mechanism?
    this.currentViewLabel = viewLabel
    this.sendNavigateCommand(viewId)
    this.requestPossibleTileModules()
  }

  sendNavigateCommand(viewId: string) {
    this.isHome = false;
    let navigationMessage: NavigationMessage = {
      ViewId: viewId,
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

  selectUser(Username: string, Token: string) {
    console.log("Selecting User... Login Page?")
    let switchUser: UserTokenMessage = {
      Username: Username,
      Token: Token,
      MessageType: MessageType.UserToken
    }
    this.protoService.send(switchUser)
  }

  signIn() {
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
