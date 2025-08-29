import { useExpenses } from "../context/ExpensesContext";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { amountInDefaultCurrency } from "@/lib/utils";
import { useSettings } from "@/context/SettingsContext";

export const ExpensesTable = () => {
  const { defaultCurrency } = useSettings();
  const { expenses } = useExpenses();

  return (
    <div className="mt-10">
      <div className="text-xl mb-4">Expenses</div>

      <Table>
        {expenses.length === 0 && (
          <TableCaption className="text-left mt-4">
            No expenses yet
          </TableCaption>
        )}

        {expenses.length !== 0 && (
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
          {expenses.map((exp) => (
            <TableRow key={exp.id}>
              <TableCell className="font-medium">{exp.date}</TableCell>
              <TableCell>{exp.category}</TableCell>
              <TableCell>{exp.description}</TableCell>
              <TableCell className="text-right">
                {amountInDefaultCurrency(
                  exp.amount,
                  exp.currency,
                  defaultCurrency
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
