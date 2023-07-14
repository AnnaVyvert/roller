import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { JsonScheme } from 'src/interfaces/jsonScheme';

@Component({
  selector: 'app-datasets-editor-page',
  templateUrl: './datasets-editor-page.component.html',
  styleUrls: ['./datasets-editor-page.component.scss'],
})
export class DatasetsEditorPageComponent {
  @ViewChild('fieldSubmit') fieldSubmitBtn!: ElementRef<HTMLButtonElement>;
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

  jsonStoreSelected: number = 0;
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
    this.jsonStore = this.jsonStore.filter((el: JsonScheme) => el.id !== id);

    this.store[this.jsonStoreSelected] = this.jsonStore;

    this.jsonStoreStr = JSON.stringify(this.jsonStore, undefined, 2);

    this.saveStore();
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
    this.jsonStoreStr = JSON.stringify(this.jsonStore, undefined, 2);
  }

  removeJsonStore(id: number) {
    this.store = this.store.filter((el: JsonScheme[], i) => i !== id);

    this.jsonStoreSelected = 0;
    this.updateJsonStore();

    this.saveStore();
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

  ngOnInit(): void {
    this.store = this.loadStore();
    this.jsonStore = this.store[0];
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
}
