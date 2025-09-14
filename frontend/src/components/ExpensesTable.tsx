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
import { useSettings } from "@/context/SettingsContext";
import { useDefaultCurrencyAmountStr } from "@/hooks/useDefaultCurrencyAmountStr";
import AddExpenseForm from "./AddExpenseForm";
import { CirclePlus } from "lucide-react";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import { useState } from "react";

export const ExpensesTable = () => {
  const { defaultCurrency } = useSettings();
  const { expenses } = useExpenses();

  // hook to format amounts in default currency
  const format = useDefaultCurrencyAmountStr();

  const [addExpenseDialogOpen, setAddExpenseDialogOpen] = useState(false);

  return (
    <div className="mt-10">
      <div className="flex justify-between">
        <div className="text-xl mb-4">Expenses</div>
        {/* Add Expense */}
        <Dialog
          open={addExpenseDialogOpen}
          onOpenChange={setAddExpenseDialogOpen}
        >
          <DialogTrigger asChild>
            <Button>
              <CirclePlus className="w-4 h-4" />
              <span className="sr-only sm:not-sr-only sm:ml-1">
                Add Expense
              </span>
            </Button>
          </DialogTrigger>

          <DialogContent>
            <AddExpenseForm onClose={() => setAddExpenseDialogOpen(false)} />
          </DialogContent>
        </Dialog>
      </div>

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
                {format(exp.amount, exp.currency)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
