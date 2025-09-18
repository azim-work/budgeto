import { useSettings } from "@/context/SettingsContext";
import { useEstimates } from "@/context/EstimatesContext";
import { useDefaultCurrencyAmountStr } from "@/hooks/useDefaultCurrencyAmountStr";
import { convertAmountToDefaultCurrency } from "@/lib/utils";
import { StatCard } from "./ui/StatCard";

export const EstimatedBudgetOverview = () => {
  const { budget, defaultCurrency } = useSettings();
  const { estimates } = useEstimates();

  // hook to format amounts in default currency
  const format = useDefaultCurrencyAmountStr();

  const estimatedSpent = estimates.reduce((sum, est) => {
    return (
      sum +
      // amount in default currency
      convertAmountToDefaultCurrency(est.amount, est.currency, defaultCurrency)
    );
  }, 0);

  const estimatedRemaining = Math.max(0, budget - estimatedSpent);

  const stats = [
    {
      label: "Estimated Remaining",
      value: format(estimatedRemaining, defaultCurrency),
    },
    {
      label: "Estimated Spent",
      value: format(estimatedSpent, defaultCurrency),
    },
    {
      label: "Budget",

      value: format(budget, defaultCurrency),
    },
    { label: "Currency", value: defaultCurrency },
  ];

  return (
    <div className="flex flex-col sm:flex-row flex-wrap gap-4 mb-8">
      {stats.map((stat) => (
        <StatCard key={stat.label} label={stat.label} value={stat.value} />
      ))}
    </div>
  );
};
