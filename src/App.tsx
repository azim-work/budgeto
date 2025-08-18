import SettingsPage from "./pages/SettingsPage";
import { useSettings } from "./context/SettingsContext";

function App() {
  const { budget, defaultCurrency } = useSettings();
  return (
    <div style={{ padding: "2rem" }}>
      <h1>Budgeto</h1>
      <p>Seamlessly track your travel budget and expenses.</p>
      <p>
        Budget: {budget} {defaultCurrency}
      </p>

      <SettingsPage />
    </div>
  );
}

export default App;
