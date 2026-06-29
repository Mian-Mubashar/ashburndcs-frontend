import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { ReactComponent as CloseIcon } from "feather-icons/dist/icons/x.svg";
import { ReactComponent as CheckIcon } from "feather-icons/dist/icons/check-circle.svg";
import { ReactComponent as ClockIcon } from "feather-icons/dist/icons/clock.svg";
import { Toast } from "helpers/Alert";
import { enrollmentApi } from "services/enrollmentApi";
import { saveEnrollmentTrack } from "utils/enrollmentStorage";

const Overlay = styled(motion.div)`
  position: fixed;
  inset: 0;
  z-index: 10000000;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
`;

const Modal = styled(motion.div)`
  background: #fff;
  border-radius: 16px;
  width: 100%;
  max-width: 520px;
  max-height: 90vh;
  overflow-y: auto;
  padding: 28px;
  box-shadow: 0 24px 60px rgba(0, 0, 0, 0.2);
  position: relative;
`;

const CloseBtn = styled.button`
  position: absolute;
  top: 16px;
  right: 16px;
  border: none;
  background: #f3f4f6;
  border-radius: 50%;
  width: 32px;
  height: 32px;
  cursor: pointer;
  display: grid;
  place-items: center;
`;

const Title = styled.h2`
  font-size: 22px;
  font-weight: 800;
  color: #111827;
  margin: 0 0 4px;
`;

const Subtitle = styled.p`
  color: #6415ff;
  font-weight: 600;
  font-size: 14px;
  margin: 0 0 20px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 14px;
`;

const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const Label = styled.label`
  font-size: 13px;
  font-weight: 600;
  color: #374151;
`;

const Input = styled.input`
  padding: 12px 14px;
  border: 1.5px solid #e8d5ff;
  border-radius: 10px;
  font-size: 14px;
  outline: none;
  &:focus {
    border-color: #6415ff;
    box-shadow: 0 0 0 3px rgba(100, 21, 255, 0.12);
  }
`;

const Textarea = styled.textarea`
  padding: 12px 14px;
  border: 1.5px solid #e8d5ff;
  border-radius: 10px;
  font-size: 14px;
  min-height: 80px;
  resize: vertical;
  outline: none;
  &:focus {
    border-color: #6415ff;
  }
`;

const SubmitBtn = styled.button`
  padding: 14px;
  border: none;
  border-radius: 10px;
  background: linear-gradient(90deg, #6415ff, #430ce5);
  color: #fff;
  font-weight: 700;
  font-size: 15px;
  cursor: pointer;
  margin-top: 4px;
  transition: transform 0.15s, box-shadow 0.15s;
  &:hover:not(:disabled) {
    transform: translateY(-1px);
    box-shadow: 0 8px 20px rgba(100, 21, 255, 0.35);
  }
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const StatusBadge = styled.span`
  display: inline-block;
  padding: 8px 16px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 800;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  background: ${(p) =>
    ({
      pending: "#fef3c7",
      approved: "#d1fae5",
      rejected: "#fee2e2",
      completed: "#dbeafe",
    }[p.$status] || "#f3f4f6")};
  color: ${(p) =>
    ({
      pending: "#92400e",
      approved: "#065f46",
      rejected: "#991b1b",
      completed: "#1e40af",
    }[p.$status] || "#374151")};
`;

const Steps = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0;
  margin: 24px 0;
`;

const Step = styled.div`
  display: flex;
  gap: 14px;
  align-items: flex-start;
  position: relative;
  padding-bottom: ${(p) => (p.$last ? "0" : "20px")};

  &:not(:last-child)::after {
    content: "";
    position: absolute;
    left: 15px;
    top: 32px;
    bottom: 4px;
    width: 2px;
    background: ${(p) => (p.$done ? "#6415ff" : "#e5e7eb")};
  }
`;

const StepIcon = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  flex-shrink: 0;
  display: grid;
  place-items: center;
  background: ${(p) => (p.$active ? "linear-gradient(135deg,#6415ff,#430ce5)" : p.$done ? "#6415ff" : "#f3f4f6")};
  color: ${(p) => (p.$active || p.$done ? "#fff" : "#9ca3af")};
  font-size: 13px;
  font-weight: 700;

  svg {
    width: 16px;
    height: 16px;
  }
