// FinFlow has no merchant-profile table — adding one is a bigger feature
// than "add a QR code" warrants. Instead, the business name a merchant
// types once is cached client-side and reused as the default on future
// invoices/links, and stored per-record in the DB so past invoices keep
// showing the name that was true when they were created.
const KEY = "finflow-business-name";

export function getSavedBusinessName(): string {
  if (typeof window === "undefined") return "";
  return localStorage.getItem(KEY) || "";
}

export function saveBusinessName(name: string) {
  if (typeof window === "undefined") return;
  if (name.trim()) localStorage.setItem(KEY, name.trim());
}
