import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "react-hot-toast";
import { useAuth } from "@/context/AuthContext";
import { Navigate } from "react-router-dom";

export default function LoginPage() {
  const { isAuthenticated, loading } = useAuth();
  if (loading) return null;

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  const navigate = useNavigate();

  const { login } = useAuth();
  const [password, setPassword] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginLoading(true);

    const success = await login(password);
    if (success) {
      toast.success("Login successful");
      navigate("/");
    } else {
      toast.error("Invalid password");
    }

    setLoginLoading(false);
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <form onSubmit={handleLogin} className="space-y-4 w-80">
        <h1 className="text-3xl text-center font-semibold">Budgeto</h1>
        <Input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Button className="w-full" type="submit" disabled={loginLoading}>
          {loginLoading ? "Logging in..." : "Login"}
        </Button>
      </form>
    </div>
  );
}
