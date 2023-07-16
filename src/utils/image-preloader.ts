export function preloadImage(urls: string[]): void {
  for (let url of urls) {
    let img = new Image();
    img.src = url;
  }
}
