import React from "react";
import { useNavigate } from "react-router-dom";
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import Header from "components/headers/light.js";
import Footer from "components/footers/MiniCenteredFooter";

const IMG = {
  hero: "/images/training/facility-front-door.jpg?v=1",
  facility: "/images/training/tech-lab.jpg?v=6",
  labs: "/images/training/server-hardware.jpg?v=6",
};

const STATS = [
  { value: "8", label: "Weeks to job-ready skills" },
  { value: "Sterling, VA", label: "Training in the DC corridor" },
  { value: "Real hardware", label: "Labs on live equipment" },
];

const PILLARS = [
  {
    title: "Instructors who work the floor",
    body: "You learn from technicians who rack, cable, and troubleshoot servers for a living, not from a slide deck alone. Classroom instruction is paired with lab time every week.",
  },
  {
    title: "Hardware first, then systems",
    body: "We start with server hardware, BIOS, RAID, and physical infrastructure, then move into Linux, networking, and remote management (IPMI). That order matches how data centers actually hire.",
  },
  {
    title: "Built for working adults",
    body: "Wednesday evenings plus weekend mornings and afternoon labs. You do not need prior IT experience. We teach fundamentals first, then push into production skills.",
  },
  {
    title: "Small cohorts, serious practice",
    body: "Limited class size means more time on the hardware and direct feedback from your instructor. Theory without rack time does not get you hired.",
  },
];

const SKILLS = [
  "Server hardware & teardown",
  "BIOS / UEFI & RAID",
  "Racking, cabling & RJ45",
  "Linux & Windows Server",
  "Networking & IPMI",
  "Power, PDU & diagnostics",
];

