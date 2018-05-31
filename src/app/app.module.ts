import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ThingListComponent } from './thing-list/thing-list.component';

import { ThingsService } from './services/things.service';

@NgModule({
  declarations: [
    AppComponent,
    ThingListComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [
    ThingsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
