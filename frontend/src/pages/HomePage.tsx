import { ExpensesList } from "@/components/ExpensesList";
import { BudgetOverview } from "@/components/BudgetOverview";
import Header from "@/components/Header";

function HomePage() {
  return (
    <div style={{ padding: "2rem" }}>
      <div className="text-lg font-semibold">
        <Header />
        <BudgetOverview />
        <ExpensesList />
      </div>
    </div>
  );
}

export default HomePage;
