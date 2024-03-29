import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppNavComponent } from './app-nav/app-nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';

import { MatGridListModule } from '@angular/material/grid-list';
import { MatMenuModule } from "@angular/material/menu";
import { MatBottomSheetModule } from "@angular/material/bottom-sheet";
import { DevicesViewComponent } from './devices-view/devices-view.component';
import { HomeViewComponent } from './home-view/home-view.component';
import { LoginComponent } from './login/login.component';
import { MatCardModule } from "@angular/material/card";
import { MatInputModule } from "@angular/material/input";
import { RoomNavigationComponent } from './room-navigation/room-navigation.component';
import { FormsModule } from "@angular/forms";
import { DynamicTileGridManagerComponent } from './dynamic-tile-grid-manager/dynamic-tile-grid-manager.component';
import { ButtonPanelComponent } from './Modules/button-panel/button-panel.component';
import { SourceSelectComponent } from './Modules/source-select/source-select.component';
import { ThermostatComponent } from './Modules/thermostat/thermostat.component';
import { KeypadComponent } from './Modules/keypad/keypad.component';
import { DynamicModuleComponent } from './Modules/dynamic-module/dynamic-module.component';

@NgModule({
  declarations: [
    AppComponent,
    AppNavComponent,
    DevicesViewComponent,
    HomeViewComponent,
    LoginComponent,
    RoomNavigationComponent,
    DynamicTileGridManagerComponent,
    ButtonPanelComponent,
    SourceSelectComponent,
    ThermostatComponent,
    KeypadComponent,
    DynamicModuleComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatGridListModule,
    MatMenuModule,
    MatBottomSheetModule,
    MatCardModule,
    MatInputModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
