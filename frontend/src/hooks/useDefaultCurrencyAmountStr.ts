import type { Currency } from "@/constants";
import { useSettings } from "@/context/SettingsContext";
import { formatAmount } from "@/lib/utils";

export function useDefaultCurrencyAmountStr() {
  const { defaultCurrency } = useSettings();

  return (amount: number, fromCurrency: Currency) => {
    return formatAmount(amount, fromCurrency, defaultCurrency);
  };
}
