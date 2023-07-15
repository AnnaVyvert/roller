import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalComponent } from './modal.component';
import { MdbModalModule } from 'mdb-angular-ui-kit/modal';

@NgModule({
  imports: [CommonModule, MdbModalModule],
  declarations: [ModalComponent],
  exports: [ModalComponent],
  providers: [],
})
export class ModalModule {}
