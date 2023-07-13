import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ScrollPageComponent } from './components/scroll-page/scroll-page.component';
import { SwitchVisibilityPageComponent } from './components/switch-visibility-page/switch-visibility-page.component';

@NgModule({
  declarations: [
    AppComponent,
    ScrollPageComponent,
    SwitchVisibilityPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
