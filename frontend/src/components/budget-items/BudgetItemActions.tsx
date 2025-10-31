import { Button } from "../ui/button";
import { MoreVerticalIcon } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { BudgetItem } from "@/types";

interface BudgetItemActionsProps {
  budgetItem: BudgetItem;
  onDelete: (budgetItem: any) => void;
}

export default function BudgetItemActions({
  budgetItem,
  onDelete,
}: BudgetItemActionsProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="link" aria-label="Open menu">
          <MoreVerticalIcon />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuGroup>
          <DropdownMenuItem onSelect={() => onDelete(budgetItem)}>
            Delete Item
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
