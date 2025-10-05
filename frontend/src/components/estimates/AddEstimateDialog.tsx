import { CirclePlus } from "lucide-react";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import { useState } from "react";

import AddEstimateForm from "../AddEstimateForm";

export default function AddEstimateDialog() {
  const [addEstimateDialogOpen, setAddEstimateDialogOpen] = useState(false);
  return (
    <Dialog
      open={addEstimateDialogOpen}
      onOpenChange={setAddEstimateDialogOpen}
    >
      <DialogTrigger asChild>
        <Button>
          <CirclePlus className="w-4 h-4" />
          <span className="sr-only sm:not-sr-only sm:ml-1">Add Estimate</span>
        </Button>
      </DialogTrigger>

      <DialogContent>
        <AddEstimateForm onClose={() => setAddEstimateDialogOpen(false)} />
      </DialogContent>
    </Dialog>
  );
}
