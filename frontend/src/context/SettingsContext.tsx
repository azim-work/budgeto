import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import { DEFAULT_BUDGET, DEFAULT_CURRENCY } from "../constants";
import type { Currency } from "../constants";
import { fetchSettings, saveSettings } from "../lib/api";
import type { Settings } from "@/types";

interface SettingsContextType extends Settings {
  readonly budget: number;
  readonly defaultCurrency: Currency;
  updateSettings: (settings: Settings) => Promise<void>;
}

const SettingsContext = createContext<SettingsContextType | null>(null);

export function useSettings() {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error("useSettings must be used within a SettingsProvider");
  }
  return context;
}

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [budget, setBudget] = useState(DEFAULT_BUDGET);
  const [defaultCurrency, setDefaultCurrency] =
    useState<Currency>(DEFAULT_CURRENCY);

  // runs only once, after mount
  useEffect(() => {
    const storedBudget = parseFloat(localStorage.getItem("budget") || "");
    const storedDefaultCurrency = localStorage.getItem(
      "defaultCurrency"
    ) as Currency | null;

    if (!isNaN(storedBudget)) setBudget(storedBudget);
    if (storedDefaultCurrency) setDefaultCurrency(storedDefaultCurrency);

    // set state if available in local storage
    if (storedBudget && setDefaultCurrency) {
      setBudget(Number(storedBudget));
      setDefaultCurrency(storedDefaultCurrency as Currency);
    }
  }, []);

  // then, refresh data from backend
  useEffect(() => {
    async function getSettings() {
      try {
        const data = await fetchSettings();

        if (data.budget) setBudget(data.budget);
        if (data.defaultCurrency) setDefaultCurrency(data.defaultCurrency);
      } catch (err) {
        console.error("Failed to fetch settings from backend:", err);
      }
    }
    getSettings();
  }, []);

  async function updateSettings(newSettings: Settings) {
    // Save current state
    const previousSettings = { budget, defaultCurrency };

    // Optimistically update UI and localStorage
    setBudget(newSettings.budget);
    setDefaultCurrency(newSettings.defaultCurrency);
    localStorage.setItem("budget", newSettings.budget.toString());
    localStorage.setItem("defaultCurrency", newSettings.defaultCurrency);

    // Call api
    try {
      await saveSettings(newSettings);
    } catch (err) {
      console.error("Failed to update settings: ", err);

      // Rollback UI and localStorage
      setBudget(previousSettings.budget);
      setDefaultCurrency(previousSettings.defaultCurrency);
      localStorage.setItem("budget", previousSettings.budget.toString());
      localStorage.setItem("defaultCurrency", previousSettings.defaultCurrency);

      // Let component handle error & toast
      throw err;
    }
  }

  return (
    <SettingsContext.Provider
      value={{
        budget,
        defaultCurrency,
        updateSettings,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
}
