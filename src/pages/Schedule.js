import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import AnimationRevealPage from "helpers/AnimationRevealPage";
import Header from "components/headers/light";
import Footer from "components/footers/FiveColumnWithInputForm";
import { enrollmentApi } from "services/enrollmentApi";
import EnrollModal from "components/enrollment/EnrollModal";
import { useNavigate } from "react-router-dom";
import { getAuthToken } from "services/authApi";
import { getActiveEnrollmentTracks, getTrackedEmail, saveEnrollmentTrack } from "utils/enrollmentStorage";

const Page = styled.div`
  min-height: 80vh;
  background: linear-gradient(180deg, #faf5ff 0%, #fff 40%);
`;

const Hero = styled(motion.div)`
  text-align: center;
  padding: 60px 20px 40px;
  max-width: 800px;
  margin: 0 auto;
`;

const HeroTitle = styled.h1`
  font-size: clamp(28px, 4vw, 48px);
  font-weight: 900;
  color: #111827;
  line-height: 1.15;
  margin: 0 0 16px;
  span {
    color: #6415ff;
  }
`;

const HeroText = styled.p`
  color: #6b7280;
  font-size: 16px;
  line-height: 1.7;
  max-width: 600px;
  margin: 0 auto;
`;

const Section = styled.section`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px 50px;
`;

const SectionTitle = styled.h2`
  font-size: 24px;
  font-weight: 800;
  color: #111827;
  margin: 0 0 20px;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 24px;
`;

const Card = styled(motion.div)`
  background: #fff;
  border-radius: 16px;
  padding: 28px;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.06);
  border: 1px solid #f3f4f6;
  display: flex;
  flex-direction: column;
  min-height: 280px;
  transition: box-shadow 0.25s, transform 0.25s;
  &:hover {
    box-shadow: 0 12px 40px rgba(100, 21, 255, 0.12);
    transform: translateY(-4px);
  }
`;

const Badge = styled.span`
  display: inline-block;
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: #6415ff;
  background: rgba(100, 21, 255, 0.1);
  padding: 6px 12px;
  border-radius: 999px;
  margin-bottom: 14px;
  align-self: flex-start;
`;

const CardTitle = styled.h3`
  font-size: 20px;
  font-weight: 800;
  color: #111827;
  margin: 0 0 10px;
`;

const CardDesc = styled.p`
  font-size: 14px;
  color: #6b7280;
  line-height: 1.7;
  flex: 1;
  margin: 0 0 16px;
`;

const Meta = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px 16px;
  font-size: 13px;
  color: #9ca3af;
  margin-bottom: 20px;
