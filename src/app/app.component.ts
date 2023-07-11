import { Component, ElementRef, ViewChild } from '@angular/core';

interface JsonScheme {
  id: number;
  name: string;
  pic_url: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @ViewChild('scrollContainer', { static: true }) scrollContainer!: ElementRef;
  localStoreName: string = "json"

  cards: JsonScheme[] = this.loadJson()[2]

  displayedCards: JsonScheme[] = [];
  batchSize = this.cards.length; // Number of cards to load at a time
  // @ts-ignore
  cardTitle: string = this.cards[0].name 

  ngOnInit() {
    // Simulating initial data loading
    this.loadCardsDown();

  }

  ngAfterViewInit() {
    console.log(this.scrollContainer.nativeElement.scrollTop);
    
    this.loadCardsUp()
  }

  loadCardsUp() {
    const startIndex = this.displayedCards.length % this.cards.length;
    const endIndex = startIndex + this.batchSize;
  
    if (this.displayedCards.length === 0 || this.displayedCards.length < this.cards.length) {
      // Load cards normally
      
      const newCards = this.cards.slice(startIndex, endIndex);
      this.displayedCards = [...newCards, ...this.displayedCards];
    } else {
      // Wrap around and load cards from the beginning
      const wrappedCards = this.cards.slice(startIndex).concat(this.cards.slice(0, this.batchSize));
      this.displayedCards = [...wrappedCards, ...this.displayedCards];
    }
    this.scrollContainer.nativeElement.scrollTop += this.batchSize*297;
  }

  loadCardsDown() {
    const startIndex = this.displayedCards.length % this.cards.length;
    const endIndex = startIndex + this.batchSize;
  
    if (this.displayedCards.length === 0 || this.displayedCards.length < this.cards.length) {
      // Load cards normally
      const newCards = this.cards.slice(startIndex, endIndex);
      this.displayedCards = this.displayedCards.concat(newCards);
      console.error(newCards.length);
    } else {
      // Wrap around and load cards from the beginning
      const wrappedCards = this.cards.slice(startIndex).concat(this.cards.slice(0, this.batchSize));
      this.displayedCards = this.displayedCards.concat(wrappedCards);
      console.error(wrappedCards.length);
    }
  }
  
  onScroll() {
    const container = this.scrollContainer.nativeElement;
    const isScrolledToTop = container.scrollTop <= 0 + 500;
    const isScrolledToBottom = container.scrollTop + container.clientHeight >= container.scrollHeight - 300;
    
    if (isScrolledToBottom) {
      this.loadCardsDown();
      console.log(container.scrollTop);
    } else if (isScrolledToTop) {
      this.loadCardsUp();
      // container.scrollTop = container.scrollTop+(292+20)*this.batchSize
      // container.scrollTop += 3206
      // console.log(container.scrollTop);
      
    }
    // console.log(this.cards.length);
    // container.scrollTop = container.scrollTop+10
    

    const intersectionOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.5 // Adjust threshold value as needed
    };

    const observer = new IntersectionObserver(entries => {
      entries.forEach((entry: any) => {
        if (entry.isIntersecting) {
          this.cardTitle = entry.target.querySelector('.card-title').textContent;
          // console.log('Title of the card in the center:', cardTitle);
        }
      });
    }, intersectionOptions);

    const cardsInView = document.querySelectorAll('.card');
    cardsInView.forEach(card => {
      observer.observe(card);
    });
  }



  loadJson(): JsonScheme[][] {
    return JSON.parse(
      window.localStorage.getItem(this.localStoreName) ?? '[]'
    );
  }


}
