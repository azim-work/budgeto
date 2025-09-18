import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { LogOut } from "lucide-react";
import { Settings, UserRoundCog } from "lucide-react";
import { Dialog, DialogContent } from "./ui/dialog";
import SettingsContent from "@/components/SettingsContent";

export default function AvatarDropdown() {
  const { logout } = useAuth();
  const [settingsDialogOpen, setSettingsDialogOpen] = useState(false);
  return (
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
  );
}
