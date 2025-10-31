import { fetchExpenses, deleteExpense as deleteExpenseApi } from "@/lib/api";
import type { BudgetItem } from "@/types";
import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

type ExpensesContextType = {
  expenses: BudgetItem[];
  refreshExpenses: () => void;
  deleteExpense: (expenseId: number) => void;
};

const ExpensesContext = createContext<ExpensesContextType | undefined>(
  undefined
);

export const ExpensesProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [expenses, setExpenses] = useState<BudgetItem[]>([]);

  const refreshExpenses = async () => {
    try {
      const data = await fetchExpenses();
      setExpenses(data);
    } catch (err) {
      console.error("Failed to fetch expenses: ", err);
      toast.error("Failed to fetch expenses");
    }
  };
  useEffect(() => {
    refreshExpenses();
  }, []);

  const deleteExpense = async (expenseId: number) => {
    try {
      await deleteExpenseApi(expenseId);
      await refreshExpenses();
    } catch (err) {
      console.error("Failed to delete estimate: ", err);
    }
  };

  return (
    <ExpensesContext.Provider
      value={{ expenses, refreshExpenses, deleteExpense }}
    >
      {children}
    </ExpensesContext.Provider>
  );
};

export const useExpenses = () => {
  const ctx = useContext(ExpensesContext);
  if (!ctx)
    throw new Error("useExpenses must be used inside <ExpensesProvider>");
  return ctx;
};
