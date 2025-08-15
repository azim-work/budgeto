import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";

type Currency = "CAD" | "AED" | "INR";

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
  const [budget, setBudget] = useState(0);
  const [defaultCurrency, setDefaultCurrency] = useState<Currency>("CAD");

  return (
    <SettingsContext.Provider
      value={{ budget, setBudget, defaultCurrency, setDefaultCurrency }}
    >
      {children}
    </SettingsContext.Provider>
  );
}
