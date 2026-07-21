import { API_BASE, REMOTE_API_BASE } from "../config";

/**
 * Enhanced fetch wrapper with:
 * - Detailed console logging (Method, Final URL, Headers, Body, Status, Response Body, Errors)
 * - Automatic retry logic for Render cold starts
 * - Smart fallback from local dev to remote Render backend if localhost is offline
 */
export async function customFetch(url, options = {}, retries = 2, delayMs = 2000) {
  let currentUrl = url;
  let attempt = 0;
  let triedRemoteFallback = false;

  // Force HTTPS for non-localhost remote URLs to prevent 301 HTTP->HTTPS redirect from stripping POST body
  if (currentUrl.startsWith("http://") && !currentUrl.includes("localhost") && !currentUrl.includes("127.0.0.1")) {
    currentUrl = currentUrl.replace("http://", "https://");
  }

  const method = (options.method || "GET").toUpperCase();
  const headers = { ...options.headers };

  // Ensure Content-Type is set to application/json if body exists and header is missing
  if (options.body && !headers["Content-Type"] && !headers["content-type"]) {
    headers["Content-Type"] = "application/json";
  }

  const body = options.body ? options.body : null;
  const requestOptions = {
    ...options,
    method,
    headers,
    body
  };

  while (attempt <= retries) {
    console.log(`[API Request] 🚀 ${method} ${currentUrl}`);
    console.log(`[API Headers]`, headers);
    if (body) {
      try {
        console.log(`[API Body]`, JSON.parse(body));
      } catch (e) {
        console.log(`[API Body]`, body);
      }
    }

    try {
      const response = await fetch(currentUrl, requestOptions);
      
      // Clone response to log body safely without consuming the stream
      try {
        const clonedRes = response.clone();
        const resData = await clonedRes.json();
        console.log(`[API Response] 📥 ${response.status} ${response.statusText} for ${currentUrl}`);
        console.log(`[API Response Body]`, resData);
      } catch (jsonErr) {
        console.log(`[API Response] 📥 ${response.status} ${response.statusText} (Non-JSON content) for ${currentUrl}`);
      }

      return response;
    } catch (err) {
      attempt++;
      console.error(`[API Network Error] ❌ Failed to fetch ${currentUrl} (Attempt ${attempt}/${retries + 1}):`, err.message);

      // If local dev server is not running on port 5000, fall back to live Render API
      if (currentUrl.includes("localhost:5000") && !triedRemoteFallback) {
        console.warn(`[API Fallback] Local backend on localhost:5000 is unreachable. Switching to live Render API: ${REMOTE_API_BASE}`);
        currentUrl = currentUrl.replace(/^http:\/\/localhost:5000\/api/i, REMOTE_API_BASE);
        if (currentUrl.startsWith("http://") && !currentUrl.includes("localhost")) {
          currentUrl = currentUrl.replace("http://", "https://");
        }
        triedRemoteFallback = true;
        attempt = 0;
        continue;
      }

      if (attempt > retries) {
        throw err;
      }
      console.warn(`[API Retry] Connection attempt ${attempt} failed. Retrying in ${delayMs}ms...`);
      await new Promise(res => setTimeout(res, delayMs));
    }
  }
}


/**
 * Background ping to warm up backend on page load using public health endpoint
 */
export function pingBackend() {
  const healthUrl = `${API_BASE.replace(/\/+$/, "")}/health`;

  console.log(`[Backend Warmup] Pinging public health check at: ${healthUrl}`);
  fetch(healthUrl, { method: "GET" })
    .then(res => res.json())
    .then(data => console.log("[Backend Warmup] Status:", data.status || "UP"))
    .catch(err => {
      console.log("[Backend Warmup] Primary health check warming up live Render backend...", err.message);
      fetch(`${REMOTE_API_BASE}/health`, { method: "GET" })
        .then(r => r.json())
        .then(d => console.log("[Backend Warmup] Render Status:", d.status || "UP"))
        .catch(() => {});
    });
}
