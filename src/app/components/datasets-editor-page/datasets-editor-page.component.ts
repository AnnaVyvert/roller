import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { JsonScheme } from 'src/interfaces/jsonScheme';
import { ModalComponent } from '../modal/modal.component';
import { getValueFromStore, setValue2Store } from 'src/utils/json-worker';

@Component({
  selector: 'app-datasets-editor-page',
  templateUrl: './datasets-editor-page.component.html',
  styleUrls: ['./datasets-editor-page.component.scss'],
})
export class DatasetsEditorPageComponent {
  @ViewChild('fieldSubmit') fieldSubmitBtn!: ElementRef<HTMLButtonElement>;

  modalRef: MdbModalRef<ModalComponent> | null = null;

  constructor(private modalService: MdbModalService) {}

  localStoreName = 'json';

  jsonScheme = {
    types: {
      id: 'number',
      name: 'string',
      pic_url: 'string',
    },
    show: ['name', 'pic_url'],
  };

  addFieldForm = new FormGroup({});

  store: JsonScheme[][] = [];
  jsonStore: JsonScheme[] = [];

  jsonStoreSelected: number = parseInt(
    getValueFromStore('selected-json') ?? '0'
  );
  storeStr: string = '';
  jsonStoreStr: string = '';

  addField() {
    this.jsonStore.push({
      ...(this.addFieldForm.value as { name: string; pic_url: string }),
      id: Math.random(),
    });

    this.addFieldForm.reset();

    this.updateJsonStore();
    this.saveStore();
  }

  removeField(id: number) {
    this.modalRef = this.modalService.open(ModalComponent, {
      data: {
        title: 'Подтвердите удаление поля:',
        description: 'отменить это действие будет нельзя',
        approveTemplate: true,
      },
      modalClass: 'modal-dialog-centered',
    });

    this.modalRef.onClose.subscribe((status: number) => {
      if (status) {
        this.jsonStore = this.jsonStore.filter(
          (el: JsonScheme) => el.id !== id
        );
        this.store[this.jsonStoreSelected] = this.jsonStore;
        this.jsonStoreStr = JSON.stringify(this.jsonStore, undefined, 2);
        this.saveStore();
      }
    });
  }

  addJsonStore() {
    this.store.push([]);

    this.jsonStoreSelected = this.jsonStoreSelected + 1;

    this.updateJsonStore();
    this.saveStore();
  }

  selectJsonStore(id: number) {
    this.jsonStoreSelected = id;

    this.updateJsonStore();
  }

  updateJsonStore() {
    this.jsonStore = this.store[this.jsonStoreSelected];
    setValue2Store('selected-json', this.jsonStoreSelected.toString());
    this.jsonStoreStr = JSON.stringify(this.jsonStore, undefined, 2);
  }

  removeJsonStore(id: number) {
    this.modalRef = this.modalService.open(ModalComponent, {
      data: {
        title: 'Подтвердите удаление датасета:',
        description: 'отменить это действие будет нельзя',
        approveTemplate: true,
      },
      modalClass: 'modal-dialog-centered',
    });

    this.modalRef.onClose.subscribe((status: number) => {
      if (status) {
        this.store = this.store.filter((el: JsonScheme[], i) => i !== id);
        this.jsonStoreSelected = 0;
        this.updateJsonStore();
        this.saveStore();
      }
    });
  }

  handleFileInput(ev: Event) {
    const target = ev.target as HTMLInputElement;
    const file = target!.files![0];
    const reader = new FileReader();

    reader.onload = (ev: ProgressEvent<FileReader>) => {
      const fileContent = ev.target?.result;
      this.jsonStore = JSON.parse(fileContent as string);
      this.store[this.jsonStoreSelected] = this.jsonStore;

      this.saveStore();
    };

    reader.readAsText(file);
  }

  exportJson() {
    const jsonString = JSON.stringify(this.jsonStore, undefined, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'roller.json';
    link.click();
    window.URL.revokeObjectURL(url);
    link.remove();
  }

  loadStore(): [] {
    return JSON.parse(window.localStorage.getItem(this.localStoreName) ?? '[]');
  }

  saveStore(): void {
    this.storeStr = JSON.stringify(this.store, undefined, 2);

    window.localStorage.setItem(this.localStoreName, this.storeStr);
  }

  isFormInvalid() {
    const values = this.addFieldForm.value;
    
    //@ts-ignore
    return !values['name'] || !values['pic_url'];
  }

  ngOnInit(): void {
    this.store = this.loadStore();
    this.jsonStore = this.store[this.jsonStoreSelected];
    this.jsonStoreStr = JSON.stringify(this.jsonStore, undefined, 2);
    Object.keys(this.jsonScheme.types).forEach((el) => {
      this.addFieldForm.addControl(el, new FormControl(null));
    });

    this.saveStore();
  }

  ngAfterViewInit(): void {
    window.addEventListener('keypress', (e) => {
      if (e.code === 'Enter') this.fieldSubmitBtn.nativeElement.click();
    });
  }

  openManual() {
    this.modalRef = this.modalService.open(ModalComponent, {
      data: {
        title: 'User Guide',
        description: `<h4 class="code-line" data-line-start="0" data-line-end="1"><a id="__0"></a>таблица детасетов:</h4>
        <p class="has-line-data" data-line-start="1" data-line-end="5">
          позволяет переключаться между вашими датасетами<br />
          выбранный датасет (<i class="fa-solid fa-check"></i>)<br />
          возможный для выбора датасет (<i class="fa-solid fa-edit"></i>)<br />
          нижняя кнопка (<i class="fa-solid fa-plus"></i>) создаёт новый датасет
        </p>
        <h4 class="code-line" data-line-start="5" data-line-end="6"><a id="___5"></a>таблица полей датасета:</h4>
        <p class="has-line-data" data-line-start="6" data-line-end="10">
          позволяет удалять поле датасета<br />
          нижняя форма позволяет добавлять новое поле<br />
          если форма невалидна (<i class="fa-solid fa-ban"></i>), это означает, что<br />
          одно из полей ввода пустое, иначе (<i class="fa-solid fa-plus"></i>)
        </p>
        <h4 class="code-line" data-line-start="10" data-line-end="11"><a id="___10"></a>превьювер полей датасета:</h4>
        <p class="has-line-data" data-line-start="11" data-line-end="13">
          отображает датасет в формате <strong>.json</strong><br />
          превью содержимого файла при <strong>экспорте</strong>
        </p>
        <h4 class="code-line" data-line-start="13" data-line-end="14"><a id="___13"></a>импорт и экспорт:</h4>
        <h5 class="code-line" data-line-start="14" data-line-end="15"><a id="middot_14"></a>·импорт:</h5>
        <p class="has-line-data" data-line-start="15" data-line-end="17">
          загрузка файла <strong>.json</strong>,<br />
          заменяющего <strong>текущий датасет</strong>
        </p>
        <h5 class="code-line" data-line-start="17" data-line-end="18"><a id="middot_17"></a>·экспорт:</h5>
        <p class="has-line-data" data-line-start="18" data-line-end="20">
          скачать файл <strong>.json</strong>,<br />
          взятый с текущего датасета
        </p>
        `,
        approveTemplate: false,
        hasCloseBtn: true,
      },
      modalClass: 'modal-dialog-centered',
    });
  }
}
