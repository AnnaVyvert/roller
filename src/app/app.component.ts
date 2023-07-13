import { Component, ElementRef, ViewChild } from '@angular/core';
import { getRandomInt } from 'src/utils/rand';
import { JsonScheme } from 'src/interfaces/jsonScheme';
import { scrollDown, scrollUp } from 'src/utils/scroll';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  @ViewChild('scrollContainer', { static: true }) scrollContainer!: ElementRef;

  scrollElement: HTMLElement | undefined;

  localStoreName: string = 'json';

  cards: JsonScheme[] = this.loadJson()[0];

  displayedCards: JsonScheme[] = [];

  cardTitle: string = this.cards[0].name;

  ngOnInit(): void {
    this.displayedCards = scrollDown(this.cards, this.displayedCards);
  }

  ngAfterViewInit(): void {
    this.scrollElement = this.scrollContainer.nativeElement;
    this.scrollElement!.scrollTop = this.scrollElement!.clientHeight / 2;
  }

  isScroll = false;
  interval: undefined | ReturnType<typeof setInterval>;

  continiusScroll(): void {
    this.isScroll = !this.isScroll;
    if (this.isScroll) {
      this.interval = setInterval(() => {
        this.scrollContainer.nativeElement.scrollTop += 20;
      }, 10);
    } else {
      clearInterval(this.interval);
    }
  }

  randomScroll(): void {
    let scrollPower = getRandomInt(-60, -10);
    const powerLimit = getRandomInt(80, 140);
    const interval = setInterval(() => {
      this.scrollContainer.nativeElement.scrollTop += scrollPower;
      scrollPower++;
      if (scrollPower > powerLimit) {
        clearInterval(interval);
        const interval2 = setInterval(() => {
          this.scrollContainer.nativeElement.scrollTop += scrollPower;
          scrollPower--;
          if (scrollPower < 1) clearInterval(interval2);
          console.log(interval, interval2);
        }, 15);
      }
    }, 15);
  }

  onScroll(): void {
    const isScrolledToTop = this.scrollElement!.scrollTop <= 0 + 500;
    const isScrolledToBottom =
      this.scrollElement!.scrollTop + this.scrollElement!.clientHeight >=
      this.scrollElement!.scrollHeight - 300;

    if (isScrolledToBottom) {
      this.displayedCards = scrollDown(this.cards, this.displayedCards);
    } else if (isScrolledToTop) {
      this.displayedCards = scrollUp(
        this.cards,
        this.displayedCards,
        this.scrollElement!
      );
    }
  }

  loadJson(): JsonScheme[][] {
    return JSON.parse(window.localStorage.getItem(this.localStoreName) ?? '[]');
  }
}
