import { Component } from '@angular/core';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent {
  title: string | null = null;
  description: string | null = null;
  approveTemplate: boolean = false;
  hasCloseBtn: boolean = false;

  constructor(public modalRef: MdbModalRef<ModalComponent>) {}

  close(closeStatus: number): void {
    this.modalRef.close(closeStatus)
  }
}
