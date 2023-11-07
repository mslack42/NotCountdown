import { CardData } from "../data/Card"

export function applyPerTurnCardChanges(cards: CardData[]): CardData[] {
    return cards.map((c,i) => {
        if (c.nonsenseType && c.nonsenseType === 'incrementer') {
          return {...c, value: c.value + 1}
        } else {
          return {...c}
        }
      })
}