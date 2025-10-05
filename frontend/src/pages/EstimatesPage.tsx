import { EstimatesList } from "@/components/EstimatesList";
import { EstimatedBudgetOverview } from "@/components/EstimatedBudgetOverview";
import Header from "@/components/Header";

function HomePage() {
  return (
    <div style={{ padding: "2rem" }}>
      <div className="text-lg font-semibold">
        <Header />
        <EstimatedBudgetOverview />
        <EstimatesList />
      </div>
    </div>
  );
}

export default HomePage;
