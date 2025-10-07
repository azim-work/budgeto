import { useState } from "react";
import { SelectWithLabel } from "./SelectWithLabel";
import {
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { InputWithLabel } from "./InputWithLabel";
import { useSettings } from "@/context/SettingsContext";
import { CONVERSION_RATES, type Currency } from "@/constants";
import {
  EXPENSE_CATEGORIES,
  type BudgetItem,
  type ExpenseCategory,
} from "@/types";
import { DatePicker } from "./DatePicker";
import { Button } from "./ui/button";
import { toast } from "react-hot-toast";
import { addEstimate } from "@/lib/api";
import { useEstimates } from "@/context/EstimatesContext";

interface AddEstimateFormProps {
  onClose: () => void;
}

export default function AddEstimateForm({ onClose }: AddEstimateFormProps) {
  const { defaultCurrency } = useSettings();
  const { refreshEstimates } = useEstimates();

  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState(0);
  const [currency, setCurrency] = useState(defaultCurrency);
  const [category, setCategory] = useState("");
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [error, setError] = useState("");

  const validateForm = () => {
    if (!description.trim() || !category) {
      setError("Fill required fields");
      return false;
    }
    if (amount <= 0) {
      setError("Amount cannot be 0 or less");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      const payload = {
        description: description,
        amount: amount,
        currency: currency,
        category: category,
        date: date?.toISOString().split("T")[0], // Format date as YYYY-MM-DD
      };
      await addEstimate(payload as Omit<BudgetItem, "id">);
      refreshEstimates();
      toast.success("Estimate submitted");
      onClose();
    } catch (err) {
      console.error("Failed to submit estimate: ", err);
      toast.error("Failed to submit estimate");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid gap-4">
        <DialogHeader className="pb-2">
          <DialogTitle>Add Estimates</DialogTitle>
          <DialogDescription>Add a new estimate.</DialogDescription>
        </DialogHeader>
        <InputWithLabel
          id="description"
          label="Description"
          placeholder="Dhow Cruise"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <div className="flex gap-4">
          <InputWithLabel
            id="amount"
            label="Amount"
            type="number"
            placeholder="100"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            className="flex-1"
          />
          <SelectWithLabel
            id="currency"
            label="Currency"
            options={Object.keys(CONVERSION_RATES)}
            placeholder="Select Currency"
            value={currency}
            onChange={(val) => setCurrency(val as Currency)}
          />
        </div>
        <SelectWithLabel
          id="category"
          label="Category"
          options={[...EXPENSE_CATEGORIES]}
          placeholder="Select Category"
          value={category}
          onChange={(val) => setCategory(val as ExpenseCategory)}
        />
        <DatePicker label="Estimate Date" date={date} setDate={setDate} />
        <div className="min-h-[1.25rem] text-sm text-red-500">
          {error && error}
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit">Save</Button>
        </DialogFooter>
      </div>
    </form>
  );
}
