import React from "react";
import { useNavigate } from "react-router-dom";
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import Header from "components/headers/light.js";
import Footer from "components/footers/MiniCenteredFooter";
import teamIllustration from "images/team-illustration-2.svg";
import serverIllustration from "images/server-illustration.svg";
import ShieldIconImage from "images/shield-icon.svg";
import SupportIconImage from "images/support-icon.svg";
import ReliableIconImage from "images/reliable-icon.svg";
import CustomizeIconImage from "images/customize-icon.svg";

const PLACEHOLDER_TEAM = [
  { name: "Instructor Name", role: "Lead Instructor" },
  { name: "Instructor Name", role: "Instructor" },
  { name: "Team Member Name", role: "Program Coordinator" },
];

const VALUES = [
  {
    icon: ShieldIconImage,
    title: "Taught by Real Technicians",
    description:
      "Our Server Support BootCamp is taught by working data center technicians. You get classroom lessons plus hands-on lab time in a real training facility.",
  },
  {
    icon: SupportIconImage,
    title: "Small Classes, Real Support",
    description:
      "You get direct instructor support for the full 8-week program, with plenty of lab time to practice on real server hardware.",
  },
  {
    icon: CustomizeIconImage,
    title: "Server Hardware Fundamentals",
    description:
      "We start from the basics. Server hardware, BIOS configuration, and RAID setup are the core skills data centers look for when hiring.",
  },
  {
    icon: ReliableIconImage,
    title: "Built for Career Changers",
    description:
      "No prior IT experience needed. The BootCamp starts from the fundamentals and builds up to job-ready data center technician skills.",
  },
];

const STATS = [
  { value: "8", label: "Week Program" },
  { value: "1:1", label: "Instructor Support" },
  { value: "100%", label: "Hands-On Labs" },
];