`;

const EnrollBtn = styled.button`
  display: block;
  width: 100%;
  margin-top: auto;
  flex-shrink: 0;
  padding: 13px 16px;
  border: none;
  border-radius: 10px;
  background-color: #6415ff;
  background-image: linear-gradient(90deg, #6415ff, #430ce5);
  color: #ffffff;
  font-weight: 700;
  font-size: 14px;
  font-family: inherit;
  line-height: 1.25;
  cursor: pointer;
  appearance: none;
  -webkit-appearance: none;
  transition: transform 0.15s, box-shadow 0.15s;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 8px 20px rgba(100, 21, 255, 0.35);
    color: #ffffff;
    background-color: #430ce5;
    background-image: linear-gradient(90deg, #6415ff, #430ce5);
  }
`;

const DashLink = styled.button`
  margin-top: 20px;
  padding: 12px 28px;
  border: 2px solid #6415ff;
  border-radius: 10px;
  background: transparent;
  color: #6415ff;
  font-weight: 700;
  cursor: pointer;
  &:hover {
    background: #6415ff;
    color: #fff;
  }
`;

const TrackBanner = styled(motion.div)`
  max-width: 800px;
  margin: 0 auto 24px;
  padding: 16px 20px;
  border-radius: 14px;
  background: linear-gradient(90deg, #faf5ff, #eff6ff);
  border: 1px solid #e8d5ff;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  font-size: 14px;
  color: #374151;

  strong {
    color: #6415ff;
  }
`;

const TrackBtn = styled.button`
  padding: 10px 18px;
  border: none;
  border-radius: 10px;
  background: linear-gradient(90deg, #6415ff, #430ce5);
  color: #fff;
  font-weight: 700;
  font-size: 13px;
  cursor: pointer;
  white-space: nowrap;
`;

const EmptyNote = styled.p`
  color: #9ca3af;
  font-size: 15px;
  margin: 0;
`;

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({ opacity: 1, y: 0, transition: { delay: i * 0.08, duration: 0.5 } }),
};

const formatSessionDate = (value) => {
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return "Date TBA";
  return d.toLocaleDateString(undefined, { weekday: "short", month: "short", day: "numeric", year: "numeric" });
};

export default function Schedule() {
  const [courses, setCourses] = useState([]);
  const [schedules, setSchedules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [selectedSessionTitle, setSelectedSessionTitle] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [activeTracks, setActiveTracks] = useState(() => getActiveEnrollmentTracks());
  const navigate = useNavigate();
  const auth = getAuthToken();
  const pendingTrack = activeTracks.find((t) => t.status === "pending");
  const approvedTrack = activeTracks.find((t) => t.status === "approved");

  useEffect(() => {
    Promise.all([enrollmentApi.getCourses(), enrollmentApi.getSchedules()])
      .then(([coursesRes, schedulesRes]) => {
        setCourses(coursesRes.data.courses || []);
        setSchedules(schedulesRes.data.schedules || []);
      })
      .catch(() => {
        setCourses([]);
        setSchedules([]);
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    const email = getTrackedEmail();
    if (!email || auth) return undefined;

    const syncTracks = async () => {
      try {
        const { data } = await enrollmentApi.getEnrollmentsByEmail(email);
        (data.enrollments || []).forEach((e) =>
          saveEnrollmentTrack({
            id: e.id,
            email: e.email,
            fullName: e.fullName,
            courseTitle: e.courseTitle,
            status: e.status,
          })
        );
        setActiveTracks(getActiveEnrollmentTracks());
      } catch {
        /* ignore */
      }
    };

    syncTracks();
    const timer = setInterval(syncTracks, 30000);
    return () => clearInterval(timer);
  }, [auth]);

  const openEnroll = (course, sessionTitle = "") => {
    if (!course?._id) return;
    setSelectedCourse(course);
    setSelectedSessionTitle(sessionTitle);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedCourse(null);
    setSelectedSessionTitle("");
  };

  return (
    <>
      <AnimationRevealPage>
        <Header roundedHeaderButton />
        <Page>
          <Hero initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <HeroTitle>
              Explore Our <span>Training Courses</span>
            </HeroTitle>
            <HeroText>
              Browse available courses and upcoming class sessions. Enroll to start your journey with ADCS Tech
              Solutions.
            </HeroText>
            {!auth && (pendingTrack || approvedTrack) && (
              <TrackBanner initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
                <span>
                  {approvedTrack ? (
                    <>
                      <strong>Approved!</strong> Complete registration for {approvedTrack.courseTitle}.
                    </>
                  ) : (
                    <>
                      You have a <strong>pending</strong> enrollment for {pendingTrack.courseTitle}.
                    </>
                  )}
                </span>
                <TrackBtn type="button" onClick={() => navigate("/my-enrollment")}>
                  Track My Enrollment
                </TrackBtn>
              </TrackBanner>
            )}
            {auth?.role === "student" && (
              <DashLink onClick={() => navigate("/dashboard")}>Go to My Dashboard</DashLink>
            )}
          </Hero>

          {loading ? (
            <p style={{ textAlign: "center", color: "#9ca3af" }}>Loading schedule...</p>
          ) : (
            <>
              <Section>
                <SectionTitle>Upcoming Class Sessions</SectionTitle>
                {schedules.length === 0 ? (
                  <EmptyNote>No class sessions published yet. Check back soon or enroll in a course below.</EmptyNote>
                ) : (
                  <Grid>
                    {schedules.map((session, i) => (
                      <Card
                        key={session._id}
                        custom={i}
                        initial="hidden"
                        animate="visible"
                        variants={cardVariants}
                      >
                        <Badge>{session.course?.category || "Class"}</Badge>
                        <CardTitle>{session.title}</CardTitle>
                        <CardDesc>{session.course?.title}</CardDesc>
                        <Meta>
                          <span>{formatSessionDate(session.date)}</span>
                          <span>
                            {session.startTime} – {session.endTime}
                          </span>
                          <span>Instructor: {session.instructor}</span>
                        </Meta>
                        <EnrollBtn
                          type="button"
                          className="schedule-action-btn"
                          onClick={() => openEnroll(session.course, session.title)}
                        >
                          Enroll Now
                        </EnrollBtn>
                      </Card>
                    ))}
                  </Grid>
                )}
              </Section>

              <Section>
                <SectionTitle>All Training Courses</SectionTitle>
                <Grid>
                  {courses.map((course, i) => (
                    <Card
                      key={course._id}
                      custom={i}
                      initial="hidden"
                      animate="visible"
                      variants={cardVariants}
                    >
                      <Badge>{course.category}</Badge>
                      <CardTitle>{course.title}</CardTitle>
                      <CardDesc>{course.description}</CardDesc>
                      <Meta>
                        <span>{course.duration}</span>
                        <span>•</span>
                        <span>{course.level}</span>
                      </Meta>
                      <EnrollBtn
                        type="button"
                        className="schedule-action-btn"
                        onClick={() => openEnroll(course)}
                      >
                        Enroll Now
                      </EnrollBtn>
                    </Card>
                  ))}
                </Grid>
              </Section>
            </>
          )}
        </Page>
        <Footer />
      </AnimationRevealPage>

      <EnrollModal
        course={selectedCourse}
        sessionTitle={selectedSessionTitle}
        isOpen={modalOpen}
        onClose={closeModal}
      />
    </>
  );
}
