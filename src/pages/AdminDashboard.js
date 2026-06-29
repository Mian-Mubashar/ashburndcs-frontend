import React, { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
} from "recharts";
import { motion } from "framer-motion";
import AdminLayout from "components/admin/AdminLayout";
import { adminApi } from "services/enrollmentApi";
import { Toast } from "helpers/Alert";
import { isValidExternalUrl } from "utils/linkHelpers";
import { getAuthToken } from "services/authApi";
import { ReactComponent as UsersIcon } from "feather-icons/dist/icons/users.svg";
import { ReactComponent as BookIcon } from "feather-icons/dist/icons/book-open.svg";
import { ReactComponent as ClockIcon } from "feather-icons/dist/icons/clock.svg";

const WelcomeBanner = styled.div`
  background: linear-gradient(135deg, #0f172a 0%, #312e81 55%, #6415ff 100%);
  border-radius: 20px;
  padding: 28px 32px;
  color: #fff;
  margin-bottom: 28px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  flex-wrap: wrap;
  box-shadow: 0 12px 40px rgba(100, 21, 255, 0.25);

  h2 {
    margin: 0 0 6px;
    font-size: 26px;
    font-weight: 800;
  }

  p {
    margin: 0;
    opacity: 0.85;
    font-size: 15px;
  }
`;

const BannerStat = styled.div`
  background: rgba(255, 255, 255, 0.12);
  backdrop-filter: blur(8px);
  border-radius: 14px;
  padding: 16px 22px;
  text-align: center;
  min-width: 120px;

  strong {
    display: block;
    font-size: 28px;
    font-weight: 800;
  }

  span {
    font-size: 12px;
    opacity: 0.8;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 18px;
  margin-bottom: 28px;
`;

const StatCard = styled(motion.div)`
  background: #fff;
  border-radius: 16px;
  padding: 22px;
  box-shadow: 0 4px 20px rgba(15, 23, 42, 0.06);
  border: 1px solid #eef1f7;
  display: flex;
  gap: 16px;
  align-items: flex-start;

  .icon {
    width: 48px;
    height: 48px;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: ${(p) => p.$bg || "#ede9fe"};
    color: ${(p) => p.$color || "#6415ff"};
    flex-shrink: 0;

    svg {
      width: 22px;
      height: 22px;
    }
  }

  h3 {
    margin: 0;
    font-size: 28px;
    font-weight: 800;
    color: #0f172a;
    line-height: 1;
  }

  p {
    margin: 6px 0 0;
    font-size: 13px;
    color: #64748b;
    font-weight: 500;
  }

  small {
    display: block;
    margin-top: 4px;
    font-size: 11px;
    color: #10b981;
    font-weight: 600;
  }
`;

const ChartsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;
  margin-bottom: 28px;

  @media (min-width: 1024px) {
    grid-template-columns: 1fr 1fr;
  }
`;

const ChartCard = styled.div`
  background: #fff;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 4px 20px rgba(15, 23, 42, 0.06);
  border: 1px solid #eef1f7;

  h4 {
    margin: 0 0 4px;
    font-size: 16px;
    font-weight: 700;
    color: #0f172a;
  }

  .sub {
    margin: 0 0 20px;
    font-size: 13px;
    color: #94a3b8;
  }
`;

const Panel = styled(motion.div)`
  background: #fff;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 4px 20px rgba(15, 23, 42, 0.06);
  border: 1px solid #eef1f7;
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  border: 1px solid #f1f5f9;
  border-radius: 12px;
  margin-bottom: 10px;
  flex-wrap: wrap;
  gap: 12px;
  transition: background 0.15s;

  &:hover {
    background: #fafbfc;
  }

  strong {
    color: #0f172a;
  }

  small {
    color: #64748b;
  }
`;

const Btn = styled.button`
  padding: 9px 18px;
  border-radius: 10px;
  border: none;
  font-weight: 600;
  font-size: 13px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  min-width: 96px;
  background: ${(p) =>
    p.$danger
      ? "#fee2e2"
      : p.$primary
        ? "linear-gradient(135deg,#6415ff,#430ce5)"
        : p.$edit
          ? "#dbeafe"
          : "#f1f5f9"};
  color: ${(p) =>
    p.$danger ? "#dc2626" : p.$primary ? "#fff" : p.$edit ? "#1d4ed8" : "#475569"};
  transition: opacity 0.2s;

  &:hover:not(:disabled) {
    opacity: 0.88;
  }

  &:disabled {
    opacity: 0.75;
    cursor: not-allowed;
  }
