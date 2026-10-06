export default function timeAgo(dateString) {
  if (!dateString) return "Recently";

  const updated = new Date(dateString).getTime();
  if (isNaN(updated)) return "Recently";

  const now = Date.now();
  let diff = Math.floor((now - updated) / 1000); // difference in seconds

  let suffix = " ago";

  // Handle future dates
  if (diff < 0) {
    diff = Math.abs(diff);
    suffix = " from now";
  }

  if (diff < 10) return "Just now";
  if (diff < 60) return `${diff} second${diff !== 1 ? "s" : ""}${suffix}`;

  const minutes = Math.floor(diff / 60);
  if (minutes < 60) return `${minutes} minute${minutes !== 1 ? "s" : ""}${suffix}`;

  const hours = Math.floor(diff / 3600);
  if (hours < 24) return `${hours} hour${hours !== 1 ? "s" : ""}${suffix}`;

  const days = Math.floor(diff / 86400);
  if (days < 7) return `${days} day${days !== 1 ? "s" : ""}${suffix}`;

  const weeks = Math.floor(days / 7);
  if (weeks < 4) return `${weeks} week${weeks !== 1 ? "s" : ""}${suffix}`;

  const months = Math.floor(days / 30);
  if (months < 12) return `${months} month${months !== 1 ? "s" : ""}${suffix}`;

  const years = Math.floor(days / 365);
  return `${years} year${years !== 1 ? "s" : ""}${suffix}`;
}
