const STORAGE_KEY = "adcs_enrollment_track";

export const saveEnrollmentTrack = (data) => {
  const existing = getEnrollmentTracks();
  const filtered = existing.filter((e) => e.id !== data.id);
  const updated = [{ ...data, savedAt: Date.now() }, ...filtered].slice(0, 5);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  if (data.email) {
    localStorage.setItem("adcs_student_email", data.email);
  }
};

export const getEnrollmentTracks = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

export const getTrackedEmail = () => localStorage.getItem("adcs_student_email") || "";

export const getActiveEnrollmentTracks = () =>
  getEnrollmentTracks().filter((e) => ["pending", "approved"].includes(e.status));
