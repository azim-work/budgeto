import { formatDateReadable } from "@/lib/utils/dateUtils";
import type { BudgetItem } from "@/types";
import BudgetItemCard from "./BudgetItemCard";
import { Separator } from "../ui/custom/separator";

interface BudgetItemsOnADayProps {
  date: string;
  budgetItems: BudgetItem[];
}

export default function ExpensesOnADay({
  date,
  budgetItems,
}: BudgetItemsOnADayProps) {
  return (
    <div>
      <div className="text-sm font-bold mb-4">{formatDateReadable(date)}</div>

      {budgetItems.map((budgetItem, i) => (
        <div key={budgetItem.id} className="text-sm">
          {i != 0 && <Separator inset={true} className="my-2" />}
          <BudgetItemCard budgetItem={budgetItem} />
        </div>
      ))}
    </div>
  );
}
