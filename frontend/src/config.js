// Smart API_BASE resolution:
// - Local Dev (npm run dev): http://localhost:5000/api (unless VITE_FORCE_REMOTE is set)
// - Production (Vercel): VITE_API_URL or Render live API
export const API_BASE = (import.meta.env.DEV && !import.meta.env.VITE_FORCE_REMOTE)
  ? "http://localhost:5000/api"
  : (import.meta.env.VITE_API_URL || "https://food-express-landing-page-h9ph.onrender.com/api");

export const AUTH_API_BASE = `${API_BASE}/auth`;
