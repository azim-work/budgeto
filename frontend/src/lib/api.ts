import axios from "axios";
import type { Settings, Expense } from "@/types";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

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
