import { CONVERSION_RATES, CURRENCY_SYMBOLS, type Currency } from "@/constants";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function convertAmountBetweenCurrencies(
  amount: number,
  fromCurrency: Currency,
  toCurrency: Currency,
  decimals: number = 2
): string {
  const fromRate = CONVERSION_RATES[fromCurrency];
  const toRate = CONVERSION_RATES[toCurrency];
  const converted = (amount / fromRate) * toRate;
  return Number(converted.toFixed(decimals)).toFixed(decimals);
}

export function formatAmountWithCurrency(
  amountStr: string,
  currency: Currency
): string {
  const symbol = CURRENCY_SYMBOLS[currency] || "";
  return `${symbol}${amountStr}`;
}
