import { useSettings } from "@/context/SettingsContext";
import { formatAmount, capitalizeFirstLetter } from "@/lib/utils";
import type { BudgetItem } from "@/types";
import clsx from "clsx";
import BudgetItemActions from "./BudgetItemActions";
import { useEstimates } from "@/context/EstimatesContext";
import toast from "react-hot-toast";
import { useState } from "react";
import ConfirmationDialog from "./ConfirmationDialog";
import { useExpenses } from "@/context/ExpensesContext";

interface BudgetItemCardProps {
  budgetItem: BudgetItem;
}

export default function BudgetItemCard({ budgetItem }: BudgetItemCardProps) {
  const { defaultCurrency } = useSettings();
  const { deleteEstimate } = useEstimates();
  const { deleteExpense } = useExpenses();
  const [open, setOpen] = useState(false);

  const isEstimate = "source" in budgetItem && budgetItem.source === "estimate";
  const source = isEstimate ? "Estimate" : "Expense";

  const onDeleteClick = () => {
    setOpen(true);
  };

  const onDeleteCancel = () => {
    setOpen(false);
  };

  const onDeleteConfirm = () => {
    try {
      isEstimate ? deleteEstimate(budgetItem.id) : deleteExpense(budgetItem.id);
      toast.success(`${source} deleted successfully`);
    } catch (err) {
      console.error(`Failed to delete ${source}: `, err);
      toast.error(`Failed to delete ${source}`);
    } finally {
      setOpen(false);
    }
  };

  return (
    <div
      className={clsx(
        "flex justify-between pl-2",
        isEstimate && "text-muted-foreground"
      )}
    >
      <ConfirmationDialog
        title={`Delete ${source}`}
        description={`You are about to delete ${budgetItem.description}. Are you sure?`}
        open={open}
        onConfirm={onDeleteConfirm}
        onCancel={onDeleteCancel}
        destructive={true}
      />
      <div>
        <div className="text-xs">{budgetItem.description}</div>
        <div className="text-xs text-muted-foreground">
          {capitalizeFirstLetter(budgetItem.category)}
        </div>
      </div>
      <div className="flex">
        <div className="flex text-xs font-bold items-center">
          {formatAmount(
            budgetItem.amount,
            budgetItem.currency,
            defaultCurrency
          )}
        </div>
        <BudgetItemActions budgetItem={budgetItem} onDelete={onDeleteClick} />
      </div>
    </div>
  );
}
