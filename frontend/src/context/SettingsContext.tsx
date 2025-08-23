import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import { DEFAULT_BUDGET, DEFAULT_CURRENCY } from "../constants";
import type { Currency } from "../constants";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export interface Settings {
  budget: number;
  defaultCurrency: Currency;
}

interface SettingsContextType extends Settings {
  setBudget: (value: number) => void;
  setDefaultCurrency: (value: Currency) => void;
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
    const localBudget = localStorage.getItem("budget");
    const localDefaultCurrency = localStorage.getItem("defaultCurrency");

    // set state if available in local storage
    if (localBudget && localDefaultCurrency) {
      setBudget(Number(localBudget));
      setDefaultCurrency(localDefaultCurrency as Currency);
    }
  }, []);

  // then, refresh data from backend
  useEffect(() => {
    async function fetchSettings() {
      try {
        const response = await axios.get<Settings>(`${API_BASE_URL}/settings`);
        const data = response.data;
        if (data.budget) setBudget(data.budget);
        if (data.defaultCurrency) setDefaultCurrency(data.defaultCurrency);
      } catch (err) {
        console.error("Failed to fetch settings from backend:", err);
      }
    }
    fetchSettings();
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
      await axios.put(`${API_BASE_URL}/settings`, newSettings);
    } catch (err) {
      console.error("Failed to update settings: ", err);

      // Rollback UI and localStorage
      setBudget(previousSettings.budget);
      setDefaultCurrency(previousSettings.defaultCurrency);
      localStorage.setItem("budget", previousSettings.budget.toString());
      localStorage.setItem("defaultCurrency", previousSettings.defaultCurrency);
    }
  }

  return (
    <SettingsContext.Provider
      value={{
        budget,
        setBudget,
        defaultCurrency,
        setDefaultCurrency,
        updateSettings,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
}