export default () => {
  const navigate = useNavigate();

  return (
    <AnimationRevealPage>
      <Header />
      <main className="about-page">
        {/* Intro / mission */}
        <section className="about-hero">
          <div className="about-hero-text">
            <p className="eyebrow">About Ashburn Data Center Solutions</p>
            <h1>We train data center technicians in Sterling, VA.</h1>
            <p className="lede">
              We run a hands-on Server Support BootCamp that takes you from server hardware
              basics to job-ready data center skills. You get classroom lessons plus real lab
              time on real equipment. We built this program because data centers need
              technicians who have actually worked with the hardware, not just read about it.
            </p>
            <button type="button" className="btn-primary" onClick={() => navigate("/course-outline")}>
              See the Course Outline
            </button>
          </div>
          <div className="about-hero-illustration">
            <img src={serverIllustration} alt="Data center technician working with server hardware" />
          </div>
        </section>

        {/* Stats row */}
        <section className="about-stats">
          {STATS.map((stat, i) => (
            <div className="stat-card" key={i}>
              <p className="stat-value">{stat.value}</p>
              <p className="stat-label">{stat.label}</p>
            </div>
          ))}
        </section>

        {/* Values / why train with us */}
        <section className="about-values-section">
          <h2>Why Train With Us</h2>
          <div className="values-grid">
            {VALUES.map((item, i) => (
              <div className="value-card" key={i}>
                <img src={item.icon} alt="" className="value-icon" />
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Team */}
        <section className="about-team-section">
          <div className="about-header">
            <h2>Meet the Team</h2>
            <p>The instructors and staff behind the BootCamp.</p>
          </div>

          <div className="about-placeholder-note">
            Team headshots and bios are being finalized and will be added here shortly.
          </div>

          <div className="illustration-wrap">
            <img src={teamIllustration} alt="" />
          </div>

          <div className="team-grid">
            {PLACEHOLDER_TEAM.map((member, i) => (
              <div className="team-card" key={i}>
                <div className="team-photo-placeholder">Photo</div>
                <h3>{member.name}</h3>
                <p className="team-role">{member.role}</p>
                <p className="team-bio-placeholder">Bio coming soon.</p>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />

      <style>{`
        .about-page {
          max-width: 1100px;
          margin: 0 auto;
          padding: 48px 20px 20px;
        }

        .about-hero {
          display: grid;
          grid-template-columns: 1.1fr 1fr;
          gap: 40px;
          align-items: center;
          margin-bottom: 56px;
        }

        .eyebrow {
          text-transform: uppercase;
          letter-spacing: 0.08em;
          font-size: 12px;
          font-weight: 700;
          color: #6415ff;
          margin: 0 0 12px;
        }

        .about-hero-text h1 {
          font-size: 32px;
          line-height: 1.2;
          font-weight: 900;
          color: #111827;
          margin: 0 0 16px;
        }

        .lede {
          font-size: 16px;
          line-height: 1.7;
          color: #4b5563;
          margin: 0 0 24px;
        }

        .btn-primary {
          background: #6415ff;
          color: #fff;
          border: none;
          font-weight: 800;
          font-size: 15px;
          padding: 14px 26px;
          border-radius: 8px;
          cursor: pointer;
        }

        .btn-primary:hover {
          background: #5a13e6;
        }

        .about-hero-illustration img {
          width: 100%;
          max-width: 420px;
          margin: 0 auto;
          display: block;
        }

        .about-stats {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
          margin-bottom: 56px;
          padding: 28px 0;
          border-top: 1px solid #e5e7eb;
          border-bottom: 1px solid #e5e7eb;
        }

        .stat-card {
          text-align: center;
        }

        .stat-value {
          font-size: 30px;
          font-weight: 900;
          color: #6415ff;
          margin: 0 0 4px;
        }

        .stat-label {
          font-size: 13px;
          font-weight: 600;
          color: #6b7280;
          margin: 0;
        }

        .about-values-section {
          margin-bottom: 64px;
        }

        .about-values-section h2 {
          font-size: 24px;
          font-weight: 800;
          color: #111827;
          text-align: center;
          margin: 0 0 32px;
        }

        .values-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 24px;
        }

        .value-card {
          border: 1px solid #e5e7eb;
          border-radius: 12px;
          padding: 24px;
        }

        .value-icon {
          width: 40px;
          height: 40px;
          margin-bottom: 14px;
        }

        .value-card h3 {
          font-size: 16px;
          font-weight: 800;
          color: #111827;
          margin: 0 0 8px;
        }

        .value-card p {
          font-size: 14px;
          line-height: 1.6;
          color: #6b7280;
          margin: 0;
        }

        .about-team-section {
          margin-bottom: 40px;
        }

        .about-header {
          text-align: center;
          max-width: 640px;
          margin: 0 auto 32px;
        }

        .about-header h2 {
          font-size: 26px;
          font-weight: 800;
          color: #111827;
          margin: 0 0 8px;
        }

        .about-header p {
          color: #6b7280;
          font-size: 16px;
          margin: 0;
        }

        .about-placeholder-note {
          max-width: 640px;
          margin: 0 auto 40px;
          background: #fffbeb;
          border: 1px dashed #f5b700;
          color: #92400e;
          font-size: 14px;
          font-weight: 600;
          padding: 14px 24px;
          border-radius: 8px;
          text-align: center;
        }

        .illustration-wrap {
          display: flex;
          justify-content: center;
          margin-bottom: 48px;
        }

        .illustration-wrap img {
          width: 100%;
          max-width: 360px;
        }

        .team-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
        }

        .team-card {
          background: #fff;
          border: 1px solid #e5e7eb;
          border-radius: 12px;
          padding: 24px;
          text-align: center;
          box-shadow: 0 1px 2px rgba(0,0,0,0.04);
        }

        .team-photo-placeholder {
          width: 112px;
          height: 112px;
          border-radius: 50%;
          background: #f3f4f6;
          color: #9ca3af;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 13px;
          font-weight: 600;
          margin: 0 auto 16px;
        }

        .team-card h3 {
          font-size: 16px;
          font-weight: 800;
          color: #111827;
          margin: 0 0 4px;
        }

        .team-role {
          font-size: 13px;
          color: #6b7280;
          margin: 0;
        }

        .team-bio-placeholder {
          margin-top: 10px;
          font-style: italic;
          color: #9ca3af;
          font-size: 13px;
        }

        @media (max-width: 800px) {
          .about-hero {
            grid-template-columns: 1fr;
          }

          .about-hero-illustration {
            order: -1;
          }

          .about-stats {
            grid-template-columns: 1fr;
            gap: 20px;
          }

          .values-grid {
            grid-template-columns: 1fr;
          }

          .team-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </AnimationRevealPage>
  );
};
