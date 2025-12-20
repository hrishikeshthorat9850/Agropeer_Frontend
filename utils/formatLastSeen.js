export function formatLastSeen(timestamp) {
  const date = new Date(timestamp);
  const now = new Date();

  const isToday = date.toDateString() === now.toDateString();

  if (isToday) {
    return `today at ${date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`;
  }

  const yesterday = new Date();
  yesterday.setDate(now.getDate() - 1);

  const isYesterday = date.toDateString() === yesterday.toDateString();

  if (isYesterday) {
    return `yesterday at ${date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`;
  }

  return date.toLocaleDateString() +
    " " +
    date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}
