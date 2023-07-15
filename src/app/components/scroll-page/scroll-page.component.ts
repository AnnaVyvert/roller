import { Component, ElementRef, ViewChild } from '@angular/core';
import { getRandomInt } from 'src/utils/rand';
import { JsonScheme } from 'src/interfaces/jsonScheme';
import {
  getValueFromStore,
  loadStore,
  setValue2Store,
} from 'src/utils/json-worker';
import { scrollDown, scrollUp } from 'src/utils/scroll';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-scroll-page',
  templateUrl: './scroll-page.component.html',
  styleUrls: ['./scroll-page.component.scss'],
})
export class ScrollPageComponent {
  @ViewChild('scrollContainer', { static: true }) scrollContainer!: ElementRef;

  scrollElement: HTMLElement | undefined;

  selectedJson: string = getValueFromStore('selected-json') ?? '0';
  selectedIndex: number = parseInt(this.selectedJson);

  store: JsonScheme[][] = loadStore('json');

  cards: JsonScheme[] = this.store[this.selectedIndex];

  displayedCards: JsonScheme[] = [];

  cardTitle: string = this.cards[this.selectedIndex].name;

  checkboxStore: number[][] = JSON.parse(
    getValueFromStore('checkbox-store') ?? '[[]]'
  );
  checkboxStoreArray: number[] = this.checkboxStore[this.selectedIndex] ?? [];

  ngOnInit(): void {
    this.cards = this.updateCardsWithFilters();
    this.displayedCards = scrollDown(this.cards, this.displayedCards);
  }

  updateCheckboxStore = () => this.checkboxStore[this.selectedIndex] ?? [];

  updateCardsWithFilters = () =>
    this.cards.filter(
      (el: JsonScheme) => !this.checkboxStoreArray.includes(el.id)
    );

  ngAfterViewInit(): void {
    this.scrollElement = this.scrollContainer.nativeElement;
    this.scrollStartInMiddle();
  }

  scrollStartInMiddle = () =>
    (this.scrollElement!.scrollTop = this.scrollElement!.clientHeight / 2);

  updateCards(i: number) {
    setValue2Store('selected-json', i.toString());
    this.selectedIndex = i;
    this.checkboxStoreArray = this.updateCheckboxStore();
    this.cards = this.store[i];
    this.cards = this.updateCardsWithFilters();
    this.displayedCards = this.cards;

    if (this.cards.length !== 1) this.scrollStartInMiddle();
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


  constructor(private modalService: MdbModalService) {}
  modalRef: MdbModalRef<ModalComponent> | null = null;

  openManual() {
    this.modalRef = this.modalService.open(ModalComponent, {
      data: {
        title: 'User Guide',
        description: `<h4 class="code-line" data-line-start="0" data-line-end="1"><a id="__0"></a>верхняя панель:</h4>
        <p class="has-line-data" data-line-start="1" data-line-end="3">
          тут вы можете менять датасеты,<br />
          которые были созданы<br />в редакторе датасетов (<i class="fa-solid fa-file-pen"></i>)
        </p>
        <h4 class="code-line" data-line-start="3" data-line-end="4"><a id="__3"></a>лента карточек:</h4>
        <p class="has-line-data" data-line-start="4" data-line-end="7">
          лента для бесконечного скролла<br />
          линия посередине - индикатор, показывающий<br />
          на какой карточке остановилась лента
        </p>
        <h4 class="code-line" data-line-start="7" data-line-end="8"><a id="__7"></a>нижняя панель:</h4>
        <p class="has-line-data" data-line-start="8" data-line-end="11">
          панель для автоматического прокручивания ленты (<i class="fa-solid fa-shuffle"></i>) (<i class="fa-solid fa-scroll"></i>),<br />
          перехода в редактор датасетов (<i class="fa-solid fa-file-pen"></i>)<br />
          и страницу отображения карточек (<i class="fa-solid fa-square-check"></i>)
        </p>
        `,
        approveTemplate: false,
      },
      modalClass: 'modal-dialog-centered',
    });
  }
}
