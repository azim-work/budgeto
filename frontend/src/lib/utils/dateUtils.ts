import { format } from "date-fns";

export function formatDateReadable(dateStr: string) {
  // Interpret date string as local date, not UTC
  const localDate = new Date(dateStr + "T00:00");
  return format(localDate, "MMMM d, yyyy");
}
