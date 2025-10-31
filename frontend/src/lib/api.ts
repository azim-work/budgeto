import axios from "axios";
import type { Settings, BudgetItem } from "@/types";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

axios.defaults.withCredentials = true;

export async function login(password: string): Promise<boolean> {
  const res = await axios.post(
    `${import.meta.env.VITE_API_BASE_URL}/auth/login`,
    { password },
    { withCredentials: true } // REQUIRED for HttpOnly cookies
  );
  console.log("res: ", res);
  if (!res || res.data.message !== "Login successful") {
    return false;
  }
  return true;
}

export async function securePing(): Promise<void> {
  await axios.get(`${API_BASE_URL}/auth/me`, { withCredentials: true });
}

export async function fetchSettings(): Promise<Settings> {
  const res = await axios.get<Settings>(`${API_BASE_URL}/settings`);
  return res.data;
}

export async function saveSettings(settings: Settings): Promise<void> {
  await axios.put(`${API_BASE_URL}/settings`, settings);
}

export async function fetchExpenses(): Promise<BudgetItem[]> {
  const res = await axios.get<BudgetItem[]>(`${API_BASE_URL}/expenses`);
  // enrich with type for frontend
  return res.data.map((item) => ({ ...item, type: "expense" }));
}

export async function fetchEstimates(): Promise<BudgetItem[]> {
  const res = await axios.get<BudgetItem[]>(`${API_BASE_URL}/estimates/all`);
  // enrich with type for frontend
  return res.data.map((item) => ({ ...item, type: "estimate" }));
}

export async function addExpense(
  expense: Omit<BudgetItem, "id">
): Promise<BudgetItem> {
  const res = await axios.post<BudgetItem>(`${API_BASE_URL}/expenses`, expense);
  return res.data;
}

export async function addEstimate(
  estimate: Omit<BudgetItem, "id">
): Promise<BudgetItem> {
  const res = await axios.post<BudgetItem>(
    `${API_BASE_URL}/estimates`,
    estimate
  );
  return res.data;
}

export async function deleteExpense(expenseId: number): Promise<void> {
  await axios.delete<void>(`${API_BASE_URL}/expenses/${expenseId}`);
  return;
}

export async function deleteEstimate(estimateId: number): Promise<void> {
  await axios.delete<void>(`${API_BASE_URL}/estimates/${estimateId}`);
  return;
}
