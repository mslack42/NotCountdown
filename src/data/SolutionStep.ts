import { CardData } from "./Card";
import { Operation } from "./Operation";

export interface SolutionStep {
    operation: Operation;
    arg1: CardData;
    arg2: CardData;
  }