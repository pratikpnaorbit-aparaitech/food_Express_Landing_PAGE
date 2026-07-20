import { API_BASE } from "../config";

export const REMOTE_API_BASE = "https://food-express-landing-page.onrender.com/api";

/**
 * Smart fetch wrapper:
 * 1. Tries primary target URL (localhost in DEV mode or VITE_API_URL).
 * 2. If localhost port 5000 is not running, automatically falls back to live Render backend!
 * 3. Performs retries if Render is waking up from a cold start.
 */
export async function customFetch(url, options = {}, retries = 2, delayMs = 2000) {
  let currentUrl = url;
  let attempt = 0;
  let triedRemoteFallback = false;

  while (attempt <= retries) {
    try {
      const response = await fetch(currentUrl, options);
      return response;
    } catch (err) {
      attempt++;

      // If local dev server is not running on port 5000, fall back to live Render API
      if (currentUrl.includes("localhost:5000") && !triedRemoteFallback) {
        console.warn("[API] Local backend on localhost:5000 is not running. Falling back to live Render API:", REMOTE_API_BASE);
        currentUrl = currentUrl.replace("http://localhost:5000/api", REMOTE_API_BASE);
        triedRemoteFallback = true;
        attempt = 0;
        continue;
      }

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
  const primaryHealth = API_BASE.includes("/api") 
    ? `${API_BASE.split("/api")[0]}/api/health` 
    : `${API_BASE}/health`;

  fetch(primaryHealth, { method: "GET" })
    .then(res => res.json())
    .then(data => console.log("[Backend Warmup]: Primary server", data.status || "UP"))
    .catch(() => {
      console.log("[Backend Warmup]: Primary server offline, warming up live Render backend...");
      fetch(`${REMOTE_API_BASE}/health`, { method: "GET" }).catch(() => {});
    });
}
