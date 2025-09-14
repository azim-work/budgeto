import { CONVERSION_RATES, CURRENCY_LOCALES, type Currency } from "@/constants";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function convertAmountBetweenCurrencies(
  amount: number,
  fromCurrency: Currency,
  toCurrency: Currency
): number {
  const fromRate = CONVERSION_RATES[fromCurrency];
  const toRate = CONVERSION_RATES[toCurrency];
  const amountInDefaultCurrency = (amount / fromRate) * toRate;

  return amountInDefaultCurrency;
}

export function convertAmountToDefaultCurrency(
  amount: number,
  fromCurrency: Currency,
  defaultCurrency: Currency
): number {
  const amountInDefaultCurrency = convertAmountBetweenCurrencies(
    amount,
    fromCurrency,
    defaultCurrency
  );

  return amountInDefaultCurrency;
}

export function formatAmountWithCurrency(
  amount: number,
  currency: Currency
): string {
  const locale = CURRENCY_LOCALES[currency];
  const formatter = Intl.NumberFormat(locale, {
    style: "currency",
    currency: currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return formatter.format(amount);
}

export function formatAmount(
  amount: number,
  fromCurrency: Currency,
  defaultCurrency: Currency
): string {
  const amountInDefaultCurrency = convertAmountToDefaultCurrency(
    amount,
    fromCurrency,
    defaultCurrency
  );
  const formattedAmount = formatAmountWithCurrency(
    amountInDefaultCurrency,
    defaultCurrency
  );
  return formattedAmount;
}