`;

const BtnSpinner = styled.span`
  width: 14px;
  height: 14px;
  border: 2px solid rgba(255, 255, 255, 0.35);
  border-top-color: #fff;
  border-radius: 50%;
  animation: btn-spin 0.7s linear infinite;

  @keyframes btn-spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

const FormTitle = styled.h3`
  margin: 0 0 4px;
  font-size: 16px;
  font-weight: 700;
  color: #0f172a;
`;

const PanelHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  flex-wrap: wrap;
  gap: 12px;

  h3 {
    margin: 0;
    font-size: 18px;
    font-weight: 800;
    color: #0f172a;
  }

  p {
    margin: 4px 0 0;
    font-size: 13px;
    color: #64748b;
  }
`;

const FormActions = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
`;

const ActionGroup = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
`;

const CheckboxRow = styled.label`
  display: flex;
  align-items: flex-start;
  gap: 10px;
  font-size: 13px;
  color: #475569;
  line-height: 1.5;
  cursor: pointer;

  input {
    margin-top: 3px;
    accent-color: #6415ff;
  }
`;

const Form = styled.form`
  display: grid;
  gap: 14px;
  max-width: 560px;
  margin-bottom: 24px;
`;

const Input = styled.input`
  padding: 12px 16px;
  border: 1.5px solid #e2e8f0;
  border-radius: 12px;
  font-size: 14px;
  transition: border-color 0.2s;

  &:focus {
    outline: none;
    border-color: #6415ff;
  }
`;

const Select = styled.select`
  padding: 12px 16px;
  border: 1.5px solid #e2e8f0;
  border-radius: 12px;
  font-size: 14px;
  background: #fff;

  &:focus {
    outline: none;
    border-color: #6415ff;
  }
`;

const FieldLabel = styled.label`
  display: block;
  font-size: 13px;
  font-weight: 600;
  color: #475569;
  margin-bottom: 6px;
`;

const FileHint = styled.p`
  margin: 6px 0 0;
  font-size: 12px;
  color: #64748b;
`;

const ConfirmOverlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 10000;
  background: rgba(15, 23, 42, 0.45);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
`;

const ConfirmModal = styled.div`
  background: #fff;
  border-radius: 16px;
  padding: 28px;
  width: 100%;
  max-width: 420px;
  box-shadow: 0 24px 60px rgba(0, 0, 0, 0.18);
`;

const ConfirmTitle = styled.h3`
  margin: 0 0 8px;
  font-size: 20px;
  font-weight: 800;
  color: #0f172a;
`;

const ConfirmText = styled.p`
  margin: 0 0 24px;
  font-size: 14px;
  color: #64748b;
  line-height: 1.6;
`;

const TimeRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 14px;

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const AssignmentRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 14px;
  align-items: start;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

const TimeField = styled.div`
  label {
    display: block;
    font-size: 13px;
    font-weight: 600;
    color: #475569;
    margin-bottom: 6px;
  }
`;

const Status = styled.span`
  font-size: 11px;
  font-weight: 700;
  padding: 4px 10px;
  border-radius: 999px;
  text-transform: uppercase;
  background: ${(p) =>
    ({ pending: "#fef3c7", approved: "#d1fae5", rejected: "#fee2e2", completed: "#dbeafe" }[p.$s] ||
    "#f3f4f6")};
  color: ${(p) =>
    ({ pending: "#92400e", approved: "#065f46", rejected: "#991b1b", completed: "#1e40af" }[p.$s] ||
    "#374151")};
`;

const EmptyState = styled.p`
  text-align: center;
  color: #94a3b8;
  padding: 40px 20px;
  margin: 0;
`;

const PIE_COLORS = ["#f59e0b", "#10b981", "#ef4444", "#3b82f6"];
const BAR_COLOR = "#6415ff";
const AREA_COLOR = "#7c3aed";

const ENROLLMENT_PAGES = ["pending", "approved", "completed"];

const PAGE_META = {
  dashboard: { title: "Dashboard", subtitle: "Overview of enrollments, courses & activity" },
  pending: { title: "Pending Enrollments", subtitle: "Applications awaiting admin review" },
  approved: { title: "Approved Enrollments", subtitle: "Waiting for student registration" },
  completed: { title: "Completed Enrollments", subtitle: "Students fully enrolled" },
  schedules: { title: "Class Schedules", subtitle: "Create and manage training sessions" },
  materials: { title: "Course Materials", subtitle: "Upload videos, documents & assignments" },
};

