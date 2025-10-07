import type { BudgetItem } from "@/types";

export default function groupByDate(
  budgetItems: BudgetItem[]
): Record<string, BudgetItem[]> {
  const groups: Record<string, BudgetItem[]> = {};

  budgetItems.forEach((item) => {
    if (!groups[item.date]) groups[item.date] = [];
    groups[item.date].push(item);
  });

  return groups;
}