export default () => {
  const navigate = useNavigate();

  return (
    <AnimationRevealPage>
      <Header />
      <main className="about">
        {/* Hero */}
        <section className="about-hero">
          <div className="about-hero-copy">
            <p className="eyebrow">Ashburn Data Center Solutions</p>
            <h1>
              We build data center technicians,{" "}
              <span className="accent">not spectators.</span>
            </h1>
            <p className="lede">
              In Sterling, VA, ADCS runs an 8-week Server Support BootCamp for people who want
              real floor skills: hardware, cabling, BIOS and RAID, Linux, networking, and remote
              server management. Data centers hire people who have touched the equipment. That is
              who we train.
            </p>
            <div className="btn-row">
              <button type="button" className="btn-dark" onClick={() => navigate("/course-outline")}>
                View Course Outline
              </button>
              <button type="button" className="btn-ghost" onClick={() => navigate("/schedule")}>
                See Schedule &amp; Enroll
              </button>
            </div>
          </div>
          <div className="about-hero-media">
            <img
              src={IMG.hero}
              alt="ADCS Suite 102 training facility entrance in Sterling, VA"
            />
          </div>
        </section>

        {/* Mission band */}
        <section className="mission-band">
          <p className="mission-label">Our mission</p>
          <h2>
            Close the gap between “I studied IT” and “I can work a live rack.”
          </h2>
          <p>
            Northern Virginia’s data center corridor needs technicians who can install, cable,
            configure, and troubleshoot under real conditions. We designed the BootCamp around that
            demand, with classroom clarity plus mandatory lab hours on real hardware at our Sterling facility.
          </p>
        </section>

        {/* Stats */}
        <section className="about-stats" aria-label="Program highlights">
          {STATS.map((stat) => (
            <div className="stat" key={stat.label}>
              <p className="stat-value">{stat.value}</p>
              <p className="stat-label">{stat.label}</p>
            </div>
          ))}
        </section>

        {/* Pillars */}
        <section className="pillars">
          <div className="section-head">
            <p className="eyebrow">Why ADCS</p>
            <h2>Training that mirrors the job</h2>
            <p className="section-sub">
              Every part of the program is built for one outcome: you leave ready to support
              servers in a production environment.
            </p>
          </div>
          <div className="pillars-grid">
            {PILLARS.map((item) => (
              <article className="pillar" key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </article>
            ))}
          </div>
        </section>

        {/* Facility + skills */}
        <section className="facility">
          <div className="facility-media">
            <img
              src={IMG.facility}
              alt="High-density network cabling and switch gear used in ADCS labs"
            />
          </div>
          <div className="facility-copy">
            <p className="eyebrow">The lab</p>
            <h2>Practice where the work happens</h2>
            <p>
              Classes and labs meet at{" "}
              <strong>22648 Glenn Dr, Suite 102, Sterling, VA 20164</strong>. You train on
              physical servers, switches, and cabling, not simulations alone. Racking, drive installs,
              BIOS work, OS installs, and IPMI are part of the weekly rhythm.
            </p>
            <ul className="skill-list">
              {SKILLS.map((skill) => (
                <li key={skill}>{skill}</li>
              ))}
            </ul>
            <button type="button" className="btn-dark" onClick={() => navigate("/registration")}>
              Start Registration
            </button>
          </div>
        </section>

        {/* Secondary visual strip */}
        <section className="visual-strip">
          <img
            src={IMG.labs}
            alt="Server storage hardware and status indicators in a data center environment"
          />
          <div className="visual-strip-copy">
            <h2>From first cable to remote management</h2>
            <p>
              Week by week you move from foundations (cabling, racks, power) into hardware deep dives,
              storage and RAID, firmware, operating systems, networking, and remote troubleshooting.
              The schedule is published. The expectations are clear.
            </p>
            <button type="button" className="btn-light" onClick={() => navigate("/schedule")}>
              Open Full Schedule
            </button>
          </div>
        </section>

        {/* Team: strong, no fake names */}
        <section className="team">
          <div className="section-head">
            <p className="eyebrow">Instructors</p>
            <h2>Led by working technicians</h2>
            <p className="section-sub">
              Your instructors bring floor experience from live data center environments into every
              class and lab. Detailed headshots and bios will be published here as the next cohort
              materials are finalized.
            </p>
          </div>
          <div className="team-note">
            <p>
              Want to meet the team before you enroll? Call{" "}
              <a href="tel:+15715313630">(571) 531-3630</a> or reach us on the contact page. We are
              happy to walk you through the program and the facility.
            </p>
            <button type="button" className="btn-ghost" onClick={() => navigate("/contact-us")}>
              Contact Us
            </button>
          </div>
        </section>

        {/* Closing CTA */}
        <section className="about-cta">
          <h2>Ready to train for the floor?</h2>
          <p>
            Review the outline, check the next cohort dates, and reserve your seat. If you have
            questions about fit or schedule, talk to us before you enroll.
          </p>
          <div className="btn-row center">
            <button type="button" className="btn-dark" onClick={() => navigate("/course-outline")}>
              Course Outline &amp; FAQ
            </button>
            <button type="button" className="btn-ghost-on-dark" onClick={() => navigate("/schedule")}>
              Schedule &amp; Enroll
            </button>
          </div>
        </section>
      </main>
      <Footer />

      <style>{`
        .about {
          --navy: #0f1c2e;
          --ink: #1a202c;
          --muted: #4a5568;
          --line: #e2e8f0;
          --gold: #c9a227;
          --bg-soft: #f7fafc;
          color: var(--ink);
        }

        .about-hero {
          max-width: 1180px;
          margin: 0 auto;
          padding: 56px 20px 48px;
          display: grid;
          grid-template-columns: 1.05fr 0.95fr;
          gap: 48px;
          align-items: center;
        }

        .eyebrow {
          display: inline-block;
          margin: 0 0 14px;
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #243e63;
          background: rgba(36, 62, 99, 0.08);
          padding: 6px 12px;
          border-radius: 999px;
        }

        .about-hero-copy h1 {
          margin: 0 0 18px;
          font-size: clamp(1.85rem, 3.2vw, 2.75rem);
          line-height: 1.15;
          font-weight: 900;
          color: var(--navy);
          letter-spacing: -0.02em;
        }

        .about-hero-copy .accent {
          color: #6415ff;
        }

        .lede {
          margin: 0 0 28px;
          font-size: 1.05rem;
          line-height: 1.75;
          color: var(--muted);
          max-width: 36rem;
        }

        .btn-row {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
        }

        .btn-row.center {
          justify-content: center;
        }

        .btn-dark,
        .btn-ghost,
        .btn-light,
        .btn-ghost-on-dark {
          font-size: 0.875rem;
          font-weight: 700;
          letter-spacing: 0.02em;
          padding: 14px 22px;
          border-radius: 8px;
          cursor: pointer;
          transition: background 0.2s, border-color 0.2s, color 0.2s;
        }

        .btn-dark {
          background: var(--ink);
          color: #fff;
          border: none;
        }

        .btn-dark:hover {
          background: #2d3748;
        }

        .btn-ghost {
          background: #fff;
          color: var(--ink);
          border: 2px solid var(--line);
        }

        .btn-ghost:hover {
          border-color: #243e63;
        }

        .btn-light {
          background: #fff;
          color: var(--ink);
          border: none;
        }

        .btn-light:hover {
          background: #edf2f7;
        }

        .btn-ghost-on-dark {
          background: transparent;
          color: #fff;
          border: 2px solid rgba(255, 255, 255, 0.35);
        }

        .btn-ghost-on-dark:hover {
          border-color: #fff;
        }

        .about-hero-media img {
          width: 100%;
          aspect-ratio: 4 / 3;
          object-fit: cover;
          object-position: center 35%;
          border-radius: 16px;
          box-shadow: 0 28px 56px rgba(15, 28, 46, 0.18);
          display: block;
        }

        .mission-band {
          max-width: 820px;
          margin: 0 auto 40px;
          padding: 0 20px 8px;
          text-align: center;
        }

        .mission-label {
          margin: 0 0 10px;
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--gold);
        }

        .mission-band h2 {
          margin: 0 0 16px;
          font-size: clamp(1.35rem, 2.4vw, 1.85rem);
          line-height: 1.3;
          font-weight: 800;
          color: var(--navy);
        }

        .mission-band p {
          margin: 0;
          font-size: 1rem;
          line-height: 1.75;
          color: var(--muted);
        }

        .about-stats {
          max-width: 1180px;
          margin: 0 auto 64px;
          padding: 28px 20px;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
          border-top: 1px solid var(--line);
          border-bottom: 1px solid var(--line);
        }

        .stat {
          text-align: center;
          padding: 8px 12px;
        }

        .stat-value {
          margin: 0 0 6px;
          font-size: 1.55rem;
          font-weight: 900;
          color: var(--navy);
          letter-spacing: -0.02em;
        }

        .stat-label {
          margin: 0;
          font-size: 0.8125rem;
          font-weight: 600;
          color: var(--muted);
          line-height: 1.4;
        }

        .pillars {
          max-width: 1180px;
          margin: 0 auto 72px;
          padding: 0 20px;
        }

        .section-head {
          max-width: 640px;
          margin: 0 auto 36px;
          text-align: center;
        }

        .section-head h2 {
          margin: 0 0 12px;
          font-size: clamp(1.5rem, 2.5vw, 2rem);
          font-weight: 900;
          color: var(--navy);
          letter-spacing: -0.02em;
        }

        .section-sub {
          margin: 0;
          font-size: 1rem;
          line-height: 1.7;
          color: var(--muted);
        }

        .pillars-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 20px;
        }

        .pillar {
          padding: 28px 26px;
          background: var(--bg-soft);
          border-left: 3px solid var(--gold);
          border-radius: 0 12px 12px 0;
        }

        .pillar h3 {
          margin: 0 0 10px;
          font-size: 1.05rem;
          font-weight: 800;
          color: var(--navy);
        }

        .pillar p {
          margin: 0;
          font-size: 0.9375rem;
          line-height: 1.7;
          color: var(--muted);
        }

        .facility {
          max-width: 1180px;
          margin: 0 auto 72px;
          padding: 0 20px;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 48px;
          align-items: center;
        }

        .facility-media img {
          width: 100%;
          aspect-ratio: 1;
          object-fit: cover;
          border-radius: 16px;
          box-shadow: 0 20px 40px rgba(15, 28, 46, 0.14);
          display: block;
        }

        .facility-copy h2 {
          margin: 0 0 14px;
          font-size: clamp(1.4rem, 2.2vw, 1.85rem);
          font-weight: 900;
          color: var(--navy);
          letter-spacing: -0.02em;
        }

        .facility-copy > p {
          margin: 0 0 20px;
          font-size: 1rem;
          line-height: 1.75;
          color: var(--muted);
        }

        .facility-copy strong {
          color: var(--ink);
        }

        .skill-list {
          list-style: none;
          margin: 0 0 28px;
          padding: 0;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px 16px;
        }

        .skill-list li {
          position: relative;
          padding-left: 18px;
          font-size: 0.875rem;
          font-weight: 600;
          color: var(--ink);
        }

        .skill-list li::before {
          content: "";
          position: absolute;
          left: 0;
          top: 0.45em;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: var(--gold);
        }

        .visual-strip {
          position: relative;
          max-width: 1180px;
          margin: 0 auto 72px;
          padding: 0 20px;
        }

        .visual-strip img {
          width: 100%;
          height: 340px;
          object-fit: cover;
          border-radius: 16px;
          display: block;
          filter: brightness(0.72);
        }

        .visual-strip-copy {
          position: absolute;
          left: 44px;
          right: 44px;
          bottom: 36px;
          max-width: 520px;
          color: #fff;
        }

        .visual-strip-copy h2 {
          margin: 0 0 10px;
          font-size: clamp(1.35rem, 2.2vw, 1.75rem);
          font-weight: 900;
          letter-spacing: -0.02em;
        }

        .visual-strip-copy p {
          margin: 0 0 18px;
          font-size: 0.95rem;
          line-height: 1.65;
          color: rgba(255, 255, 255, 0.9);
        }

        .team {
          max-width: 720px;
          margin: 0 auto 64px;
          padding: 0 20px;
        }

        .team-note {
          margin-top: 8px;
          padding: 28px 28px 24px;
          background: var(--bg-soft);
          border-radius: 12px;
          text-align: center;
        }

        .team-note p {
          margin: 0 0 18px;
          font-size: 0.975rem;
          line-height: 1.7;
          color: var(--muted);
        }

        .team-note a {
          color: #6415ff;
          font-weight: 700;
          text-decoration: none;
        }

        .team-note a:hover {
          text-decoration: underline;
        }

        .about-cta {
          max-width: 1180px;
          margin: 0 auto 48px;
          padding: 48px 28px;
          background: linear-gradient(135deg, #0f1c2e 0%, #1a365d 100%);
          border-radius: 16px;
          text-align: center;
          color: #fff;
        }

        .about-cta h2 {
          margin: 0 0 12px;
          font-size: clamp(1.4rem, 2.4vw, 1.85rem);
          font-weight: 900;
          letter-spacing: -0.02em;
        }

        .about-cta > p {
          margin: 0 auto 24px;
          max-width: 34rem;
          font-size: 1rem;
          line-height: 1.7;
          color: rgba(255, 255, 255, 0.85);
        }

        @media (max-width: 900px) {
          .about-hero,
          .facility {
            grid-template-columns: 1fr;
            gap: 32px;
          }

          .about-hero-media {
            order: -1;
          }

          .about-stats {
            grid-template-columns: 1fr;
            gap: 20px;
          }

          .pillars-grid {
            grid-template-columns: 1fr;
          }

          .skill-list {
            grid-template-columns: 1fr;
          }

          .visual-strip img {
            height: 420px;
          }

          .visual-strip-copy {
            left: 36px;
            right: 36px;
            bottom: 28px;
          }
        }

        @media (max-width: 560px) {
          .about-hero {
            padding-top: 36px;
          }

          .visual-strip img {
            height: 460px;
          }

          .about-cta {
            margin-left: 20px;
            margin-right: 20px;
            padding: 36px 20px;
          }
        }
      `}</style>
    </AnimationRevealPage>
  );
};
