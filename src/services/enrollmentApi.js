import axios from "axios";
import { getAuthToken } from "./authApi";

const API_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:5000/";

const client = axios.create({ baseURL: `${API_URL}api` });

const adminClient = axios.create({ baseURL: `${API_URL}api/admin` });

const authHeader = () => {
  const auth = getAuthToken();
  return auth?.token ? { Authorization: `Bearer ${auth.token}` } : {};
};

client.interceptors.request.use((config) => {
  const headers = authHeader();
  config.headers = { ...config.headers, ...headers };
  return config;
});

adminClient.interceptors.request.use((config) => {
  const headers = authHeader();
  config.headers = { ...config.headers, ...headers };
  return config;
});

export const enrollmentApi = {
  getCourses: () => client.get("/courses"),
  getSchedules: () => client.get("/schedules"),
  submitEnrollment: (data) => client.post("/enrollments", data),
  getEnrollmentStatus: (id) => client.get(`/enrollments/status/${id}`),
  getEnrollmentsByEmail: (email) => client.get("/enrollments/by-email", { params: { email } }),
  requestRegistrationLink: (data) => client.post("/enrollments/request-link", data),
  completeRegistration: (data) => client.post("/enrollments/complete-registration", data),
  getDashboard: () => client.get("/student/dashboard"),
};

const buildMaterialFormData = (data, file) => {
  const formData = new FormData();
  Object.entries(data).forEach(([key, value]) => {
    if (value !== undefined && value !== null) formData.append(key, value);
  });
  if (file) formData.append("file", file);
  return formData;
};

export const adminApi = {
  getStats: () => adminClient.get("/stats"),
  getEnrollments: () => adminClient.get("/enrollments"),
  approveEnrollment: (id) => adminClient.patch(`/enrollments/${id}/approve`),
  resendApprovalEmail: (id) => adminClient.post(`/enrollments/${id}/resend-email`),
  rejectEnrollment: (id, adminNote) => adminClient.patch(`/enrollments/${id}/reject`, { adminNote }),
  createCourse: (data) => adminClient.post("/courses", data),
  updateCourse: (id, data) => adminClient.put(`/courses/${id}`, data),
  deleteCourse: (id) => adminClient.delete(`/courses/${id}`),
  getSchedules: () => adminClient.get("/schedules"),
  createSchedule: (data) => adminClient.post("/schedules", data),
  updateSchedule: (id, data) => adminClient.put(`/schedules/${id}`, data),
  deleteSchedule: (id) => adminClient.delete(`/schedules/${id}`),
  createMaterial: (data, file) => adminClient.post("/materials", buildMaterialFormData(data, file)),
  getMaterials: () => adminClient.get("/materials"),
  updateMaterial: (id, data, file) => adminClient.put(`/materials/${id}`, buildMaterialFormData(data, file)),
  deleteMaterial: (id) => adminClient.delete(`/materials/${id}`),
};
