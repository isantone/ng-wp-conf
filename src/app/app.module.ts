import { BrowserModule } from '@angular/platform-browser';

import { NgModule } from '@angular/core';

import angular from 'angular';
import { appModule } from '../js/app.module';
import { UpgradeModule, downgradeComponent } from '@angular/upgrade/static';
import { setAngularLib } from '@angular/upgrade/static';

import { AppComponent } from './app.component';
import { HeaderComponent } from './common/header/header.component';


setAngularLib(angular);

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
  ],

  imports: [
    BrowserModule,
    UpgradeModule,
  ],

  entryComponents: [
    AppComponent,
  ],
})

export class AppModule {
  constructor(private upgrade: UpgradeModule) { }

  ngDoBootstrap() {
    this.upgrade.bootstrap(document.body, ['app'], { strictDi: true });
  }
}

appModule
  .directive('wpcApp', downgradeComponent({ component: AppComponent }));
