/** API root from env. Always ends with a single trailing slash. */
export const getApiBaseUrl = () => {
  const raw = String(process.env.REACT_APP_BACKEND_URL || "").trim();
  if (raw) {
    return raw.replace(/\/?$/, "/");
  }
  if (process.env.NODE_ENV !== "production") {
    return "http://localhost:5000/";
  }
  // Live: same origin so Hostinger can proxy /api → Node (no :5000)
  return "/";
};

export const apiUrl = (path = "") => {
  const base = getApiBaseUrl();
  const suffix = String(path).replace(/^\//, "");
  return `${base}${suffix}`;
};
