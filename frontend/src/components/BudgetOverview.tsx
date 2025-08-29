import { useSettings } from "@/context/SettingsContext";
import { useExpenses } from "@/context/ExpensesContext";
import {
  amountInDefaultCurrency,
  convertAmountBetweenCurrencies,
} from "@/lib/utils";
import { StatCard } from "./ui/StatCard";

export const BudgetOverview = () => {
  const { budget, defaultCurrency } = useSettings();
  const { expenses } = useExpenses();

  const totalSpent = expenses.reduce((sum, exp) => {
    return (
      sum +
      Number(
        convertAmountBetweenCurrencies(
          exp.amount,
          exp.currency,
          defaultCurrency
        )
      )
    );
  }, 0);

  const remaining = Math.max(0, budget - totalSpent);

  const stats = [
    {
      label: "Remaining",
      value: amountInDefaultCurrency(
        remaining,
        defaultCurrency,
        defaultCurrency
      ),
    },
    {
      label: "Spent",
      value: amountInDefaultCurrency(
        totalSpent,
        defaultCurrency,
        defaultCurrency
      ),
    },
    {
      label: "Budget",
      value: amountInDefaultCurrency(budget, defaultCurrency, defaultCurrency),
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
