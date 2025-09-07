import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import HomePage from "./pages/HomePage";
import EstimatesPage from "./pages/EstimatesPage";
import LoginPage from "./pages/LoginPage";

import { useAuth } from "./context/AuthContext";
import { SettingsProvider } from "./context/SettingsContext";
import { ExpensesProvider } from "./context/ExpensesContext";
import { Spinner } from "@/components/ui/shadcn-io/spinner";
import { EstimatesProvider } from "./context/EstimatesContext";

function AppRoutes() {
  const { isAuthenticated, loading } = useAuth();
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Spinner />
      </div>
    );
  }

  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/" element={<Navigate to="/expenses" replace />} />
      <Route
        path="/expenses"
        element={
          isAuthenticated ? <HomePage /> : <Navigate to="/login" replace />
        }
      />
      <Route
        path="/estimates"
        element={
          isAuthenticated ? <EstimatesPage /> : <Navigate to="/login" replace />
        }
      />
    </Routes>
  );
}

function App() {
  const { isAuthenticated } = useAuth();

  return (
    <Router>
      {isAuthenticated && (
        <SettingsProvider>
          <ExpensesProvider>
            <EstimatesProvider>
              <AppRoutes />
            </EstimatesProvider>
          </ExpensesProvider>
        </SettingsProvider>
      )}
      {!isAuthenticated && <AppRoutes />}
    </Router>
  );
}

export default App;
``;
