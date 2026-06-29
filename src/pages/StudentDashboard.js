import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import AnimationRevealPage from "helpers/AnimationRevealPage";
import Header from "components/headers/light";
import Footer from "components/footers/MiniCenteredFooter";
import { enrollmentApi } from "services/enrollmentApi";
import { useNavigate } from "react-router-dom";
import { getAuthToken } from "services/authApi";
import { getSafeExternalUrl, getBackendAssetUrl } from "utils/linkHelpers";

const Page = styled.div`max-width: 1100px; margin: 0 auto; padding: 40px 20px 60px;`;
const Title = styled.h1`font-size: 32px; font-weight: 900; color: #111827; margin: 0 0 8px;`;
const Sub = styled.p`color: #6b7280; margin: 0 0 32px;`;

const Tabs = styled.div`display: flex; gap: 8px; margin-bottom: 28px; flex-wrap: wrap;`;
const Tab = styled.button`
  padding: 10px 20px; border-radius: 10px; border: none; font-weight: 600; font-size: 14px; cursor: pointer;
  background: ${(p) => (p.$active ? "linear-gradient(90deg,#6415ff,#430ce5)" : "#f3f4f6")};
  color: ${(p) => (p.$active ? "#fff" : "#374151")};
  transition: all 0.2s;
`;

const Panel = styled(motion.div)`
  background: #fff; border-radius: 16px; padding: 24px;
  box-shadow: 0 4px 24px rgba(0,0,0,0.06); border: 1px solid #f3f4f6;
`;

const Item = styled.div`
  padding: 16px; border-radius: 12px; border: 1px solid #f3f4f6; margin-bottom: 12px;
  transition: box-shadow 0.2s;
  &:hover { box-shadow: 0 4px 16px rgba(100,21,255,0.08); }
  h4 { margin: 0 0 6px; font-size: 16px; font-weight: 700; color: #111827; }
  p { margin: 0; font-size: 13px; color: #6b7280; line-height: 1.6; }
`;

const StatusBadge = styled.span`
  display: inline-block; font-size: 11px; font-weight: 700; padding: 4px 10px;
  border-radius: 999px; margin-bottom: 8px; text-transform: uppercase;
  background: ${(p) =>
    ({ pending: "#fef3c7", approved: "#d1fae5", rejected: "#fee2e2", completed: "#dbeafe" }[p.$s] || "#f3f4f6")};
  color: ${(p) =>
    ({ pending: "#92400e", approved: "#065f46", rejected: "#991b1b", completed: "#1e40af" }[p.$s] || "#374151")};
`;

const Badge = styled.span`
  display: inline-block; font-size: 11px; font-weight: 700; padding: 4px 10px;
  border-radius: 999px; margin-bottom: 8px;
  background: ${(p) => (p.$unread ? "rgba(100,21,255,0.12)" : "#f3f4f6")};
  color: ${(p) => (p.$unread ? "#6415ff" : "#9ca3af")};
`;

const LinkBtn = styled.a`
  display: inline-block; margin-top: 8px; color: #6415ff; font-weight: 600; font-size: 13px;
  text-decoration: none; &:hover { text-decoration: underline; }
`;

const Empty = styled.p`text-align: center; color: #9ca3af; padding: 40px 0;`;

