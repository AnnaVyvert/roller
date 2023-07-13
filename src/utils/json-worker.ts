import { JsonScheme } from 'src/interfaces/jsonScheme';

export function loadStore(localStoreName: string): JsonScheme[][] {
  return JSON.parse(window.localStorage.getItem(localStoreName) ?? '[]');
}

export function getValueFromStore(localStoreName: string): string | null {
  return window.localStorage.getItem(localStoreName);
}

export function setValue2Store(localStoreName: string, value: string): void {
  window.localStorage.setItem(localStoreName, value);
}