`;

const StepBody = styled.div`
  flex: 1;
  padding-top: 4px;

  strong {
    display: block;
    font-size: 14px;
    color: #111827;
    margin-bottom: 2px;
  }

  span {
    font-size: 12px;
    color: #6b7280;
  }
`;

const SuccessHeader = styled.div`
  text-align: center;
  margin-bottom: 8px;

  svg.main-icon {
    color: #16a34a;
    width: 52px;
    height: 52px;
    margin-bottom: 12px;
  }

  h3 {
    font-size: 20px;
    font-weight: 800;
    color: #111827;
    margin: 0 0 8px;
  }

  p {
    color: #6b7280;
    font-size: 14px;
    line-height: 1.6;
    margin: 0;
  }
`;

const InfoBox = styled.div`
  background: #faf5ff;
  border: 1px solid #e8d5ff;
  border-radius: 12px;
  padding: 14px 16px;
  font-size: 13px;
  color: #4b5563;
  line-height: 1.6;
  margin-top: 16px;
`;

const RefreshBtn = styled.button`
  margin-top: 12px;
  padding: 10px 16px;
  border: 1px solid #e5e7eb;
  border-radius: 10px;
  background: #fff;
  color: #374151;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  width: 100%;

  &:hover {
    background: #f9fafb;
  }
