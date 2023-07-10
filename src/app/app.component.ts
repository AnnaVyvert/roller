import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  @ViewChild('scrollContainer', { static: true }) scrollContainer!: ElementRef;

  jsonLocalStoreName: string = "json"

  // cards = Array(5).map((e, i)=> {
  //   e.title = 'Card '+i,
  //   e.image = 'https://i0.wp.com/www.flutterbeads.com/wp-content/uploads/2022/01/add-image-in-flutter-hero.png?fit=2850%2C1801&ssl=1',
  //   e.description = 'Description for Card '+i,
  //   e.footer = 'Footer for Card '+i
  // })
  // cards = [
  //   {
  //     title: 'Card 1',
  //     image: 'https://i0.wp.com/www.flutterbeads.com/wp-content/uploads/2022/01/add-image-in-flutter-hero.png?fit=2850%2C1801&ssl=1',
  //     description: 'Description for Card 1',
  //     footer: 'Footer for Card 1'
  //   },
  //   {
  //     title: 'Card 2',
  //     image: 'https://i0.wp.com/www.flutterbeads.com/wp-content/uploads/2022/01/add-image-in-flutter-hero.png?fit=2850%2C1801&ssl=1',
  //     description: 'Description for Card 2',
  //     footer: 'Footer for Card 2'
  //   },
  //   {
  //     title: 'Card 3',
  //     image: 'https://i0.wp.com/www.flutterbeads.com/wp-content/uploads/2022/01/add-image-in-flutter-hero.png?fit=2850%2C1801&ssl=1',
  //     description: 'Description for Card 2',
  //     footer: 'Footer for Card 2'
  //   },
  //   {
  //     title: 'Card 4',
  //     image: 'https://i0.wp.com/www.flutterbeads.com/wp-content/uploads/2022/01/add-image-in-flutter-hero.png?fit=2850%2C1801&ssl=1',
  //     description: 'Description for Card 2',
  //     footer: 'Footer for Card 2'
  //   },
  //   {
  //     title: 'Card 5',
  //     image: 'https://i0.wp.com/www.flutterbeads.com/wp-content/uploads/2022/01/add-image-in-flutter-hero.png?fit=2850%2C1801&ssl=1',
  //     description: 'Description for Card 2',
  //     footer: 'Footer for Card 2'
  //   },
  // ];

  cards = this.loadJson()

  displayedCards: { title: string; name: string; pic_url: string; description: string; footer: string; }[] = [];
  batchSize = 3; // Number of cards to load at a time
  // @ts-ignore
  cardTitle: string = this.cards[0].name 

  ngOnInit() {
    // Simulating initial data loading
    this.loadMoreCards();
  }

  loadMoreCards() {
    const startIndex = this.displayedCards.length % this.cards.length;
    const endIndex = startIndex + this.batchSize;
  
    if (this.displayedCards.length === 0 || this.displayedCards.length < this.cards.length) {
      // Load cards normally
      const newCards = this.cards.slice(startIndex, endIndex);
      this.displayedCards = this.displayedCards.concat(newCards);
    } else {
      // Wrap around and load cards from the beginning
      const wrappedCards = this.cards.slice(startIndex).concat(this.cards.slice(0, this.batchSize));
      this.displayedCards = this.displayedCards.concat(wrappedCards);
    }
  }
  
  
  

  onScroll() {
    const container = this.scrollContainer.nativeElement;
    // const isScrolledToTop = container.scrollTop + container.clientHeight === 0;
    const isScrolledToBottom = container.scrollTop + container.clientHeight >= container.scrollHeight;
    console.log(container.scrollTop + container.clientHeight, container.scrollHeight);
    
    if (isScrolledToBottom) {
      this.loadMoreCards();
    }

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



  loadJson(): [] {
    return JSON.parse(
      window.localStorage.getItem(this.jsonLocalStoreName) ?? '[]'
    );
  }


}
