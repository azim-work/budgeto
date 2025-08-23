import { useState } from "react";
import { useSettings } from "../context/SettingsContext";
import { CONVERSION_RATES, type Currency } from "../constants";
import type { Settings } from "@/context/SettingsContext.tsx";

import { SelectWithLabel } from "@/components/SelectWithLabel";
import { InputWithLabel } from "@/components/InputWithLabel";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";

import {
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";

interface SettingsContentProps {
  onClose: () => void;
}

export default function SettingsContent({ onClose }: SettingsContentProps) {
  const { budget, defaultCurrency, updateSettings } = useSettings();

  const [localBudget, setLocalBudget] = useState(budget);
  const [localCurrency, setLocalCurrency] = useState(defaultCurrency);
  const [error, setError] = useState("");

  async function handleSave() {
    // validate
    if (localBudget <= 0) {
      setError("Budget must be greater than 0");
      return;
    }

    const newSettings: Settings = {
      budget: localBudget,
      defaultCurrency: localCurrency,
    };

    try {
      await updateSettings(newSettings);
      toast.success("Settings saved");
      onClose();
    } catch (err) {
      console.error("Failed to save settings: ", err);
      setError("Failed to save settings");
    }
  }

  return (
    <div className="grid gap-4">
      <DialogHeader className="pb-2">
        <DialogTitle>Settings</DialogTitle>
        <DialogDescription>
          Make changes to the default currency and budget.
        </DialogDescription>
      </DialogHeader>
      <SelectWithLabel
        id="currency"
        label="Default Currency"
        options={Object.keys(CONVERSION_RATES)}
        placeholder="Select Default Currency"
        value={localCurrency}
        onChange={(val) => setLocalCurrency(val as Currency)}
      />
      <InputWithLabel
        id="budget"
        label="Budget"
        type="number"
        placeholder="Enter Budget"
        value={localBudget}
        onChange={(e) => setLocalBudget(Number(e.target.value))}
        suffix={localCurrency}
      />
      <div className="min-h-[1.25rem] text-sm text-red-500">
        {error && error}
      </div>
      <DialogFooter>
        <Button variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button onClick={handleSave}>Save</Button>
      </DialogFooter>
    </div>
  );
}
