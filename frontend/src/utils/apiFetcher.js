import { API_BASE } from "../config";

/**
 * Fetch wrapper with automatic retry for Render cold-starts & connection drops
 */
export async function customFetch(url, options = {}, retries = 2, delayMs = 2000) {
  let attempt = 0;
  while (attempt <= retries) {
    try {
      const response = await fetch(url, options);
      return response;
    } catch (err) {
      attempt++;
      if (attempt > retries) {
        throw err;
      }
      console.warn(`[API] Connection attempt ${attempt} failed. Retrying in ${delayMs}ms...`, err.message);
      await new Promise(res => setTimeout(res, delayMs));
    }
  }
}

/**
 * Background ping to warm up backend on page load
 */
export function pingBackend() {
  const healthUrl = API_BASE.includes("/api") 
    ? `${API_BASE.split("/api")[0]}/api/health` 
    : `${API_BASE}/health`;

  fetch(healthUrl, { method: "GET" })
    .then(res => res.json())
    .then(data => console.log("[Backend Warmup]:", data.status || "UP"))
    .catch(() => console.log("[Backend Warmup]: Server waking up..."));
}
