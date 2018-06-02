import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule, INIT } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { AppComponent } from './app.component';
import { ThingSectionComponent } from './thing-section/thing-section.component';
import { ThingListComponent } from './thing-list/thing-list.component';

import { ThingsService } from './services/things.service';

import { INITIAL_APPLICATION_STATE, ApplicationState } from './store/application-state';
import { FetchThingsEffectService } from './store/effects/fetch-things-effect.service';
import { RateThingEffectService } from './store/effects/rate-thing-effect.service';
import { reducer } from './store/reducer';

export function reducerFactory() {
  return reducer;
}

@NgModule({
  declarations: [
    AppComponent,
    ThingSectionComponent,
    ThingListComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    StoreModule.forRoot(null, {reducerFactory, initialState: INITIAL_APPLICATION_STATE}),
    EffectsModule.forRoot([
      FetchThingsEffectService,
      RateThingEffectService
    ])
  ],
  providers: [
    ThingsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
