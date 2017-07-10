import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { AppRoutingModule } from './app-routing.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { AppReducers, developmentReducerFactory } from './ngrx/index';
import { TalksEffects } from './talks/nrgx/talks.effects';
import { TalksModule } from './talks/talks.module';
import { environment } from '../environments/environment';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

let DEV_TOOLS: any[] = [];
let reducersConfiguration = undefined;
if (!environment.production) {
  DEV_TOOLS = [
    StoreDevtoolsModule.instrument({ maxAge: 50 }),
  ];
  reducersConfiguration = {
    reducerFactory: developmentReducerFactory
  };
}

@NgModule({
  declarations: [ AppComponent ],
  imports     : [
    BrowserModule,

    StoreModule.forRoot(AppReducers, reducersConfiguration),
    EffectsModule.forRoot([ TalksEffects ]),
    StoreRouterConnectingModule,

    SharedModule,

    TalksModule,

    // Developer tools (configured only in development mode).
    DEV_TOOLS,

    // AppRoutingModule should be the last because of `**` route wildcard.
    AppRoutingModule
  ],
  providers   : [
    { provide: 'ApiUrl', useValue: 'http://localhost:4444' }
  ],
  bootstrap   : [ AppComponent ]
})
export class AppModule {
}
