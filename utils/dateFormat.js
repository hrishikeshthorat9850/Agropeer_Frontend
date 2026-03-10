/**
 * Format any date (Date, ISO string, etc.) as dd-mm-yyyy.
 * Use for all user-facing date display.
 */
export const dateFormat = (dateInput) => {
  if (!dateInput) return "—";

  const date = new Date(dateInput);
  if (isNaN(date.getTime())) return "—";

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  return `${day}-${month}-${year}`;
};

/**
 * Parse dd-mm-yyyy or dd/mm/yyyy string to yyyy-mm-dd (ISO date) for storage/API.
 * Returns null if invalid.
 */
export const parseDDMMYYYY = (str) => {
  if (!str || typeof str !== "string") return null;
  const normalized = str.trim().replace(/\//g, "-");
  const parts = normalized.split("-");
  if (parts.length !== 3) return null;
  const [d, m, y] = parts.map((p) => parseInt(p, 10));
  if (!Number.isFinite(d) || !Number.isFinite(m) || !Number.isFinite(y))
    return null;
  if (d < 1 || d > 31 || m < 1 || m > 12 || y < 1000) return null;
  const date = new Date(y, m - 1, d);
  if (date.getFullYear() !== y || date.getMonth() !== m - 1 || date.getDate() !== d)
    return null;
  const month = String(m).padStart(2, "0");
  const day = String(d).padStart(2, "0");
  return `${y}-${month}-${day}`;
};