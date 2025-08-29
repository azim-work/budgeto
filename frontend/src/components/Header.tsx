import { Button } from "./ui/button";
import { Settings } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import SettingsContent from "@/components/SettingsContent";
import { useState } from "react";
import { CirclePlus } from "lucide-react";
import AddExpenseForm from "./AddExpenseForm";

export default function Header() {
  const [settingsDialogOpen, setSettingsDialogOpen] = useState(false);
  const [addExpenseDialogOpen, setAddExpenseDialogOpen] = useState(false);

  return (
    <header className="flex justify-between items-center p-4 border-b">
      <h1 className="text-3xl font-semibold">Budgeto</h1>
      <nav className="flex gap-1">
        {/* Add Expense */}
        <Dialog
          open={addExpenseDialogOpen}
          onOpenChange={setAddExpenseDialogOpen}
        >
          <DialogTrigger asChild>
            <Button variant="outline">
              <CirclePlus className="w-4 h-4" />
              <span className="sr-only sm:not-sr-only sm:ml-1">
                Add Expense
              </span>
            </Button>
          </DialogTrigger>

          <DialogContent>
            <AddExpenseForm onClose={() => setAddExpenseDialogOpen(false)} />
          </DialogContent>
        </Dialog>
        {/* Settings  */}
        <Dialog open={settingsDialogOpen} onOpenChange={setSettingsDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="outline">
              <Settings className="w-4 h-4" />
              <span className="sr-only sm:not-sr-only sm:ml-1">Settings</span>
            </Button>
          </DialogTrigger>

          <DialogContent>
            <SettingsContent onClose={() => setSettingsDialogOpen(false)} />
          </DialogContent>
        </Dialog>
      </nav>
    </header>
  );
}
