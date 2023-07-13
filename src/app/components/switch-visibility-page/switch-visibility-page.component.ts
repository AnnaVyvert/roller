import { Component } from '@angular/core';
import { JsonScheme } from 'src/interfaces/jsonScheme';
import { getValueFromStore, loadStore } from 'src/utils/json-worker';

@Component({
  selector: 'app-switch-visibility-page',
  templateUrl: './switch-visibility-page.component.html',
  styleUrls: ['./switch-visibility-page.component.scss'],
})
export class SwitchVisibilityPageComponent {
  store: JsonScheme[][] = loadStore('json');
  selectedJson: string | null = getValueFromStore('selected-json');
  jsonStore: JsonScheme[] | undefined;

  ngOnInit(): void {
    
    if (this.selectedJson) {
      this.jsonStore = this.store[parseInt(this.selectedJson) ?? 0];
    }
    console.log(this.jsonStore);
  }
}
