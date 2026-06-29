import axios from "axios";

const API_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:5000/";

const authClient = axios.create({
  baseURL: `${API_URL}api/auth`,
  headers: { "Content-Type": "application/json" },
});

export const authApi = {
  register: (data) => authClient.post("/register", data),
  login: (data) => authClient.post("/login", data),
  verifyEmail: (token) => authClient.get(`/verify-email/${token}`),
  resendVerification: (email) => authClient.post("/resend-verification", { email }),
  forgotPassword: (email) => authClient.post("/forgot-password", { email }),
  resetPassword: (data) => authClient.post("/reset-password", data),
};

const decodeJwtPayload = (token) => {
  try {
    const base64 = token.split(".")[1].replace(/-/g, "+").replace(/_/g, "/");
    return JSON.parse(atob(base64));
  } catch {
    return {};
  }
};

export const saveAuthToken = (token, email, role = "student") => {
  window.localStorage.setItem("token", JSON.stringify({ token, email, role }));
};

export const getAuthToken = () => {
  const stored = window.localStorage.getItem("token");
  if (!stored) return null;

  try {
    const parsed = JSON.parse(stored);

    if (parsed?.token) {
      return {
        token: parsed.token,
        email: parsed.email || "",
        role: parsed.role || "student",
      };
    }

    // Legacy Firebase user object — clear invalid session
    if (parsed?.email && !parsed?.token) {
      clearAuthToken();
      return null;
    }

    return null;
  } catch {
    // Raw JWT string saved directly (legacy)
    if (stored.startsWith("eyJ")) {
      const payload = decodeJwtPayload(stored);
      const session = {
        token: stored,
        email: payload.email || "",
        role: payload.role || "student",
      };
      saveAuthToken(session.token, session.email, session.role);
      return session;
    }

    clearAuthToken();
    return null;
  }
};

export const clearAuthToken = () => {
  window.localStorage.removeItem("token");
};

export const isLoggedIn = () => Boolean(getAuthToken()?.token);
