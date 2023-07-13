import { JsonScheme } from "src/interfaces/jsonScheme";

const CARD_SIZE = 297;

export function scrollUp(cards: JsonScheme[], displayedCards: JsonScheme[], scrollElement: HTMLElement) {
  scrollElement.scrollTop += cards.length * CARD_SIZE;
  return cards.concat(displayedCards);
}

export function scrollDown(cards: JsonScheme[], displayedCards: JsonScheme[]) {
  return displayedCards.concat(cards);
}
