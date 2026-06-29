import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import AnimationRevealPage from "helpers/AnimationRevealPage";
import Header from "components/headers/light";
import Footer from "components/footers/FiveColumnWithInputForm";
import { enrollmentApi } from "services/enrollmentApi";
import { getAuthToken } from "services/authApi";
import { getTrackedEmail, saveEnrollmentTrack } from "utils/enrollmentStorage";
import { Toast } from "helpers/Alert";

const Page = styled.div`
  max-width: 720px;
  margin: 0 auto;
  padding: 40px 20px 80px;
`;

const Title = styled.h1`
  font-size: 32px;
  font-weight: 900;
  color: #111827;
  margin: 0 0 8px;
`;

const Sub = styled.p`
  color: #6b7280;
  margin: 0 0 28px;
  line-height: 1.6;
`;

const SearchBox = styled.form`
  display: flex;
  gap: 10px;
  margin-bottom: 28px;
  flex-wrap: wrap;

  input {
    flex: 1;
    min-width: 200px;
    padding: 12px 16px;
    border: 1.5px solid #e8d5ff;
    border-radius: 12px;
    font-size: 14px;
    &:focus {
      outline: none;
      border-color: #6415ff;
    }
  }
`;

const Btn = styled.button`
  padding: 12px 20px;
  border: none;
  border-radius: 12px;
  font-weight: 700;
  font-size: 14px;
  cursor: pointer;
  background: ${(p) => (p.$outline ? "#fff" : "linear-gradient(90deg,#6415ff,#430ce5)")};
  color: ${(p) => (p.$outline ? "#6415ff" : "#fff")};
  border: ${(p) => (p.$outline ? "2px solid #6415ff" : "none")};
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const Card = styled(motion.div)`
  background: #fff;
  border-radius: 16px;
  padding: 24px;
  margin-bottom: 16px;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.06);
  border: 1px solid #f3f4f6;
`;

const StatusBadge = styled.span`
  display: inline-block;
  padding: 6px 14px;
  border-radius: 999px;
  font-size: 11px;
  font-weight: 800;
  text-transform: uppercase;
  margin-bottom: 12px;
  background: ${(p) =>
    ({ pending: "#fef3c7", approved: "#d1fae5", rejected: "#fee2e2", completed: "#dbeafe" }[p.$s] ||
    "#f3f4f6")};
  color: ${(p) =>
    ({ pending: "#92400e", approved: "#065f46", rejected: "#991b1b", completed: "#1e40af" }[p.$s] ||
    "#374151")};
`;

const Steps = styled.div`
  margin: 16px 0;
  padding: 16px;
  background: #faf5ff;
  border-radius: 12px;
  font-size: 13px;
  color: #4b5563;
  line-height: 1.8;

  strong {
    color: #111827;
  }
`;

const ActionRow = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  margin-top: 16px;
`;

const Empty = styled.p`
  text-align: center;
  color: #9ca3af;
  padding: 40px 0;
`;

const STATUS_HELP = {
  pending: "Waiting for admin to review your application. Check back here anytime — no need to enroll again.",
  approved: "You're approved! Click below to get the registration link by email, then set your password.",
  completed: "All done! Log in and open your Student Dashboard.",
  rejected: "This application was not approved. Contact ADCS for help.",
};

export default function MyEnrollment() {
  const [email, setEmail] = useState(getTrackedEmail());
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sending, setSending] = useState(null);
  const navigate = useNavigate();
  const auth = getAuthToken();

  const load = useCallback(async (lookupEmail) => {
    if (!lookupEmail?.trim()) return;
    setLoading(true);
    try {
      const { data } = await enrollmentApi.getEnrollmentsByEmail(lookupEmail.trim());
      const list = data.enrollments || [];
      setEnrollments(list);
      list.forEach((e) =>
        saveEnrollmentTrack({
          id: e.id,
          email: e.email,
          fullName: e.fullName,
          courseTitle: e.courseTitle,
          status: e.status,
        })
      );
    } catch {
      Toast({ message: "Could not load enrollments.", type: "error" });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (email) load(email);
  }, [email, load]);

  useEffect(() => {
    const hasPendingOrApproved = enrollments.some((e) => ["pending", "approved"].includes(e.status));
    if (!hasPendingOrApproved) return undefined;
    const timer = setInterval(() => load(email), 20000);
    return () => clearInterval(timer);
  }, [enrollments, email, load]);

  const handleSearch = (e) => {
    e.preventDefault();
    load(email);
  };

  const requestLink = async (enrollment) => {
    setSending(enrollment.id);
    try {
      const { data } = await enrollmentApi.requestRegistrationLink({
        email: enrollment.email,
        enrollmentId: enrollment.id,
      });
      Toast({ message: data.message, type: data.emailSent !== false ? "success" : "error" });
      if (data.status === "completed") {
        navigate(auth ? "/dashboard" : "/login");
      }
      load(email);
    } catch (error) {
      Toast({ message: error.response?.data?.error || "Failed to send link.", type: "error" });
    } finally {
      setSending(null);
    }
  };

  return (
    <AnimationRevealPage>
      <Header roundedHeaderButton />
      <Page>
        <Title>My Enrollment</Title>
        <Sub>
          Enrolled but left the page? No problem — enter your email here anytime to check status.
          When admin approves, come back here to get your registration link.
        </Sub>

        <SearchBox onSubmit={handleSearch}>
          <input
            type="email"
            placeholder="Enter your enrollment email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Btn type="submit" disabled={loading}>
            {loading ? "Loading..." : "Check Status"}
          </Btn>
        </SearchBox>

        {enrollments.length === 0 && !loading && (
          <Empty>
            No enrollments found for this email.{" "}
            <Btn $outline type="button" style={{ marginTop: 16 }} onClick={() => navigate("/schedule")}>
              Browse Courses
            </Btn>
          </Empty>
        )}

        {enrollments.map((en) => (
          <Card key={en.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <StatusBadge $s={en.status}>{en.status}</StatusBadge>
            <h3 style={{ margin: "0 0 6px", fontSize: 18 }}>{en.courseTitle}</h3>
            <p style={{ margin: 0, color: "#6b7280", fontSize: 14 }}>
              {en.fullName} • {en.email}
            </p>
            <p style={{ margin: "6px 0 0", color: "#9ca3af", fontSize: 12 }}>
              Applied: {new Date(en.createdAt).toLocaleString()}
            </p>

            <Steps>
              <strong>What&apos;s next?</strong>
              <br />
              {STATUS_HELP[en.status]}
            </Steps>

            <ActionRow>
              {en.status === "pending" && (
                <Btn $outline type="button" onClick={() => load(email)}>
                  Refresh Status
                </Btn>
              )}
              {en.status === "approved" && (
                <>
                  <Btn type="button" disabled={sending === en.id} onClick={() => requestLink(en)}>
                    {sending === en.id ? "Sending..." : "Send Registration Link to Email"}
                  </Btn>
                  <Btn $outline type="button" onClick={() => navigate("/complete-enrollment")}>
                    I Have the Link — Complete Registration
                  </Btn>
                </>
              )}
              {en.status === "completed" && (
                <Btn type="button" onClick={() => navigate(auth ? "/dashboard" : "/login")}>
                  Go to Dashboard
                </Btn>
              )}
            </ActionRow>
          </Card>
        ))}
      </Page>
      <Footer />
    </AnimationRevealPage>
  );
}
