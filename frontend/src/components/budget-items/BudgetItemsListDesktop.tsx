import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { useExpenses } from "../../context/ExpensesContext";
import { useEstimates } from "@/context/EstimatesContext";

import { useSettings } from "@/context/SettingsContext";
import { useDefaultCurrencyAmountStr } from "@/hooks/useDefaultCurrencyAmountStr";
import { formatDateReadable } from "@/lib/utils/dateUtils";

interface BudgetItemsListDesktopProps {
  type: string;
}

export default function BudgetItemsListDesktop({
  type,
}: BudgetItemsListDesktopProps) {
  const { defaultCurrency } = useSettings();
  const { expenses } = useExpenses();
  const { estimates } = useEstimates();

  const budgetItems = type === "expenses" ? expenses : estimates;

  // hook to format amounts in default currency
  const format = useDefaultCurrencyAmountStr();
  return (
    <Table>
      {budgetItems.length === 0 && (
        <TableCaption className="text-left mt-4">No {type} yet</TableCaption>
      )}

      {budgetItems.length !== 0 && (
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Description</TableHead>
            <TableHead className="text-right">
              Amount ({defaultCurrency})
            </TableHead>
          </TableRow>
        </TableHeader>
      )}
      <TableBody>
        {budgetItems.map((budgetItem) => (
          <TableRow
            key={budgetItem.id}
            // when it's an estimate, make it lighter and in italics
            className={
              "source" in budgetItem && budgetItem.source === "estimate"
                ? "text-muted-foreground italic"
                : ""
            }
          >
            <TableCell className="font-medium">
              {formatDateReadable(budgetItem.date)}
            </TableCell>
            <TableCell>{budgetItem.category}</TableCell>
            <TableCell>{budgetItem.description}</TableCell>
            <TableCell className="text-right">
              {format(budgetItem.amount, budgetItem.currency)}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
