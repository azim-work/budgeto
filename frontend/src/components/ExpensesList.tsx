import AddExpenseDialog from "./expenses/AddExpenseDialog";
import BudgetItemsListDesktop from "./budget-items/BudgetItemsListDesktop";
import BudgetItemsListMobile from "./budget-items/BudgetItemsListMobile";

export const ExpensesList = () => {
  return (
    <div className="mt-10">
      <div className="flex justify-between">
        <div className="text-xl mb-4">Expenses</div>
        {/* Add Estimate */}
        <AddExpenseDialog />
      </div>
      <div className="hidden sm:block">
        <BudgetItemsListDesktop type="expenses" />
      </div>
      <div className="block sm:hidden">
        {<BudgetItemsListMobile type="expenses" />}
      </div>
    </div>
  );
};
