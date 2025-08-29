import { ExpensesTable } from "@/components/ExpensesTable";
import { BudgetOverview } from "@/components/BudgetOverview";

function HomePage() {
  return (
    <div style={{ padding: "2rem" }}>
      <div className="text-lg font-semibold">
        <BudgetOverview />
        <ExpensesTable />
      </div>
    </div>
  );
}

export default HomePage;
