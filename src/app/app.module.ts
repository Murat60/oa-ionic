import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { CompanyRepositoryProvider } from '../providers/company-repository/company-repository';
import {HttpModule} from "@angular/http";
import {MapPage} from "../pages/map/map";
import {GeneralSearchBarComponent} from "../components/search-bar/search-bar";
import {SafePipe} from "../pipe/safe.pipe";
import {CompanyMoreInformationsPage} from "../pages/company-more-informations/company-more-informations";
import {FiltersComponent} from "../components/filters/filters";

@NgModule({
  declarations: [
    MyApp,
    MapPage,
    ContactPage,
    HomePage,
    TabsPage,
    GeneralSearchBarComponent,
    SafePipe,
    CompanyMoreInformationsPage,
    FiltersComponent,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    MapPage,
    ContactPage,
    HomePage,
    TabsPage,
    CompanyMoreInformationsPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    CompanyRepositoryProvider,
  ]
})
export class AppModule {}
