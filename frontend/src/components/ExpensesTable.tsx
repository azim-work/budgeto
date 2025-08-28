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

export const ExpensesTable = () => {
  const { expenses } = useExpenses();

  return (
    <>
      <h1 className="mt-4">Expenses</h1>
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
