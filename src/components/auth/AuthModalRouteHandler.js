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

export default function AuthModalRouteHandler() {
  const location = useLocation();
  const navigate = useNavigate();
  const { openAuthModal } = useAuthModal();

  useEffect(() => {
    const auth = getAuthToken();
    if (auth?.role === "admin" && location.pathname === "/login") {
      navigate("/admin", { replace: true });
      return;
    }

    const pathToken = location.pathname.match(/^\/verify-email\/([^/]+)$/)?.[1];
    if (pathToken) {
      openAuthModal("verify-pending", { token: pathToken });
      navigate("/", { replace: true });
      return;
    }

    const view = ROUTE_VIEW_MAP[location.pathname];
    if (!view) return;

    const token = new URLSearchParams(location.search).get("token");
    const email = location.state?.email || "";

    openAuthModal(view, { token, email });
    navigate("/", { replace: true });
  }, [location.pathname, location.search, location.state, navigate, openAuthModal]);

  return null;
}
