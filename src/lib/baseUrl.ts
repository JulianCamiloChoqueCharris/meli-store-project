export function getBaseUrl() {
  if (typeof window !== "undefined") return "";
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  const host = process.env.HOST ?? "localhost";
  const port = process.env.PORT ?? "3000";
  return `http://${host}:${port}`;
}
