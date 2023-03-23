import {Component, Input, ViewChild} from '@angular/core';
import {AvailableViewMessage} from "../../models/interfaces/available.view.message.interface";
import {ViewMessage} from "../../models/interfaces/view.message.interface";
import {Observable} from "rxjs";
import {map, shareReplay} from "rxjs/operators";
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MatSidenav} from "@angular/material/sidenav";

@Component({
  selector: 'app-room-navigation',
  templateUrl: './room-navigation.component.html',
  styleUrls: ['./room-navigation.component.scss']
})
export class RoomNavigationComponent {
  @ViewChild('drawer') drawer!: MatSidenav;
  @Input() availableViews: ViewMessage[] = [];

  constructor(private breakpointObserver: BreakpointObserver) {
  }

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    )

  navigateToHome() {

  }

  triggerDrawer(){
    console.log("Triggering Drawer in Room Nav")
    this.drawer.toggle();
  }

  navigateToView(Id: any, Label: any) {

  }
}
