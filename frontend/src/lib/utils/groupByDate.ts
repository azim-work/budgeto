import type { BudgetItem, Combined } from "@/types";

export default function groupByDate(
  budgetItems: (BudgetItem | Combined)[]
): Record<string, (BudgetItem | Combined)[]> {
  const groups: Record<string, (BudgetItem | Combined)[]> = {};

  budgetItems.forEach((item) => {
    if (!groups[item.date]) groups[item.date] = [];
    groups[item.date].push(item);
  });

  return groups;
}
