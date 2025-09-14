import { useSettings } from "@/context/SettingsContext";
import { useExpenses } from "@/context/ExpensesContext";
import { convertAmountToDefaultCurrency } from "@/lib/utils";
import { StatCard } from "./ui/StatCard";
import { useDefaultCurrencyAmountStr } from "@/hooks/useDefaultCurrencyAmountStr";

export const BudgetOverview = () => {
  const { budget, defaultCurrency } = useSettings();
  const { expenses } = useExpenses();

  // hook to format amounts in default currency
  const format = useDefaultCurrencyAmountStr();

  const totalSpent = expenses.reduce((sum, exp) => {
    return (
      sum +
      // amount in default currency
      convertAmountToDefaultCurrency(exp.amount, exp.currency, defaultCurrency)
    );
  }, 0);

  const remaining = Math.max(0, budget - totalSpent);

  const stats = [
    {
      label: "Remaining",
      value: format(remaining, defaultCurrency),
    },

    {
      label: "Spent",
      value: format(totalSpent, defaultCurrency),
    },

    {
      label: "Budget",
      value: format(budget, defaultCurrency),
    },
    { label: "Currency", value: defaultCurrency },
  ];

  return (
    <div className="flex gap-2 outline mb-8">
      {stats.map((stat) => (
        <StatCard key={stat.label} label={stat.label} value={stat.value} />
      ))}
    </div>
  );
};
