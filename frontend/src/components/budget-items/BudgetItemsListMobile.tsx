import { useExpenses } from "@/context/ExpensesContext";
import { useEstimates } from "@/context/EstimatesContext";
import BudgetItemsOnADay from "./BudgetItemsOnADay";
import groupByDate from "@/lib/utils/groupByDate";
import clsx from "clsx";

interface BudgetItemsListMobileProps {
  type: string;
}

const BudgetItemsListMobile = ({ type }: BudgetItemsListMobileProps) => {
  const { expenses } = useExpenses();
  const { estimates } = useEstimates();
  const budgetItems = type === "expenses" ? expenses : estimates;
  const groupedBudgetItems = groupByDate(budgetItems);

  return (
    <div>
      {Object.entries(groupedBudgetItems).map(([date, budgetItems], i) => {
        return (
          <div key={date} className={clsx(i !== 0 && "mt-6")}>
            <BudgetItemsOnADay
              key={date}
              date={date}
              budgetItems={budgetItems}
            />
          </div>
        );
      })}
    </div>
  );
};

export default BudgetItemsListMobile;
