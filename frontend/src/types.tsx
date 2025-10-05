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

export type BaseItem = {
  id: number;
  date: string;
  category: string;
  description: string;
  amount: number;
  currency: Currency;
};

export type Expense = BaseItem & { type: "expense" };
export type Estimate = BaseItem & { type: "estimate" };

export type BudgetItem = Expense | Estimate;

export type EstimateSource = "expense" | "estimate";

export type Combined = {
  id: number;
  date: string;
  category: string;
  description: string;
  amount: number;
  currency: Currency;
  source: EstimateSource;
};
