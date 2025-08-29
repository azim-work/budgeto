import { Button } from "./ui/button";
import { Settings, UserRoundCog } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import SettingsContent from "@/components/SettingsContent";
import { useState } from "react";
import { CirclePlus } from "lucide-react";
import { LogOut } from "lucide-react";

import AddExpenseForm from "./AddExpenseForm";
import { useAuth } from "@/context/AuthContext";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export default function Header() {
  const { logout } = useAuth();
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

        {/* Dropdown with settings and logout */}
        <Dialog open={settingsDialogOpen} onOpenChange={setSettingsDialogOpen}>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar className="cursor-pointer">
                <AvatarFallback>
                  <UserRoundCog className="w-6 h-6 " />
                </AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onSelect={() => setSettingsDialogOpen(true)}>
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </DropdownMenuItem>
              <DropdownMenuItem onSelect={logout}>
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <DialogContent>
            <SettingsContent onClose={() => setSettingsDialogOpen(false)} />
          </DialogContent>
        </Dialog>
      </nav>
    </header>
  );
}
