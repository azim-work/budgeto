import { useEstimates } from "../context/EstimatesContext";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useSettings } from "@/context/SettingsContext";
import { useDefaultCurrencyAmountStr } from "@/hooks/useDefaultCurrencyAmountStr";
import { CirclePlus } from "lucide-react";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import { useState } from "react";
import AddEstimateForm from "./AddEstimateForm";
import { convertAmountToDefaultCurrency } from "@/lib/utils";

export const EstimatesTable = () => {
  const { defaultCurrency } = useSettings();
  const { estimates } = useEstimates();

  // hook to format amounts in default currency
  const format = useDefaultCurrencyAmountStr();

  const [addEstimateDialogOpen, setAddEstimateDialogOpen] = useState(false);

  return (
    <div className="mt-10">
      <div className="flex justify-between">
        <div className="text-xl mb-4">Estimates</div>
        {/* Add Estimate */}
        <Dialog
          open={addEstimateDialogOpen}
          onOpenChange={setAddEstimateDialogOpen}
        >
          <DialogTrigger asChild>
            <Button>
              <CirclePlus className="w-4 h-4" />
              <span className="sr-only sm:not-sr-only sm:ml-1">
                Add Estimate
              </span>
            </Button>
          </DialogTrigger>

          <DialogContent>
            <AddEstimateForm onClose={() => setAddEstimateDialogOpen(false)} />
          </DialogContent>
        </Dialog>
      </div>

      <Table>
        {estimates.length === 0 && (
          <TableCaption className="text-left mt-4">
            No estimates yet
          </TableCaption>
        )}

        {estimates.length !== 0 && (
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Description</TableHead>
              <TableHead className="text-right">
                Amount ({defaultCurrency})
              </TableHead>
            </TableRow>
          </TableHeader>
        )}
        <TableBody>
          {estimates.map((exp) => (
            <TableRow key={exp.id}>
              <TableCell className="font-medium">{exp.date}</TableCell>
              <TableCell>{exp.category}</TableCell>
              <TableCell>{exp.description}</TableCell>
              <TableCell className="text-right">
                {format(exp.amount, exp.currency)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
