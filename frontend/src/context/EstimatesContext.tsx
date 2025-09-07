import { fetchEstimates } from "@/lib/api";
import type { Estimate } from "@/types";
import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

type EstimatesContextType = {
  estimates: Estimate[];
  refreshEstimates: () => void;
};

const EstimatesContext = createContext<EstimatesContextType | undefined>(
  undefined
);

export const EstimatesProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [estimates, setEstimates] = useState<Estimate[]>([]);

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

  return (
    <EstimatesContext.Provider value={{ estimates, refreshEstimates }}>
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
