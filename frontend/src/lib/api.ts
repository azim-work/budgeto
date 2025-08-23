import axios from "axios";
import type { Currency } from "../constants";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export interface Settings {
  budget: number;
  defaultCurrency: Currency;
}

export async function fetchSettings(): Promise<Settings> {
  const res = await axios.get<Settings>(`${API_BASE_URL}/settings`);
  return res.data;
}

export async function saveSettings(settings: Settings): Promise<void> {
  await axios.put(`${API_BASE_URL}/settings`, settings);
}
