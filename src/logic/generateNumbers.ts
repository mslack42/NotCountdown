import { CardData } from "../data/Card";

export function generateNumbers(
    numberOfLargeNumbersSelected: number,
    useExpertNumbers: boolean
  ): CardData[] {
    const shuffle = (arr: number[]) =>
      Array.from(arr)
        .map((v) => {
          return { value: v, sort: Math.random() };
        })
        .sort((a, b) => a.sort - b.sort)
        .map((sortObj) => sortObj.value);
  
    const largeNumbers = shuffle(
      useExpertNumbers ? [12, 37, 62, 87] : [25, 50, 75, 100]
    );
    const smallNumbers = shuffle([
      1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10,
    ]);
  
    return largeNumbers
      .slice(0, numberOfLargeNumbersSelected)
      .concat(smallNumbers.slice(0, 6 - numberOfLargeNumbersSelected))
      .sort((a, b) => a - b)
      .map(n => {
          return {value: n, compoundLevel: 1}
      });
  }