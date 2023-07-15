import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ScrollPageComponent } from './components/scroll-page/scroll-page.component';
import { SwitchVisibilityPageComponent } from './components/switch-visibility-page/switch-visibility-page.component';
import { DatasetsEditorPageComponent } from './components/datasets-editor-page/datasets-editor-page.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from './components/modal/modal.module';

@NgModule({
  declarations: [
    AppComponent,
    ScrollPageComponent,
    SwitchVisibilityPageComponent,
    DatasetsEditorPageComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, ReactiveFormsModule, ModalModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
