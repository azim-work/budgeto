import { Routes, Route, Link } from "react-router-dom";
import SettingsPage from "./pages/SettingsPage";
import HomePage from "./pages/HomePage";

function App() {
  return (
    <div style={{ padding: "2rem" }}>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/settings">Settings</Link>
      </nav>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/settings" element={<SettingsPage />} />
      </Routes>
    </div>
  );
}

export default App;
