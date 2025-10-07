import { useSettings } from "@/context/SettingsContext";
import { formatAmount, formatStringCase } from "@/lib/utils";
import type { BudgetItem } from "@/types";
import clsx from "clsx";

interface BudgetItemCardProps {
  budgetItem: BudgetItem;
}

export default function BudgetItemCard({ budgetItem }: BudgetItemCardProps) {
  const { defaultCurrency } = useSettings();

  const isEstimate = "source" in budgetItem && budgetItem.source === "estimate";

  return (
    <div
      className={clsx(
        "flex justify-between pl-2",
        isEstimate && "text-muted-foreground"
      )}
    >
      <div>
        <div className="text-xs">{budgetItem.description}</div>
        <div className="text-xs text-muted-foreground">
          {formatStringCase(budgetItem.category)}
        </div>
      </div>
      <div className="text-xs font-bold">
        {formatAmount(budgetItem.amount, budgetItem.currency, defaultCurrency)}
      </div>
    </div>
  );
}
