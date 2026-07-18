import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuthModal } from "context/AuthModalContext";
import { getAuthToken } from "services/authApi";

const ROUTE_VIEW_MAP = {
  "/login": "login",
  "/register": "signup",
  "/forgot-password": "forgot",
  "/verify-email": "verify-pending",
  "/reset-password": "reset",
};

const goAfterAuth = (navigate, role) => {
  navigate(role === "admin" ? "/admin" : "/dashboard", { replace: true });
};

export default function AuthModalRouteHandler() {
  const location = useLocation();
  const navigate = useNavigate();
  const { openAuthModal, closeAuthModal } = useAuthModal();

  // Other tab verified via email link — close leftover "Verify your email" modal
  useEffect(() => {
    const onStorage = (e) => {
      if (e.key === "token" && e.newValue) {
        closeAuthModal();
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, [closeAuthModal]);

  useEffect(() => {
    // Token verify is handled by VerifyingEmail page — do not open modals
    if (/^\/verify-email\/[^/]+$/.test(location.pathname)) {
      closeAuthModal();
      return;
    }

    const auth = getAuthToken();
    if (auth?.role === "admin" && location.pathname === "/login") {
      navigate("/admin", { replace: true });
      return;
    }

    const view = ROUTE_VIEW_MAP[location.pathname];
    if (!view) return;

    if (auth?.token && (view === "verify-pending" || view === "login" || view === "signup")) {
      goAfterAuth(navigate, auth.role);
      return;
    }

    const token = new URLSearchParams(location.search).get("token");
    const email = location.state?.email || "";

    openAuthModal(view, { token, email });
    navigate("/", { replace: true });
  }, [location.pathname, location.search, location.state, navigate, openAuthModal, closeAuthModal]);

  return null;
}
