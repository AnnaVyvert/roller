import { Component, ElementRef, ViewChild } from '@angular/core';

interface JsonScheme {
  id: number;
  name: string;
  pic_url: string;
}

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
  batchSize = this.cards.length;

  cardTitle: string = this.cards[0].name;

  ngOnInit() {
    this.loadCardsDown();
  }

  ngAfterViewInit() {
    this.scrollElement = this.scrollContainer.nativeElement;
    this.scrollElement!.scrollTop = this.scrollElement!.clientHeight / 2;
  }

  loadCardsUp() {
    const startIndex = this.displayedCards.length % this.cards.length;
    const endIndex = startIndex + this.batchSize;

    if (
      this.displayedCards.length === 0 ||
      this.displayedCards.length < this.cards.length
    ) {

      const newCards = this.cards.slice(startIndex, endIndex);
      this.displayedCards = [...newCards, ...this.displayedCards];
    } else {
      const wrappedCards = this.cards;
      this.displayedCards = [...wrappedCards, ...this.displayedCards];
    }
    this.scrollContainer.nativeElement.scrollTop += this.batchSize * 297;
    console.error(this.displayedCards.length);
  }

  loadCardsDown() {
    if (
      this.displayedCards.length === 0 ||
      this.displayedCards.length < this.cards.length
    ) {
      const newCards = this.cards;
      this.displayedCards = this.displayedCards.concat(newCards);
    } else {
      const wrappedCards = this.cards;
      this.displayedCards = this.displayedCards.concat(wrappedCards);
    }
    console.error(this.displayedCards.length);
  }

  addItems(startIndex: number, endIndex: number, _method: 'push' | 'unshift') {
    this.displayedCards[_method](...this.cards);
  }

  appendItems(startIndex: number, endIndex: number) {
    this.addItems(startIndex, endIndex, 'push');
  }

  prependItems(startIndex: number, endIndex: number) {
    this.addItems(startIndex, endIndex, 'unshift');
  }

  getRandomInt(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max) + 1;
    return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
  }

  isScroll = false;
  interval: undefined | ReturnType<typeof setInterval>;

  continiusScroll() {
    this.isScroll = !this.isScroll;
    if (this.isScroll) {
      this.interval = setInterval(() => {
        this.scrollContainer.nativeElement.scrollTop += 20;
      }, 10);
    } else {
      clearInterval(this.interval);
    }
  }

  randomScroll() {
    let power = this.getRandomInt(-60, -10);
    const powerLimit = this.getRandomInt(80, 140);
    const interval = setInterval(() => {
      this.scrollContainer.nativeElement.scrollTop += power;
      power++;
      if (power > powerLimit) {
        clearInterval(interval);
        const interval2 = setInterval(() => {
          this.scrollContainer.nativeElement.scrollTop += power;
          power--;
          if (power < 1) clearInterval(interval2);
          console.log(interval, interval2);
        }, 15);
      }
    }, 15);
    console.log(interval);
  }

  onScroll() {
    const isScrolledToTop = this.scrollElement!.scrollTop <= 0 + 500;
    const isScrolledToBottom =
      this.scrollElement!.scrollTop + this.scrollElement!.clientHeight >=
      this.scrollElement!.scrollHeight - 300;

    if (isScrolledToBottom) {
      this.loadCardsDown();
      console.log(this.scrollElement!.scrollTop);
    } else if (isScrolledToTop) {
      this.loadCardsUp();
      console.log(this.scrollElement!.scrollTop);
    }

    // console.log(this.scrollElement!.scrollTop);

    const intersectionOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.5, // Adjust threshold value as needed
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry: any) => {
        if (entry.isIntersecting) {
          this.cardTitle =
            entry.target.querySelector('.card-title').textContent;
        }
      });
    }, intersectionOptions);

    const cardsInView = document.querySelectorAll('.card');
    cardsInView.forEach((card) => {
      observer.observe(card);
    });
  }

  loadJson(): JsonScheme[][] {
    return JSON.parse(window.localStorage.getItem(this.localStoreName) ?? '[]');
  }
}
