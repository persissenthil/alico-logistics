export function formatRelativeTime(date: Date) {
  const now = new Date();

  const diff = Math.floor(
    (now.getTime() - date.getTime()) / 1000
  );

  if (diff < 60) {
    return "Just now";
  }

  if (diff < 3600) {
    const minutes = Math.floor(diff / 60);
    return `${minutes} minute${minutes === 1 ? "" : "s"} ago`;
  }

  if (diff < 86400) {
    const hours = Math.floor(diff / 3600);
    return `${hours} hour${hours === 1 ? "" : "s"} ago`;
  }

  if (diff < 604800) {
    const days = Math.floor(diff / 86400);
    return `${days} day${days === 1 ? "" : "s"} ago`;
  }

  return date.toLocaleDateString();
}