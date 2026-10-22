/** API root from REACT_APP_BACKEND_URL. Always ends with a single trailing slash. */
export const getApiBaseUrl = () => {
  // If running in browser on localhost or 127.0.0.1, always target local backend
  if (
    typeof window !== "undefined" &&
    (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1")
  ) {
    return "http://localhost:5000/";
  }

  const raw = String(process.env.REACT_APP_BACKEND_URL || "").trim();
  if (!raw) {
    return "https://api.ashburndcs.com/";
  }
  return raw.replace(/\/?$/, "/");
};

export const apiUrl = (path = "") => {
  const base = getApiBaseUrl();
  const suffix = String(path).replace(/^\//, "");
  return `${base}${suffix}`;
};

