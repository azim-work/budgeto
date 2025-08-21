import { Routes, Route } from "react-router-dom";
import SettingsPage from "./pages/SettingsPage";
import HomePage from "./pages/HomePage";
import Header from "./components/Header";

function App() {
  return (
    <div style={{ padding: "2rem" }}>
      <Header />
      <main className="p-6">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
