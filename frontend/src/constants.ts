export const DEFAULT_BUDGET: number = 5000;

export const CONVERSION_RATES = {
  CAD: 1,
  AED: 2.73,
  INR: 61.34,
};

export type Currency = keyof typeof CONVERSION_RATES;
export const DEFAULT_CURRENCY = "CAD";
