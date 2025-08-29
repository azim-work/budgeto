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
import { Button } from "./ui/button";
import { CirclePlus } from "lucide-react";
import { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import AddExpenseForm from "./AddExpenseForm";

export const ExpensesTable = () => {
  const { expenses } = useExpenses();

  const [addExpenseDialogOpen, setAddExpenseDialogOpen] = useState(false);

  return (
    <>
      <div className="flex justify-between">
        <h1 className="mt-4">Expenses</h1>
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
              <TableHead>Amount</TableHead>
            </TableRow>
          </TableHeader>
        )}
        <TableBody>
          {expenses.map((exp) => (
            <TableRow key={exp.id}>
              <TableCell className="font-medium">{exp.date}</TableCell>
              <TableCell>{exp.category}</TableCell>
              <TableCell>{exp.description}</TableCell>
              <TableCell>
                {exp.amount.toFixed(2)} {exp.currency}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};
