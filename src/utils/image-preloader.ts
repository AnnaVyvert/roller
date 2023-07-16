export function preloadImage(urls: string | string[]): void {
  for (let url of arguments[0]) {
    let img = new Image();
    img.src = url;
  }
}
