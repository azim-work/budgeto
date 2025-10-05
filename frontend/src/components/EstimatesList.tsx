import AddEstimateDialog from "./estimates/AddEstimateDialog";
import BudgetItemsListDesktop from "./budget-items/BudgetItemsListDesktop";
import BudgetItemsListMobile from "./budget-items/BudgetItemsListMobile";

export const EstimatesList = () => {
  return (
    <div className="mt-10">
      <div className="flex justify-between">
        <div className="text-xl mb-4">Estimates</div>
        {/* Add Estimate */}
        <AddEstimateDialog />
      </div>
      <div className="hidden sm:block">
        <BudgetItemsListDesktop type="estimates" />
      </div>
      <div className="block sm:hidden">
        {<BudgetItemsListMobile type="estimates" />}
      </div>
    </div>
  );
};
