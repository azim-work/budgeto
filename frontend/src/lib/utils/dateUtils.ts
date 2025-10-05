import { format } from "date-fns";

export function formatDateReadable(dateStr: string) {
  return format(new Date(dateStr), "MMMM d, yyyy");
}
