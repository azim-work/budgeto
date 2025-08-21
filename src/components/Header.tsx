import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { Home, Settings } from "lucide-react";

export default function Header() {
  return (
    <header className="flex justify-between items-center p-4 border-b">
      <h1 className="text-xl font-semibold">Budgeto</h1>
      <nav className="flex gap-1">
        <Button variant="ghost" asChild>
          <Link to="/" className="flex items-center">
            <Home className="w-4 h-4" />
            <span className="sr-only sm:not-sr-only sm:ml-1">Home</span>
          </Link>
        </Button>
        <Button variant="ghost" asChild>
          <Link to="/settings" className="flex items-center">
            <Settings className="w-4 h-4" />
            <span className="sr-only sm:not-sr-only sm:ml-1">Settings</span>
          </Link>
        </Button>
      </nav>
    </header>
  );
}
