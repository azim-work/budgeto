import { useSettings } from "../context/SettingsContext";

function HomePage() {
  const { budget, defaultCurrency } = useSettings();
  return (
    <div style={{ padding: "2rem" }}>
      <h1>Budgeto</h1>
      <p>Seamlessly track your travel budget and expenses.</p>
      <p>
        Budget: {budget} {defaultCurrency}
      </p>
    </div>
  );
}

export default HomePage;