const getStatusChartData = (enrollments) => {
  const counts = { Pending: 0, Approved: 0, Rejected: 0, Completed: 0 };
  enrollments.forEach((e) => {
    const key = e.status.charAt(0).toUpperCase() + e.status.slice(1);
    if (counts[key] !== undefined) counts[key]++;
  });
  return Object.entries(counts).map(([name, value]) => ({ name, value }));
};

const getCourseChartData = (enrollments) => {
  const counts = {};
  enrollments.forEach((e) => {
    const title = e.course?.title || "Other";
    counts[title] = (counts[title] || 0) + 1;
  });
  return Object.entries(counts)
    .map(([name, count]) => ({ name: name.length > 18 ? `${name.slice(0, 16)}…` : name, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 6);
};

const getMonthlyChartData = (enrollments) => {
  const months = [];
  const now = new Date();
  for (let i = 5; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    months.push({
      month: d.toLocaleString("default", { month: "short" }),
      count: 0,
      key: `${d.getFullYear()}-${d.getMonth()}`,
    });
  }
  enrollments.forEach((e) => {
    const d = new Date(e.createdAt);
    const key = `${d.getFullYear()}-${d.getMonth()}`;
    const bucket = months.find((m) => m.key === key);
    if (bucket) bucket.count++;
  });
  return months.map(({ month, count }) => ({ month, count }));
};

const toTimeInput = (value) => {
  if (!value) return "";
  const trimmed = String(value).trim();
  if (/^\d{2}:\d{2}$/.test(trimmed)) return trimmed;

  const match = trimmed.match(/^(\d{1,2}):(\d{2})\s*(AM|PM)?$/i);
  if (!match) return "";

  let hours = parseInt(match[1], 10);
  const minutes = match[2];
  const meridiem = match[3]?.toUpperCase();

  if (meridiem === "PM" && hours < 12) hours += 12;
  if (meridiem === "AM" && hours === 12) hours = 0;

  return `${String(hours).padStart(2, "0")}:${minutes}`;
};

const formatTime12h = (time24) => {
  if (!time24) return "";
  const [hStr, mStr] = time24.split(":");
  const hours = parseInt(hStr, 10);
  const minutes = parseInt(mStr, 10);
  if (Number.isNaN(hours) || Number.isNaN(minutes)) return time24;

  const meridiem = hours >= 12 ? "PM" : "AM";
  const hour12 = hours % 12 || 12;
  return `${hour12}:${String(minutes).padStart(2, "0")} ${meridiem}`;
};

export default function AdminDashboard() {
  const [tab, setTab] = useState("dashboard");
  const [stats, setStats] = useState({});
  const [enrollments, setEnrollments] = useState([]);
  const [schedules, setSchedules] = useState([]);
  const [materials, setMaterials] = useState([]);
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState("");
  const [approvingId, setApprovingId] = useState(null);

  const [scheduleForm, setScheduleForm] = useState({
    course: "",
    title: "",
    date: "",
    startTime: "",
    endTime: "",
    instructor: "",
    meetingLink: "",
    repeatWeekly: false,
  });
  const [editingScheduleId, setEditingScheduleId] = useState(null);
  const [showScheduleForm, setShowScheduleForm] = useState(false);
  const [editingMaterialId, setEditingMaterialId] = useState(null);
  const [materialFile, setMaterialFile] = useState(null);
  const [existingMaterialFile, setExistingMaterialFile] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [materialForm, setMaterialForm] = useState({
    course: "",
    title: "",
    type: "video",
    url: "",
    content: "",
  });

  const load = async () => {
    try {
      const [s, e, sch, mat] = await Promise.all([
        adminApi.getStats(),
        adminApi.getEnrollments(),
        adminApi.getSchedules(),
        adminApi.getMaterials(),
      ]);
      setStats(s.data.stats);
      setEnrollments(e.data.enrollments);
      setSchedules(sch.data.schedules);
      setMaterials(mat.data.materials || []);
    } catch {
      Toast({ message: "Admin access required", type: "error" });
      navigate("/");
    }
  };

  useEffect(() => {
    const auth = getAuthToken();
    if (!auth) {
      navigate("/login");
      return;
    }
    if (auth.role !== "admin") {
      navigate("/dashboard");
      return;
    }
    setUserEmail(auth.email || "");
    load();
    import("services/enrollmentApi").then(({ enrollmentApi }) =>
      enrollmentApi.getCourses().then(({ data }) => setCourses(data.courses || []))
    );
  }, [navigate]);

  const statusData = useMemo(() => getStatusChartData(enrollments), [enrollments]);
  const courseData = useMemo(() => getCourseChartData(enrollments), [enrollments]);
  const monthlyData = useMemo(() => getMonthlyChartData(enrollments), [enrollments]);

  const enrollmentTabCounts = useMemo(
    () => ({
      pending: enrollments.filter((e) => e.status === "pending").length,
      approved: enrollments.filter((e) => e.status === "approved").length,
      completed: enrollments.filter((e) => e.status === "completed").length,
    }),
    [enrollments]
  );

  const filteredEnrollments = useMemo(
    () => (ENROLLMENT_PAGES.includes(tab) ? enrollments.filter((e) => e.status === tab) : []),
    [enrollments, tab]
  );

  const renderEnrollmentRow = (en) => (
    <Row key={en._id}>
      <div>
        <strong>{en.fullName}</strong> — {en.course?.title}
        <br />
        <small>{en.email} • {en.phone}</small>
        <br />
        <Status $s={en.status}>{en.status}</Status>
      </div>
      {en.status === "pending" && (
        <div style={{ display: "flex", gap: 8 }}>
          <Btn
            $primary
            type="button"
            disabled={approvingId === en._id}
            onClick={() => approve(en._id)}
          >
            {approvingId === en._id ? (
              <>
                <BtnSpinner />
                Approving...
              </>
            ) : (
              "Approve"
            )}
          </Btn>
          <Btn
            $danger
            type="button"
            disabled={approvingId === en._id}
            onClick={() => reject(en._id)}
          >
            Reject
          </Btn>
        </div>
      )}
      {en.status === "approved" && (
        <Btn $edit type="button" onClick={() => resendEmail(en._id)}>
          Resend Email
        </Btn>
      )}
      {en.status === "completed" && (
        <small style={{ color: "#059669", fontWeight: 600 }}>Fully enrolled</small>
      )}
    </Row>
  );

  const approve = async (id) => {
    setApprovingId(id);
    try {
      const { data } = await adminApi.approveEnrollment(id);
      if (data.emailSent) {
        Toast({ message: data.message, type: "success" });
      } else {
        Toast({ message: data.message, type: "error" });
        if (data.registrationLink) {
          window.prompt("SMTP not configured — copy this link and send to student:", data.registrationLink);
        }
      }
      load();
    } catch (error) {
      Toast({ message: error.response?.data?.error || "Approve failed.", type: "error" });
    } finally {
      setApprovingId(null);
    }
  };

  const resendEmail = async (id) => {
    try {
      const { data } = await adminApi.resendApprovalEmail(id);
      Toast({ message: data.message, type: data.emailSent ? "success" : "error" });
      if (!data.emailSent && data.registrationLink) {
        window.prompt("Copy registration link for student:", data.registrationLink);
      }
    } catch (error) {
      Toast({ message: error.response?.data?.error || "Resend failed.", type: "error" });
    }
  };

  const reject = async (id) => {
    await adminApi.rejectEnrollment(id, "Not accepted at this time");
    Toast({ message: "Enrollment rejected.", type: "info" });
    load();
  };

  const emptyScheduleForm = {
    course: "",
    title: "",
    date: "",
    startTime: "",
    endTime: "",
    instructor: "",
    meetingLink: "",
    repeatWeekly: false,
  };

  const toDateInput = (value) => {
    if (!value) return "";
    const d = new Date(value);
    if (Number.isNaN(d.getTime())) return "";
    return d.toISOString().split("T")[0];
  };

  const resetScheduleForm = () => {
    setEditingScheduleId(null);
    setScheduleForm(emptyScheduleForm);
    setShowScheduleForm(false);
  };

  const openAddSchedule = () => {
    setEditingScheduleId(null);
    setScheduleForm(emptyScheduleForm);
    setShowScheduleForm(true);
  };

  const startEditSchedule = (schedule) => {
    setEditingScheduleId(schedule._id);
    setShowScheduleForm(true);
    setScheduleForm({
      course: schedule.course?._id || schedule.course || "",
      title: schedule.title || "",
      date: toDateInput(schedule.date),
      startTime: toTimeInput(schedule.startTime),
      endTime: toTimeInput(schedule.endTime),
      instructor: schedule.instructor || "",
      meetingLink: schedule.meetingLink || "",
      repeatWeekly: false,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const buildSchedulePayload = () => ({
    ...scheduleForm,
    startTime: formatTime12h(scheduleForm.startTime),
    endTime: formatTime12h(scheduleForm.endTime),
    repeatWeekly: Boolean(scheduleForm.repeatWeekly),
  });

  const addSchedule = async (e) => {
    e.preventDefault();
    const payload = buildSchedulePayload();
    if (editingScheduleId) {
      const { repeatWeekly, ...updatePayload } = payload;
      await adminApi.updateSchedule(editingScheduleId, updatePayload);
      Toast({ message: "Schedule updated!", type: "success" });
      resetScheduleForm();
    } else {
      const { data } = await adminApi.createSchedule(payload);
      Toast({
        message:
          data.message ||
          (data.count > 1
            ? `Created ${data.count} weekly sessions! You can add another date below.`
            : "Schedule created! Pick another date to add more."),
        type: "success",
      });
      setScheduleForm({
        ...emptyScheduleForm,
        course: scheduleForm.course,
        title: scheduleForm.title,
        instructor: scheduleForm.instructor,
        meetingLink: scheduleForm.meetingLink,
      });
      setShowScheduleForm(true);
    }
    load();
  };

  const emptyMaterialForm = {
    course: "",
    title: "",
    type: "video",
    url: "",
    content: "",
  };

  const resetMaterialForm = () => {
    setMaterialForm(emptyMaterialForm);
    setEditingMaterialId(null);
    setMaterialFile(null);
    setExistingMaterialFile(null);
  };

  const startEditMaterial = (material) => {
    setEditingMaterialId(material._id);
    setMaterialForm({
      course: material.course?._id || material.course || "",
      title: material.title || "",
      type: material.type || "video",
      url: material.url || "",
      content: material.content || "",
    });
    setMaterialFile(null);
    setExistingMaterialFile(
      material.fileUrl ? { fileName: material.fileName || "Uploaded file", fileUrl: material.fileUrl } : null
    );
  };

  const handleMaterialTypeChange = (type) => {
    setMaterialForm((prev) => ({
      ...prev,
      type,
      url: type === "document" ? "" : prev.url,
    }));
    if (type === "video") {
      setMaterialFile(null);
      setExistingMaterialFile(null);
    }
  };

  const addMaterial = async (e) => {
    e.preventDefault();
    const { type, url } = materialForm;

    if (type === "video" && !url?.trim()) {
      Toast({ message: "Video URL is required.", type: "error" });
      return;
    }

    if ((type === "video" || type === "assignment") && url?.trim() && !isValidExternalUrl(url)) {
      Toast({
        message: "URL must be a full link starting with https:// (YouTube, Drive, etc.).",
        type: "error",
      });
      return;
    }

    if (type === "document" && !materialFile && !existingMaterialFile?.fileUrl) {
      Toast({ message: "Please upload a document file.", type: "error" });
      return;
    }

    if (type === "assignment" && !url?.trim() && !materialFile && !existingMaterialFile?.fileUrl) {
      Toast({ message: "Add a URL, upload a document, or both.", type: "error" });
      return;
    }

    const payload = {
      ...materialForm,
      url: type === "document" ? "" : materialForm.url,
    };

    try {
      if (editingMaterialId) {
        await adminApi.updateMaterial(editingMaterialId, payload, materialFile);
        Toast({ message: "Material updated!", type: "success" });
        resetMaterialForm();
      } else {
        await adminApi.createMaterial(payload, materialFile);
        Toast({ message: "Material added!", type: "success" });
        setMaterialForm(emptyMaterialForm);
        setMaterialFile(null);
        setExistingMaterialFile(null);
      }
      load();
    } catch (error) {
      Toast({ message: error.response?.data?.error || "Failed to save material.", type: "error" });
    }
  };

  const deleteMaterial = async (id) => {
    await adminApi.deleteMaterial(id);
    Toast({ message: "Material deleted.", type: "info" });
    if (editingMaterialId === id) resetMaterialForm();
    load();
  };

  const deleteSchedule = async (id) => {
    await adminApi.deleteSchedule(id);
    Toast({ message: "Schedule deleted.", type: "info" });
    load();
  };

  const handleConfirmDelete = async () => {
    if (!confirmDelete) return;
    try {
      if (confirmDelete.type === "material") {
        await deleteMaterial(confirmDelete.id);
      } else if (confirmDelete.type === "schedule") {
        await deleteSchedule(confirmDelete.id);
      }
    } catch {
      Toast({ message: "Delete failed.", type: "error" });
    } finally {
      setConfirmDelete(null);
    }
  };

  const meta = PAGE_META[tab] || PAGE_META.dashboard;

  const greeting = () => {
    const h = new Date().getHours();
    if (h < 12) return "Good morning";
    if (h < 17) return "Good afternoon";
    return "Good evening";
  };

  return (
    <AdminLayout
      activeTab={tab}
      onTabChange={setTab}
      enrollmentTabCounts={enrollmentTabCounts}
      title={meta.title}
      subtitle={meta.subtitle}
      userEmail={userEmail}
    >
      {tab === "dashboard" && (
        <>
          <WelcomeBanner>
            <div>
              <h2>{greeting()}, Admin</h2>
              <p>Manage enrollments, schedules, and course materials from one place.</p>
            </div>
            <BannerStat>
              <strong>{stats.pending || 0}</strong>
              <span>Pending Today</span>
            </BannerStat>
          </WelcomeBanner>

          <StatsGrid>
            <StatCard $bg="#fef3c7" $color="#d97706" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
              <div className="icon"><ClockIcon /></div>
              <div>
                <h3>{stats.pending || 0}</h3>
                <p>Pending Enrollments</p>
                <small>Needs review</small>
              </div>
            </StatCard>
            <StatCard $bg="#ede9fe" $color="#6415ff" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}>
              <div className="icon"><UsersIcon /></div>
              <div>
                <h3>{stats.enrollments || 0}</h3>
                <p>Total Enrollments</p>
                <small>All time</small>
              </div>
            </StatCard>
            <StatCard $bg="#dbeafe" $color="#2563eb" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
              <div className="icon"><BookIcon /></div>
              <div>
                <h3>{stats.courses || 0}</h3>
                <p>Active Courses</p>
              </div>
            </StatCard>
            <StatCard $bg="#d1fae5" $color="#059669" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
              <div className="icon"><UsersIcon /></div>
              <div>
                <h3>{stats.students || 0}</h3>
                <p>Registered Students</p>
              </div>
            </StatCard>
          </StatsGrid>

          <ChartsGrid>
            <ChartCard>
              <h4>Enrollment Status</h4>
              <p className="sub">Breakdown by application status</p>
              <ResponsiveContainer width="100%" height={260}>
                <PieChart>
                  <Pie
                    data={statusData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={95}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {statusData.map((_, i) => (
                      <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </ChartCard>

            <ChartCard>
              <h4>Enrollments by Course</h4>
              <p className="sub">Top courses by student interest</p>
              <ResponsiveContainer width="100%" height={260}>
                <BarChart data={courseData} barSize={28}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                  <YAxis allowDecimals={false} tick={{ fontSize: 11 }} />
                  <Tooltip />
                  <Bar dataKey="count" fill={BAR_COLOR} radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </ChartCard>
          </ChartsGrid>

          <ChartCard>
            <h4>Enrollment Trend</h4>
            <p className="sub">New applications over the last 6 months</p>
            <ResponsiveContainer width="100%" height={280}>
              <AreaChart data={monthlyData}>
                <defs>
                  <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={AREA_COLOR} stopOpacity={0.35} />
                    <stop offset="95%" stopColor={AREA_COLOR} stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                <YAxis allowDecimals={false} tick={{ fontSize: 12 }} />
                <Tooltip />
                <Area type="monotone" dataKey="count" stroke={AREA_COLOR} fill="url(#colorCount)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </ChartCard>
        </>
      )}

      {ENROLLMENT_PAGES.includes(tab) && (
        <Panel initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          {filteredEnrollments.length === 0 ? (
            <EmptyState>No {tab} enrollments.</EmptyState>
          ) : (
            filteredEnrollments.map(renderEnrollmentRow)
          )}
        </Panel>
      )}

      {tab === "schedules" && (
        <Panel initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <PanelHeader>
            <div>
              <h3>{showScheduleForm || editingScheduleId ? (editingScheduleId ? "Edit Class Schedule" : "Add New Schedule") : "Class Schedules"}</h3>
              <p>
                {showScheduleForm || editingScheduleId
                  ? "Fill in the details below — new sessions appear in the list underneath."
                  : `${schedules.length} schedule${schedules.length !== 1 ? "s" : ""} published`}
              </p>
            </div>
            {!showScheduleForm && !editingScheduleId && (
              <Btn $primary type="button" onClick={openAddSchedule} style={{ padding: "12px 20px" }}>
                + Add Schedule
              </Btn>
            )}
          </PanelHeader>

          {(showScheduleForm || editingScheduleId) && (
            <>
              {!editingScheduleId && (
                <p style={{ margin: "0 0 16px", fontSize: 13, color: "#64748b" }}>
                  Pick any date — create one session or use repeat weekly for the rest of the month.
                </p>
              )}
              <Form onSubmit={addSchedule}>
                <Select value={scheduleForm.course} onChange={(e) => setScheduleForm({ ...scheduleForm, course: e.target.value })} required>
                  <option value="">Select Course</option>
                  {courses.map((c) => (
                    <option key={c._id} value={c._id}>{c.title}</option>
                  ))}
                </Select>
                <Input placeholder="Class Title" value={scheduleForm.title} onChange={(e) => setScheduleForm({ ...scheduleForm, title: e.target.value })} required />
                <Input type="date" value={scheduleForm.date} onChange={(e) => setScheduleForm({ ...scheduleForm, date: e.target.value })} required />
                <TimeRow>
                  <TimeField>
                    <label htmlFor="start-time">Start Time</label>
                    <Input
                      id="start-time"
                      type="time"
                      value={scheduleForm.startTime}
                      onChange={(e) => setScheduleForm({ ...scheduleForm, startTime: e.target.value })}
                      required
                    />
                  </TimeField>
                  <TimeField>
                    <label htmlFor="end-time">End Time</label>
                    <Input
                      id="end-time"
                      type="time"
                      value={scheduleForm.endTime}
                      onChange={(e) => setScheduleForm({ ...scheduleForm, endTime: e.target.value })}
                      required
                    />
                  </TimeField>
                </TimeRow>
                <Input placeholder="Instructor" value={scheduleForm.instructor} onChange={(e) => setScheduleForm({ ...scheduleForm, instructor: e.target.value })} required />
                <Input placeholder="Meeting Link" value={scheduleForm.meetingLink} onChange={(e) => setScheduleForm({ ...scheduleForm, meetingLink: e.target.value })} />
                {!editingScheduleId && (
                  <CheckboxRow>
                    <input
                      type="checkbox"
                      checked={scheduleForm.repeatWeekly}
                      onChange={(e) => setScheduleForm({ ...scheduleForm, repeatWeekly: e.target.checked })}
                    />
                    <span>
                      Repeat every week on the same day &amp; time for the rest of this month
                      (e.g. every Monday 10 AM until month end)
                    </span>
                  </CheckboxRow>
                )}
                <FormActions>
                  <Btn $primary type="submit" style={{ padding: "14px 24px" }}>
                    {editingScheduleId ? "Update Class" : "Create Class"}
                  </Btn>
                  <Btn type="button" onClick={resetScheduleForm} style={{ padding: "14px 24px" }}>
                    Cancel
                  </Btn>
                </FormActions>
              </Form>
            </>
          )}

          {schedules.length === 0 && !showScheduleForm && !editingScheduleId ? (
            <EmptyState>
              No schedules yet.{" "}
              <Btn $primary type="button" onClick={openAddSchedule} style={{ marginTop: 12 }}>
                + Add Schedule
              </Btn>
            </EmptyState>
          ) : schedules.length > 0 ? (
            <>
              {(showScheduleForm || editingScheduleId) && (
                <FormTitle style={{ marginTop: 28, marginBottom: 12 }}>All Class Sessions</FormTitle>
              )}
              {schedules.map((s) => (
                <Row key={s._id}>
                  <div>
                    <strong>{s.title}</strong> — {s.course?.title}
                    <br />
                    <small>
                      {new Date(s.date).toLocaleDateString()} • {s.startTime}-{s.endTime} • {s.instructor}
                    </small>
                  </div>
                  <ActionGroup>
                    <Btn $edit type="button" onClick={() => startEditSchedule(s)}>Edit</Btn>
                    <Btn
                      $danger
                      type="button"
                      onClick={() =>
                        setConfirmDelete({ type: "schedule", id: s._id, label: s.title })
                      }
                    >
                      Delete
                    </Btn>
                  </ActionGroup>
                </Row>
              ))}
            </>
          ) : null}
        </Panel>
      )}

      {tab === "materials" && (
        <Panel initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <FormTitle>{editingMaterialId ? "Edit Material" : "Add New Material"}</FormTitle>
          <p style={{ margin: "0 0 16px", fontSize: 13, color: "#64748b", lineHeight: 1.6 }}>
            Only students enrolled in the selected course will see this material on their dashboard.
          </p>
          <Form onSubmit={addMaterial}>
            <Select value={materialForm.course} onChange={(e) => setMaterialForm({ ...materialForm, course: e.target.value })} required>
              <option value="">Select Course</option>
              {courses.map((c) => (
                <option key={c._id} value={c._id}>{c.title}</option>
              ))}
            </Select>
            <Input placeholder="Material Title" value={materialForm.title} onChange={(e) => setMaterialForm({ ...materialForm, title: e.target.value })} required />
            <Select
              value={materialForm.type}
              onChange={(e) => handleMaterialTypeChange(e.target.value)}
            >
              <option value="video">Video</option>
              <option value="document">Document</option>
              <option value="assignment">Assignment</option>
            </Select>

            {materialForm.type === "video" && (
              <div>
                <FieldLabel htmlFor="material-video-url">Video URL *</FieldLabel>
                <Input
                  id="material-video-url"
                  type="url"
                  placeholder="https://youtube.com/... or https://drive.google.com/..."
                  value={materialForm.url}
                  onChange={(e) => setMaterialForm({ ...materialForm, url: e.target.value })}
                  required
                />
              </div>
            )}

            {materialForm.type === "document" && (
              <div>
                <FieldLabel htmlFor="material-document-file">Upload Document *</FieldLabel>
                <Input
                  id="material-document-file"
                  type="file"
                  accept=".pdf,.doc,.docx,.txt,.png,.jpg,.jpeg"
                  onChange={(e) => setMaterialFile(e.target.files?.[0] || null)}
                />
                <FileHint>PDF, DOC, DOCX, TXT, or image (max 15MB)</FileHint>
                {existingMaterialFile && !materialFile && (
                  <FileHint>Current file: {existingMaterialFile.fileName}</FileHint>
                )}
                {materialFile && <FileHint>Selected: {materialFile.name}</FileHint>}
              </div>
            )}

            {materialForm.type === "assignment" && (
              <>
                <AssignmentRow>
                  <div>
                    <FieldLabel htmlFor="material-assignment-url">Assignment URL (optional)</FieldLabel>
                    <Input
                      id="material-assignment-url"
                      type="url"
                      placeholder="https://forms.google.com/..."
                      value={materialForm.url}
                      onChange={(e) => setMaterialForm({ ...materialForm, url: e.target.value })}
                    />
                  </div>
                  <div>
                    <FieldLabel htmlFor="material-assignment-file">Upload Document (optional)</FieldLabel>
                    <Input
                      id="material-assignment-file"
                      type="file"
                      accept=".pdf,.doc,.docx,.txt,.png,.jpg,.jpeg"
                      onChange={(e) => setMaterialFile(e.target.files?.[0] || null)}
                    />
                  </div>
                </AssignmentRow>
                <FileHint>Add a link, a file, or both</FileHint>
                {existingMaterialFile && !materialFile && (
                  <FileHint>Current file: {existingMaterialFile.fileName}</FileHint>
                )}
                {materialFile && <FileHint>Selected: {materialFile.name}</FileHint>}
              </>
            )}

            <Input placeholder="Content / Description" value={materialForm.content} onChange={(e) => setMaterialForm({ ...materialForm, content: e.target.value })} />
            <FormActions>
              <Btn $primary type="submit" style={{ padding: "14px 24px" }}>
                {editingMaterialId ? "Update Material" : "Add Material"}
              </Btn>
              {editingMaterialId && (
                <Btn type="button" onClick={resetMaterialForm} style={{ padding: "14px 24px" }}>
                  Cancel
                </Btn>
              )}
            </FormActions>
          </Form>
          {materials.length === 0 ? (
            <EmptyState>No materials added yet.</EmptyState>
          ) : (
            materials.map((m) => (
              <Row key={m._id}>
                <div>
                  <strong>{m.title}</strong> — {m.course?.title || "Course"}
                  <br />
                  <small>
                    {m.type}
                    {m.url ? ` • ${m.url}` : ""}
                    {m.fileName ? ` • File: ${m.fileName}` : ""}
                  </small>
                  {m.content && (
                    <>
                      <br />
                      <small>{m.content}</small>
                    </>
                  )}
                </div>
                <ActionGroup>
                  <Btn $edit type="button" onClick={() => startEditMaterial(m)}>Edit</Btn>
                  <Btn
                    $danger
                    type="button"
                    onClick={() =>
                      setConfirmDelete({ type: "material", id: m._id, label: m.title })
                    }
                  >
                    Delete
                  </Btn>
                </ActionGroup>
              </Row>
            ))
          )}
        </Panel>
      )}

      {confirmDelete && (
        <ConfirmOverlay onClick={() => setConfirmDelete(null)}>
          <ConfirmModal onClick={(e) => e.stopPropagation()}>
            <ConfirmTitle>
              Delete {confirmDelete.type === "material" ? "Material" : "Schedule"}?
            </ConfirmTitle>
            <ConfirmText>
              Are you sure you want to delete <strong>{confirmDelete.label}</strong>? This cannot
              be undone.
            </ConfirmText>
            <FormActions>
              <Btn type="button" onClick={() => setConfirmDelete(null)}>
                Cancel
              </Btn>
              <Btn $danger type="button" onClick={handleConfirmDelete}>
                Yes, Delete
              </Btn>
            </FormActions>
          </ConfirmModal>
        </ConfirmOverlay>
      )}
    </AdminLayout>
  );
}