export default function StudentDashboard() {
  const [tab, setTab] = useState("applications");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const auth = getAuthToken();
    if (!auth) { navigate("/schedule"); return; }
    if (auth.role === "admin") { navigate("/admin", { replace: true }); return; }

    enrollmentApi.getDashboard()
      .then(({ data: d }) => setData(d))
      .catch(() => navigate("/schedule"))
      .finally(() => setLoading(false));
  }, [navigate]);

  if (loading) return <AnimationRevealPage><Header /><Page><Empty>Loading dashboard...</Empty></Page></AnimationRevealPage>;
  if (!data) return null;

  return (
    <AnimationRevealPage>
      <Header />
      <Page>
        <Title>Student Dashboard</Title>
        <Sub>
          Welcome back,{" "}
          {data.user?.name ||
            data.applications?.find((app) => app.fullName)?.fullName ||
            data.user?.email}
        </Sub>

        <Tabs>
          {["applications", "courses", "schedule", "materials", "notifications"].map((t) => (
            <Tab key={t} $active={tab === t} onClick={() => setTab(t)}>
              {t === "applications" ? "My Enrollments" : t.charAt(0).toUpperCase() + t.slice(1)}
            </Tab>
          ))}
        </Tabs>

        <Panel key={tab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          {tab === "applications" && (
            data.applications?.length ? data.applications.map((app) => (
              <Item key={app._id}>
                <StatusBadge $s={app.status}>{app.status}</StatusBadge>
                <h4>{app.course?.title}</h4>
                <p>Applied: {new Date(app.createdAt).toLocaleDateString()}</p>
                {app.status === "pending" && <p>Waiting for admin approval...</p>}
                {app.status === "approved" && <p>Approved! Check your email to complete registration.</p>}
                {app.status === "completed" && <p>You are fully enrolled in this course.</p>}
                {app.status === "rejected" && <p>Application was not approved.</p>}
              </Item>
            )) : <Empty>No enrollment applications yet. <LinkBtn href="/schedule">Browse courses</LinkBtn></Empty>
          )}

          {tab === "courses" && (
            data.courses?.length ? data.courses.map((c) => (
              <Item key={c._id}><h4>{c.title}</h4><p>{c.description}</p></Item>
            )) : <Empty>No enrolled courses yet.</Empty>
          )}

          {tab === "schedule" && (
            data.schedules?.length ? data.schedules.map((s) => (
              <Item key={s._id}>
                <h4>{s.title}</h4>
                <p>{s.course?.title}</p>
                <p>{new Date(s.date).toLocaleDateString()} • {s.startTime} - {s.endTime}</p>
                <p>Instructor: {s.instructor}</p>
                {s.meetingLink && getSafeExternalUrl(s.meetingLink) && (
                  <LinkBtn href={getSafeExternalUrl(s.meetingLink)} target="_blank" rel="noreferrer">
                    Join Meeting
                  </LinkBtn>
                )}
              </Item>
            )) : <Empty>No scheduled classes yet.</Empty>
          )}

          {tab === "materials" && (
            data.materials?.length ? data.materials.map((m) => (
              <Item key={m._id}>
                <Badge>{m.type}</Badge>
                <h4>{m.title}</h4>
                {m.course?.title && <p style={{ marginBottom: 6 }}>Course: {m.course.title}</p>}
                {(() => {
                  const materialUrl = getSafeExternalUrl(m.url);
                  const fileUrl = getBackendAssetUrl(m.fileUrl);
                  return (
                    <>
                      {materialUrl && (
                        <LinkBtn href={materialUrl} target="_blank" rel="noreferrer">
                          Open {m.type === "video" ? "video" : "link"}
                        </LinkBtn>
                      )}
                      {fileUrl && (
                        <LinkBtn href={fileUrl} target="_blank" rel="noreferrer" style={{ marginLeft: materialUrl ? 12 : 0 }}>
                          Download {m.fileName || "document"}
                        </LinkBtn>
                      )}
                      {m.url && !materialUrl && (
                        <p style={{ fontSize: 13, color: "#9ca3af", margin: "8px 0 0" }}>
                          Link not available — ask admin for a valid URL (must start with https://)
                        </p>
                      )}
                    </>
                  );
                })()}
                {m.content && <p>{m.content}</p>}
              </Item>
            )) : (
              <Empty>
                No materials for your enrolled course{data.courses?.length !== 1 ? "s" : ""} yet.
                {data.courses?.length > 0 && (
                  <>
                    <br />
                    <span style={{ fontSize: 13, marginTop: 8, display: "inline-block" }}>
                      Enrolled in: {data.courses.map((c) => c.title).join(", ")}
                    </span>
                  </>
                )}
              </Empty>
            )
          )}

          {tab === "notifications" && (
            data.notifications?.length ? data.notifications.map((n) => (
              <Item key={n._id}>
                <Badge $unread={!n.read}>{n.type}</Badge>
                <h4>{n.title}</h4>
                <p>{n.message}</p>
                <p style={{ fontSize: 11, marginTop: 6 }}>{new Date(n.createdAt).toLocaleString()}</p>
              </Item>
            )) : <Empty>No notifications.</Empty>
          )}
        </Panel>
      </Page>
      <Footer />
    </AnimationRevealPage>
  );
}
