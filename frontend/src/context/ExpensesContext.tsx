import { fetchExpenses } from "@/lib/api";
import type { BudgetItem } from "@/types";
import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

type ExpensesContextType = {
  expenses: BudgetItem[];
  refreshExpenses: () => void;
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

  return (
    <ExpensesContext.Provider value={{ expenses, refreshExpenses }}>
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
