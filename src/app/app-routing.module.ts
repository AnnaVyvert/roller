import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ScrollPageComponent } from './components/scroll-page/scroll-page.component';
import { SwitchVisibilityPageComponent } from './components/switch-visibility-page/switch-visibility-page.component';

const routes: Routes = [
  {
    path: '',
    component: ScrollPageComponent,
  },
  {
    path: 'switch-visibility',
    component: SwitchVisibilityPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
