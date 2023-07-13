import { Component } from '@angular/core';
import { JsonScheme } from 'src/interfaces/jsonScheme';
import {
  getValueFromStore,
  loadStore,
  setValue2Store,
} from 'src/utils/json-worker';

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

  ngOnInit(): void {}

  toggleKey(id: number) {
    this.checkboxStoreArray.includes(id)
      ? this.checkboxStoreArray.splice(this.checkboxStoreArray.indexOf(id), 1)
      : this.checkboxStoreArray?.push(id);

    this.checkboxStore[this.selectedIndex] = this.checkboxStoreArray;
    setValue2Store('checkbox-store', JSON.stringify(this.checkboxStore));
  }
}
