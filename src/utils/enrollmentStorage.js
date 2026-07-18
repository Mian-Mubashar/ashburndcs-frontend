const STORAGE_KEY = "adcs_enrollment_track";

export const saveEnrollmentTrack = (data) => {
  const existing = getEnrollmentTracks();
  const filtered = existing.filter((e) => e.id !== data.id);
  const updated = [{ ...data, savedAt: Date.now() }, ...filtered].slice(0, 10);
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

/** Pending / approved — still in progress (banner on schedule). */
export const getActiveEnrollmentTracks = () =>
  getEnrollmentTracks().filter((e) => ["pending", "approved"].includes(e.status));

/** Any enrollment that should block re-enroll (includes completed). */
export const getBlockingEnrollmentTracks = () =>
  getEnrollmentTracks().filter((e) =>
    ["pending", "approved", "completed"].includes(e.status)
  );

export const findTrackForCourse = (course, tracks = getBlockingEnrollmentTracks()) => {
  if (!course) return null;
  const courseId = String(course._id || course.id || "");
  const title = (course.title || "").trim().toLowerCase();
  return (
    tracks.find((t) => t.courseId && courseId && String(t.courseId) === courseId) ||
    tracks.find(
      (t) => t.courseTitle && title && t.courseTitle.trim().toLowerCase() === title
    ) ||
    null
  );
};
