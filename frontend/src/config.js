export const REMOTE_API_BASE = "https://food-delivery-fqqo.onrender.com/api";

/**
 * Ensures the API base URL always ends with '/api' and has no trailing slashes.
 */
export function normalizeApiUrl(rawUrl) {
  if (!rawUrl) return REMOTE_API_BASE;
  let cleaned = rawUrl.trim().replace(/\/+$/, "");
  if (!cleaned.endsWith("/api")) {
    cleaned += "/api";
  }
  return cleaned;
}

// Smart API_BASE resolution:
// - In DEV mode (npm run dev): http://localhost:5000/api (unless VITE_FORCE_REMOTE is set)
// - In PROD mode (Vercel): VITE_API_URL or fallback to live Render backend
export const API_BASE = (import.meta.env.DEV && !import.meta.env.VITE_FORCE_REMOTE)
  ? "http://localhost:5000/api"
  : normalizeApiUrl(import.meta.env.VITE_API_URL);

export const AUTH_API_BASE = `${API_BASE}/auth`;
