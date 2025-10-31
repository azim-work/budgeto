import { fetchEstimates, deleteEstimate as deleteEstimateApi } from "@/lib/api";
import type { BudgetItem } from "@/types";
import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

type EstimatesContextType = {
  estimates: BudgetItem[];
  refreshEstimates: () => void;
  deleteEstimate: (estimateId: number) => void;
};

const EstimatesContext = createContext<EstimatesContextType | undefined>(
  undefined
);

export const EstimatesProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [estimates, setEstimates] = useState<BudgetItem[]>([]);

  const refreshEstimates = async () => {
    try {
      const data = await fetchEstimates();
      setEstimates(data);
    } catch (err) {
      console.error("Failed to fetch estimates: ", err);
      toast.error("Failed to fetch estimates");
    }
  };
  useEffect(() => {
    refreshEstimates();
  }, []);

  const deleteEstimate = async (estimateId: number) => {
    try {
      await deleteEstimateApi(estimateId);
      await refreshEstimates();
    } catch (err) {
      console.error("Failed to delete estimate: ", err);
    }
  };

  return (
    <EstimatesContext.Provider
      value={{ estimates, refreshEstimates, deleteEstimate }}
    >
      {children}
    </EstimatesContext.Provider>
  );
};

export const useEstimates = () => {
  const ctx = useContext(EstimatesContext);
  if (!ctx)
    throw new Error("useEstimates must be used inside <EstimatesProvider>");
  return ctx;
};
