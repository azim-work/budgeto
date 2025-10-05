import { useSettings } from "@/context/SettingsContext";
import { formatAmount, formatStringCase } from "@/lib/utils";
import type { BudgetItem, Combined } from "@/types";

interface BudgetItemCardProps {
  budgetItem: BudgetItem | Combined;
}

export default function BudgetItemCard({ budgetItem }: BudgetItemCardProps) {
  const { defaultCurrency } = useSettings();

  return (
    <div className="flex justify-between pl-2">
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
