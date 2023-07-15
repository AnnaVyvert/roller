import { Component } from '@angular/core';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { JsonScheme } from 'src/interfaces/jsonScheme';
import {
  getValueFromStore,
  loadStore,
  setValue2Store,
} from 'src/utils/json-worker';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-switch-visibility-page',
  templateUrl: './switch-visibility-page.component.html',
  styleUrls: ['./switch-visibility-page.component.scss'],
})
export class SwitchVisibilityPageComponent {
  store: JsonScheme[][] = loadStore('json');
  selectedJson: string = getValueFromStore('selected-json') ?? '0';
  selectedIndex: number = parseInt(this.selectedJson);
  jsonStore: JsonScheme[] = this.store[this.selectedIndex];
  checkboxStore: number[][] = JSON.parse(
    getValueFromStore('checkbox-store') ?? '[[]]'
  );
  checkboxStoreArray: number[] = this.checkboxStore[this.selectedIndex] ?? [];

  constructor(private modalService: MdbModalService) {}
  modalRef: MdbModalRef<ModalComponent> | null = null;

  ngOnInit(): void {}

  toggleKey(id: number) {
    this.checkboxStoreArray.includes(id)
      ? this.checkboxStoreArray.splice(this.checkboxStoreArray.indexOf(id), 1)
      : this.checkboxStoreArray?.push(id);

    this.checkboxStore[this.selectedIndex] = this.checkboxStoreArray;
    setValue2Store('checkbox-store', JSON.stringify(this.checkboxStore));
  }

  openManual() {
    this.modalRef = this.modalService.open(ModalComponent, {
      data: {
        title: '!ГАЙД!',
        description: `description`,
        approveTemplate: false,
      },
      modalClass: 'modal-dialog-centered',
    });
  }
}
