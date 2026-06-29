/** Returns a safe external URL or null if the value is not a valid link. */
export const getSafeExternalUrl = (url) => {
  if (!url?.trim()) return null;

  const trimmed = url.trim();

  if (/^https?:\/\//i.test(trimmed)) return trimmed;
  if (trimmed.startsWith("//")) return `https:${trimmed}`;

  // Allow domain-style links without protocol (no spaces)
  if (!trimmed.includes(" ") && /^[\w.-]+\.[a-z]{2,}/i.test(trimmed)) {
    return `https://${trimmed}`;
  }

  return null;
};

export const isValidExternalUrl = (url) => Boolean(getSafeExternalUrl(url));

const API_BASE = (process.env.REACT_APP_BACKEND_URL || "http://localhost:5000/").replace(/\/$/, "");

export const getBackendAssetUrl = (path) => {
  if (!path?.trim()) return null;
  if (/^https?:\/\//i.test(path)) return path;
  return `${API_BASE}${path.startsWith("/") ? path : `/${path}`}`;
};
