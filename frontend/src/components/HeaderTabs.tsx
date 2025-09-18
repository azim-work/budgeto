import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLocation, useNavigate } from "react-router-dom";

interface HeaderTabsProps {
  className?: string;
}

export function HeaderTabs({ className }: HeaderTabsProps) {
  const location = useLocation();
  const navigate = useNavigate();

  // Map current path to tab value
  const pathname = location.pathname;

  const currentTab = pathname.startsWith("/estimates")
    ? "estimates"
    : "expenses";

  const handleTabChange = (value: string) => {
    if (value === "expenses") navigate("/expenses");
    if (value === "estimates") navigate("/estimates");
  };

  return (
    <Tabs
      defaultValue={currentTab}
      onValueChange={handleTabChange}
      className={className}
    >
      <TabsList className="!grid !grid-cols-2 !w-full !bg-muted !p-0 !rounded-lg overflow-hidden">
        <TabsTrigger value="expenses" onClick={() => navigate("/expenses")}>
          Expenses
        </TabsTrigger>
        <TabsTrigger value="estimates" onClick={() => navigate("/estimates")}>
          Estimates
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
