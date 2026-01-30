export function timeAgo(date) {
  const seconds = Math.floor((new Date() - new Date(date)) / 1000);

  // Intervals with YouTube-style short labels
  const intervals = [
    { label: "yr", seconds: 31536000 },
    { label: "mo", seconds: 2592000 },
    { label: "wk", seconds: 604800 },
    { label: "d", seconds: 86400 },
    { label: "h", seconds: 3600 },
    { label: "min", seconds: 60 },
    { label: "s", seconds: 1 },
  ];

  for (const i of intervals) {
    const count = Math.floor(seconds / i.seconds);
    if (count > 0) {
      // Return format: "1 yr ago", "2 mo ago", etc.
      // No plural "s" for abbreviations usually.
      return `${count} ${i.label} ago`;
    }
  }
  return "just now";
}
