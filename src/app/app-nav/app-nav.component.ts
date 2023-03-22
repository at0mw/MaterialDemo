import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import {Observable, Subscription} from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import {ViewMessage} from "../../models/interfaces/view.message.interface";
import {WebsocketService} from "../ServerComs/Websocket Service/websocket.service";
import {ProtocolService} from "../ServerComs/Protocol/protocol.service";
import {NavigationMessage} from "../../models/interfaces/navigation.message.interface";
import {MessageType} from "../Enums/MessageType";
import {ModuleMessage} from "../../models/interfaces/module.message.interface";
import {ModuleConfigMessage} from "../../models/interfaces/module.config.interface";

@Component({
  selector: 'app-app-nav',
  templateUrl: './app-nav.component.html',
  styleUrls: ['./app-nav.component.scss']
})
export class AppNavComponent {
  isHome: boolean = true;
  currentViewLabel: string = "Home"
  availableViews: ViewMessage[] = []
  availableModules: ModuleMessage[] = []
  moduleConfigMessages: ModuleConfigMessage[] = []
  // This will be a list of UserObjects but not yet
  availableUsers: string[] = []
  availableViewsMessagesSubscription: Subscription
  moduleConfigsMessageSubscription: Subscription
  availableModulesMessageSubscription: Subscription
  wsCloseSubscription: Subscription
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
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

    this.moduleConfigsMessageSubscription = this.websocketService.gridModuleConfigMessages$.subscribe(moduleConfigs => {
      this.moduleConfigMessages = moduleConfigs
    })


    this.wsCloseSubscription = this.websocketService.close$.subscribe((event: CloseEvent) => {
      this.availableViews = []
      this.moduleConfigMessages = []
    })
  }
  navigateToView(viewId: string, viewLabel: string): void {
    // Navigate to the selected view using your preferred routing mechanism
    this.currentViewLabel = viewLabel
    this.sendNavigateCommand(viewId)
  }

  sendNavigateCommand(viewId: string) {
    this.isHome = false;
    let navigationMessage: NavigationMessage = {
      ViewId: viewId,
      MessageType: MessageType.Navigation
    }
    this.protoService.send(navigationMessage)
  }

  ngOnDestroy() {
    this.availableViewsMessagesSubscription.unsubscribe()
    this.wsCloseSubscription.unsubscribe()
  }

  selectUser(Id: string, Label: string) {
    console.log("Selecting User... Login Page?")

  }

  signIn() {
    console.log("Signing In... Login Page?")
  }

  signOut() {
    console.log("Signing Out... Current User?")
  }

  navigateToHome() {
    console.log("Trigger Home Page...")
    this.isHome = true;
  }
}
