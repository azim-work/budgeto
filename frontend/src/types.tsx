import type { Currency } from "./constants";

export interface Settings {
  budget: number;
  defaultCurrency: Currency;
}

export const EXPENSE_CATEGORIES = [
  "TRAVEL",
  "FOOD",
  "TRANSPORT",
  "TOUR",
  "TIPS",
  "SHOPPING",
  "MISCELLANEOUS",
] as const;

export type ExpenseCategory = (typeof EXPENSE_CATEGORIES)[number];

export type Expense = {
  id: number;
  date: string;
  category: string;
  description: string;
  amount: number;
  currency: Currency;
};