`;

const initialForm = { fullName: "", email: "", phone: "", education: "", message: "" };

const STATUS_STEPS = [
  { key: "submitted", label: "Application Submitted", desc: "Your form was received" },
  { key: "pending", label: "Pending Review", desc: "Admin is reviewing your request" },
  { key: "approved", label: "Approved", desc: "Check email to complete registration" },
  { key: "completed", label: "Enrolled", desc: "Full access to student dashboard" },
];

const stepIndex = (status) => {
  if (status === "pending") return 1;
  if (status === "approved") return 2;
  if (status === "completed") return 3;
  if (status === "rejected") return 1;
  return 0;
};

export default function EnrollModal({ course, isOpen, onClose, sessionTitle }) {
  const navigate = useNavigate();
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [enrollment, setEnrollment] = useState(null);
  const [status, setStatus] = useState("pending");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  useEffect(() => {
    if (!isOpen) {
      setForm(initialForm);
      setEnrollment(null);
      setStatus("pending");
    }
  }, [isOpen]);

  const persistTrack = (track, nextStatus) => {
    saveEnrollmentTrack({
      id: track.id,
      email: track.email,
      fullName: track.fullName,
      courseTitle: track.courseTitle,
      status: nextStatus,
    });
  };

  useEffect(() => {
    if (!enrollment?.id) return undefined;

    const poll = async () => {
      try {
        const { data } = await enrollmentApi.getEnrollmentStatus(enrollment.id);
        if (data.enrollment?.status) {
          setStatus(data.enrollment.status);
          persistTrack(enrollment, data.enrollment.status);
        }
      } catch {
        /* ignore poll errors */
      }
    };

    poll();
    const timer = setInterval(poll, 15000);
    return () => clearInterval(timer);
  }, [enrollment?.id]);

  if (!mounted || !isOpen || !course) return null;

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await enrollmentApi.submitEnrollment({
        ...form,
        courseId: course._id,
        message: sessionTitle
          ? `${form.message ? `${form.message}\n\n` : ""}Interested in class: ${sessionTitle}`
          : form.message,
      });
      setEnrollment({
        id: data.enrollmentId,
        courseTitle: data.courseTitle,
        fullName: data.fullName,
        email: data.email,
      });
      const nextStatus = data.status || "pending";
      setStatus(nextStatus);
      saveEnrollmentTrack({
        id: data.enrollmentId,
        email: data.email,
        fullName: data.fullName,
        courseTitle: data.courseTitle,
        status: nextStatus,
      });
      Toast({ message: data.message, type: "success" });
    } catch (error) {
      Toast({
        message: error.response?.data?.error || "Enrollment failed. Please try again.",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const refreshStatus = async () => {
    if (!enrollment?.id) return;
    try {
      const { data } = await enrollmentApi.getEnrollmentStatus(enrollment.id);
      const nextStatus = data.enrollment?.status || status;
      setStatus(nextStatus);
      persistTrack(enrollment, nextStatus);
      Toast({ message: "Status updated.", type: "info" });
    } catch {
      Toast({ message: "Could not refresh status.", type: "error" });
    }
  };

  const currentStep = stepIndex(status);
  const isRejected = status === "rejected";

  return createPortal(
    <AnimatePresence>
      <Overlay initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}>
        <Modal
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          onClick={(e) => e.stopPropagation()}
        >
          <CloseBtn type="button" onClick={onClose} aria-label="Close">
            <CloseIcon style={{ width: 18, height: 18 }} />
          </CloseBtn>

          {enrollment ? (
            <>
              <SuccessHeader>
                <CheckIcon className="main-icon" />
                <h3>You&apos;re Enrolled!</h3>
                <p>
                  <strong>{enrollment.fullName}</strong> — {enrollment.courseTitle}
                </p>
                <div style={{ marginTop: 14 }}>
                  <StatusBadge $status={status}>
                    {isRejected ? "Rejected" : status}
                  </StatusBadge>
                </div>
              </SuccessHeader>

              <Steps>
                {STATUS_STEPS.map((step, i) => {
                  const done = i < currentStep || (i === currentStep && status === "completed");
                  const active = i === currentStep && status !== "completed" && !isRejected;
                  return (
                    <Step key={step.key} $done={done} $last={i === STATUS_STEPS.length - 1}>
                      <StepIcon $done={done} $active={active}>
                        {done ? <CheckIcon /> : i + 1}
                      </StepIcon>
                      <StepBody>
                        <strong>{step.label}</strong>
                        <span>{step.desc}</span>
                      </StepBody>
                    </Step>
                  );
                })}
              </Steps>

              {status === "pending" && (
                <InfoBox>
                  <ClockIcon style={{ width: 14, height: 14, display: "inline", marginRight: 6 }} />
                  Your enrollment is <strong>Pending</strong>. Admin will review it soon. You can close this and
                  check anytime on <strong>My Enrollment</strong>.
                </InfoBox>
              )}

              {status === "approved" && (
                <InfoBox style={{ background: "#ecfdf5", borderColor: "#a7f3d0" }}>
                  <strong style={{ color: "#065f46" }}>Approved!</strong> Check your email (
                  {enrollment.email}) for the registration link to set your password.
                </InfoBox>
              )}

              {status === "completed" && (
                <InfoBox style={{ background: "#eff6ff", borderColor: "#bfdbfe" }}>
                  Registration complete. You can now access your student dashboard.
                </InfoBox>
              )}

              {isRejected && (
                <InfoBox style={{ background: "#fef2f2", borderColor: "#fecaca" }}>
                  Your application was not approved. Contact ADCS for more information.
                </InfoBox>
              )}

              <RefreshBtn type="button" onClick={refreshStatus}>
                Refresh Status
              </RefreshBtn>
              <SubmitBtn
                type="button"
                onClick={() => {
                  onClose();
                  navigate("/my-enrollment");
                }}
                style={{ marginTop: 12 }}
              >
                Track My Enrollment
              </SubmitBtn>
              <RefreshBtn type="button" onClick={onClose} style={{ marginTop: 8 }}>
                Close
              </RefreshBtn>
            </>
          ) : (
            <>
              <Title>Enroll Now</Title>
              <Subtitle>{sessionTitle || course.title}</Subtitle>
              <Form onSubmit={handleSubmit}>
                <Field>
                  <Label>Full Name *</Label>
                  <Input name="fullName" value={form.fullName} onChange={handleChange} placeholder="John Doe" required />
                </Field>
                <Field>
                  <Label>Email *</Label>
                  <Input type="email" name="email" value={form.email} onChange={handleChange} placeholder="john@email.com" required />
                </Field>
                <Field>
                  <Label>Phone Number *</Label>
                  <Input name="phone" value={form.phone} onChange={handleChange} placeholder="+1 (555) 000-0000" required />
                </Field>
                <Field>
                  <Label>Education *</Label>
                  <Input name="education" value={form.education} onChange={handleChange} placeholder="High School / Bachelor's / etc." required />
                </Field>
                <Field>
                  <Label>Selected Course</Label>
                  <Input value={course.title} disabled style={{ background: "#f9fafb" }} />
                </Field>
                <Field>
                  <Label>Message (Optional)</Label>
                  <Textarea name="message" value={form.message} onChange={handleChange} placeholder="Any questions or notes..." />
                </Field>
                <SubmitBtn type="submit" disabled={loading}>
                  {loading ? "Submitting..." : "Submit Enrollment"}
                </SubmitBtn>
              </Form>
            </>
          )}
        </Modal>
      </Overlay>
    </AnimatePresence>,
    document.body
  );
}
