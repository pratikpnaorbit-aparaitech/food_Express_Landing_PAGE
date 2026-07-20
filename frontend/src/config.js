export const API_BASE = import.meta.env.VITE_API_URL || (import.meta.env.DEV
  ? "http://localhost:5000/api"
  : "/api");

export const AUTH_API_BASE = `${API_BASE}/auth`;
