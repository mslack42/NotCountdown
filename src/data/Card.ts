export type NonsenseCardType = "incrementer" | "uno-reverse"

export interface CardData {
    value: number
    compoundLevel: number
    nonsenseType?: string
}