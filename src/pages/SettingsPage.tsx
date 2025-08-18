import { useState } from "react";
import { useSettings } from "../context/SettingsContext";
import { CONVERSION_RATES, type Currency } from "../constants";

export default function SettingsPage() {
  const { budget, setBudget, defaultCurrency, setDefaultCurrency } =
    useSettings();

  const [localBudget, setLocalBudget] = useState(budget);
  const [localCurrency, setLocalCurrency] = useState(defaultCurrency);

  function handleSave() {
    setBudget(localBudget);
    setDefaultCurrency(localCurrency);
  }

  return (
    <div>
      <h2>Settings</h2>
      <div>
        <label>Default Currency: </label>
        <select
          value={localCurrency}
          onChange={(e) => setLocalCurrency(e.target.value as Currency)}
        >
          {Object.keys(CONVERSION_RATES).map((cur) => (
            <option key={cur} value={cur}>
              {cur}
            </option>
          ))}
        </select>
      </div>

      <div style={{ marginBottom: "1rem" }}>
        <label>Budget: </label>
        <input
          type="number"
          value={localBudget}
          onChange={(e) => setLocalBudget(Number(e.target.value as any))}
        ></input>
        <select
          value={localCurrency}
          onChange={(e) => setLocalCurrency(e.target.value as Currency)}
        >
          {Object.keys(CONVERSION_RATES).map((cur) => (
            <option key={cur} value={cur}>
              {cur}
            </option>
          ))}
        </select>
      </div>
      <button onClick={handleSave}>Save</button>
    </div>
  );
}
