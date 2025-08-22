import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import { DEFAULT_BUDGET, DEFAULT_CURRENCY } from "../constants";
import type { Currency } from "../constants";

interface SettingsContextType {
  budget: number;
  setBudget: (value: number) => void;
  defaultCurrency: Currency;
  setDefaultCurrency: (value: Currency) => void;
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
  // budget will load from localStorage, or fallback to default
  const [budget, setBudget] = useState(() => {
    const stored = localStorage.getItem("budget");
    return stored ? Number(stored) : DEFAULT_BUDGET;
  });

  // defaultCurrency will load from localStorage, or fallback to default
  const [defaultCurrency, setDefaultCurrency] = useState(() => {
    const stored = localStorage.getItem("defaultCurrency");
    return stored ? (stored as Currency) : DEFAULT_CURRENCY;
  });

  // Save budget to local storage on change
  useEffect(() => {
    localStorage.setItem("budget", String(budget));
  }, [budget]);

  // Save defaultCurrency to local storange on change
  useEffect(() => {
    localStorage.setItem("defaultCurrency", defaultCurrency);
  }, [defaultCurrency]);

  return (
    <SettingsContext.Provider
      value={{ budget, setBudget, defaultCurrency, setDefaultCurrency }}
    >
      {children}
    </SettingsContext.Provider>
  );
}
