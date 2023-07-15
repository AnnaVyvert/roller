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
        title: 'User Guide',
        description: `<h4 class="code-line" data-line-start="0" data-line-end="1">тогглы (переключатели):</h4>
        <p class="has-line-data" data-line-start="1" data-line-end="2">переключают статус видимости карточки в ленте карточек</p>
        <h4 class="code-line" data-line-start="2" data-line-end="3"><a id="_2"></a>кнопки:</h4>
        <h5 class="code-line" data-line-start="3" data-line-end="4"><a id="__3"></a>&middot; выбрать всё:</h5>
        <p class="has-line-data" data-line-start="4" data-line-end="5">переключают все тогглы во включенное состояние</p>
        <h5 class="code-line" data-line-start="5" data-line-end="6"><a id="__5"></a>&middot; скрыть всё:</h5>
        <p class="has-line-data" data-line-start="6" data-line-end="7">переключают все тогглы в выключенное состояние</p>
        `,
        approveTemplate: false,
        hasCloseBtn: true,
      },
      modalClass: 'modal-dialog-centered',
    });
  }
}
