/**
 * Formats duration in seconds into standard YouTube timestamp (e.g. 0:45, 3:20, 1:12:05)
 * @param {number|string} seconds
 * @returns {string} formatted time string
 */
export default function formatDuration(seconds) {
  if (!seconds || isNaN(seconds) || seconds <= 0) {
    return "0:00";
  }

  const secNum = Math.floor(Number(seconds));
  const hours = Math.floor(secNum / 3600);
  const minutes = Math.floor((secNum % 3600) / 60);
  const secs = secNum % 60;

  const paddedSecs = secs < 10 ? `0${secs}` : `${secs}`;

  if (hours > 0) {
    const paddedMins = minutes < 10 ? `0${minutes}` : `${minutes}`;
    return `${hours}:${paddedMins}:${paddedSecs}`;
  }

  return `${minutes}:${paddedSecs}`;
}
