export function parseEventDate(value) {
  if (typeof value !== "string" || !value.trim()) return null;
  if (/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    const [year, month, day] = value.split("-").map(Number);
    const date = new Date(year, month - 1, day);
    return date.getFullYear() === year &&
      date.getMonth() === month - 1 &&
      date.getDate() === day
      ? date
      : null;
  }
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
}

export function upcomingEvents(payload, now = new Date()) {
  const list = Array.isArray(payload)
    ? payload
    : (payload?.events ?? payload?.data);
  if (!Array.isArray(list))
    throw new TypeError("La agenda no tiene un formato válido.");
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  return list
    .filter((event) => {
      if (
        !event ||
        event.id == null ||
        typeof event.nombre !== "string" ||
        !event.nombre.trim()
      )
        return false;
      const date = parseEventDate(event.fecha);
      return date !== null && date >= today;
    })
    .sort((a, b) => parseEventDate(a.fecha) - parseEventDate(b.fecha));
}

export function safeEventLink(value) {
  if (typeof value !== "string") return null;
  try {
    const url = new URL(value);
    return url.protocol === "https:" || url.protocol === "http:"
      ? url.href
      : null;
  } catch {
    return null;
  }
}
