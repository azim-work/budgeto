export const DEFAULT_BUDGET: number = 5000;

// Relative to CAD
export const CONVERSION_RATES = {
  CAD: 1,
  AED: 2.73,
  INR: 61.34,
};

export const CURRENCY_LOCALES: Record<Currency, string> = {
  CAD: "en-CA",
  INR: "en-IN",
  AED: "en-AE",
};

export type Currency = keyof typeof CONVERSION_RATES;
export const DEFAULT_CURRENCY = "CAD";
