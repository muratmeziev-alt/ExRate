export const formatAmount = (amount: number) => amount.toLocaleString("ru-RU");

/** Normalizes date/time to DD.MM HH:mm for consistent display. */
export const formatDateTime = (value: string | undefined): string => {
  if (!value) return "—";
  const trimmed = value.trim();
  if (!trimmed) return "—";
  const match = trimmed.match(/(\d{1,2})\.(\d{1,2})(?:\.\d{4})?\s+(\d{1,2}):(\d{2})(?::\d{2})?/);
  if (match) {
    const [, d, m, h, min] = match;
    return `${d.padStart(2, "0")}.${m.padStart(2, "0")} ${h.padStart(2, "0")}:${min}`;
  }
  return trimmed;
};
