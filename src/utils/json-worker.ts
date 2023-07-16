import { JsonScheme } from 'src/interfaces/jsonScheme';
import { starter } from 'src/store/starter-datasets';

export function loadStore(localStoreName: string): JsonScheme[][] {
  return JSON.parse(window.localStorage.getItem(localStoreName) ?? '[]');
}

export function getValueFromStore(localStoreName: string): string | null {
  return window.localStorage.getItem(localStoreName);
}

export function setValue2Store(localStoreName: string, value: string): void {
  window.localStorage.setItem(localStoreName, value);
}

export function setIfStarterNeeded(): void {
  if (!getValueFromStore('json-store')?.length) {
    setValue2Store('json-store', JSON.stringify(starter, undefined, 2));
    setValue2Store('selected-json', '0');
  }
}
