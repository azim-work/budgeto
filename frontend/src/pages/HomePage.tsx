import { ExpensesTable } from "@/components/ExpensesTable";
import { BudgetOverview } from "@/components/BudgetOverview";
import Header from "@/components/Header";

function HomePage() {
  return (
    <div style={{ padding: "2rem" }}>
      <div className="text-lg font-semibold">
        <Header />
        <BudgetOverview />
        <ExpensesTable />
      </div>
    </div>
  );
}

export default HomePage;
