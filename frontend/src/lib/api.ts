import axios from "axios";
import type { Settings, Expense } from "@/types";

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

export async function fetchExpenses(): Promise<Expense[]> {
  const res = await axios.get<Expense[]>(`${API_BASE_URL}/expenses`);
  return res.data;
}

export async function addExpense(
  expense: Omit<Expense, "id">
): Promise<Expense> {
  const res = await axios.post<Expense>(`${API_BASE_URL}/expenses`, expense);
  return res.data;
}
