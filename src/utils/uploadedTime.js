export default function timeAgo(dateString) {
  let num=dateString.toString();
  const updated = new Date(num).getTime();
  const now = new Date().getTime();
  let diff = Math.floor((now - updated) / 1000); // difference in seconds

  let suffix = " ago";

  // Handle future dates
  if (diff < 0) {
    diff = Math.abs(diff);
    suffix = " from now";
  }

  if (diff < 60) return `${diff} second${diff !== 1 ? "s" : ""}${suffix}`;
  if (diff < 3600) {
    const minutes = Math.floor(diff / 60);
    return `${minutes} minute${minutes !== 1 ? "s" : ""}${suffix}`;
  }
  if (diff < 86400) {
    const hours = Math.floor(diff / 3600);
    return `${hours} hour${hours !== 1 ? "s" : ""}${suffix}`;
  }
  if (diff < 2592000) {
    const days = Math.floor(diff / 86400);
    return `${days} day${days !== 1 ? "s" : ""}${suffix}`;
  }
  if (diff < 31536000) {
    const months = Math.floor(diff / 2592000); // approx 30 days per month
    return `${months} month${months !== 1 ? "s" : ""}${suffix}`;
  }
  
  
}

// Example usage
// console.log(timeAgo("2025-09-18T19:22:20.446Z")); // "x day(s) ago" or "from now"
