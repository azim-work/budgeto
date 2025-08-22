import { useSettings } from "../context/SettingsContext";

function HomePage() {
  const { budget, defaultCurrency } = useSettings();
  return (
    <div style={{ padding: "2rem" }}>
      <small className="text-sm font-medium leading-none">Budget</small>

      <div className="text-lg font-semibold">
        {budget} {defaultCurrency}
      </div>
    </div>
  );
}

export default HomePage;
