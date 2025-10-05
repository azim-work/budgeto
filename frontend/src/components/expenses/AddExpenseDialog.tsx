import { CirclePlus } from "lucide-react";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import { useState } from "react";

import AddExpenseForm from "../AddExpenseForm";

export default function AddExpenseDialog() {
  const [addExpenseDialogOpen, setAddExpenseDialogOpen] = useState(false);
  return (
    <Dialog open={addExpenseDialogOpen} onOpenChange={setAddExpenseDialogOpen}>
      <DialogTrigger asChild>
        <Button>
          <CirclePlus className="w-4 h-4" />
          <span className="sr-only sm:not-sr-only sm:ml-1">Add Expense</span>
        </Button>
      </DialogTrigger>

      <DialogContent>
        <AddExpenseForm onClose={() => setAddExpenseDialogOpen(false)} />
      </DialogContent>
    </Dialog>
  );
}
