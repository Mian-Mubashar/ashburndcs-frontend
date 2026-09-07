/** API root from REACT_APP_BACKEND_URL. Always ends with a single trailing slash. */
export const getApiBaseUrl = () => {
  const raw = String(process.env.REACT_APP_BACKEND_URL || "").trim();
  if (!raw) {
    console.warn("REACT_APP_BACKEND_URL is not set");
    return "";
  }
  return raw.replace(/\/?$/, "/");
};

export const apiUrl = (path = "") => {
  const base = getApiBaseUrl();
  const suffix = String(path).replace(/^\//, "");
  return `${base}${suffix}`;
};
