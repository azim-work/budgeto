import type { Currency } from "./constants";

export interface Settings {
  budget: number;
  defaultCurrency: Currency;
}

export type Expense = {
  id: number;
  date: string;
  category: string;
  description: string;
  amount: number;
  currency: Currency;
};
