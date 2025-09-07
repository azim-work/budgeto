import { useSettings } from "@/context/SettingsContext";
import { useEstimates } from "@/context/EstimatesContext";
import {
  amountInDefaultCurrency,
  convertAmountBetweenCurrencies,
} from "@/lib/utils";
import { StatCard } from "./ui/StatCard";

export const EstimatedBudgetOverview = () => {
  const { budget, defaultCurrency } = useSettings();
  const { estimates } = useEstimates();

  const estimatedSpent = estimates.reduce((sum, exp) => {
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

  const estimatedRemaining = Math.max(0, budget - estimatedSpent);

  const stats = [
    {
      label: "Estimated Remaining",
      value: amountInDefaultCurrency(
        estimatedRemaining,
        defaultCurrency,
        defaultCurrency
      ),
    },
    {
      label: "Estimated Spent",
      value: amountInDefaultCurrency(
        estimatedSpent,
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
