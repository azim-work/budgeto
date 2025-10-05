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

interface BudgetItemsListDesktopProps {
  type: string;
}

export default function BudgetItemsListDesktop({
  type,
}: BudgetItemsListDesktopProps) {
  const { defaultCurrency } = useSettings();
  const { expenses } = useExpenses();
  const { estimates } = useEstimates();

  const budgetItems = type === "expense" ? expenses : estimates;

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
        {budgetItems.map((exp) => (
          <TableRow key={exp.id}>
            <TableCell className="font-medium">{exp.date}</TableCell>
            <TableCell>{exp.category}</TableCell>
            <TableCell>{exp.description}</TableCell>
            <TableCell className="text-right">
              {format(exp.amount, exp.currency)}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
