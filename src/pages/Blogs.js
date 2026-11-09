import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import Header from "components/headers/light.js";
import Footer from "components/footers/MiniCenteredFooter";
import { BLOGS_DATA } from "AppData/BlogData";

// Color palette for top image placeholders to add subtle visual variety while maintaining the reference blue
const CARD_THEMES = [
  "linear-gradient(135deg, #0284c7 0%, #0369a1 100%)",
  "linear-gradient(135deg, #0096c7 0%, #0077b6 100%)",
  "linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%)",
  "linear-gradient(135deg, #0284c7 0%, #0f172a 100%)",
  "linear-gradient(135deg, #0369a1 0%, #1e293b 100%)",
];

export default function Blogs() {
  const navigate = useNavigate();
  const [visibleCount, setVisibleCount] = useState(12);

  // Dynamic SEO metadata
  useEffect(() => {
    document.title =
      "Data Center & Server Support Guides for NoVA Technicians | Ashburn DCS";
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute(
        "content",
        "Practical, local advice and technical insights for data center technicians in Ashburn, Sterling, and Northern Virginia — from server hardware troubleshooting to career advancement."
      );
    }
    window.scrollTo(0, 0);
  }, []);

  const displayedPosts = BLOGS_DATA.slice(0, visibleCount);

  return (
    <AnimationRevealPage>
      <Header />
      <div className="blogs-page-wrap">
        {/* Clean Site Header (Matching the rest of the website's UI) */}
        <header className="resources-header">
          <div className="header-inner">
            <span className="eyebrow">Resources & Career Guides</span>
            <h1>
              Data center tips & career guides for{" "}
              <span className="accent">NoVA technicians</span>
            </h1>
            <p className="lede">
              Practical, local advice and technical insights for data center
              technicians in Ashburn, Sterling, and Northern Virginia — from
              server hardware troubleshooting to career advancement and hands-on lab training.
            </p>
          </div>
        </header>

        {/* 3-Column Card Grid (Matching Reference Images Exactly) */}
        <main className="resources-main">
          <section className="cards-grid-section">
            <div className="cards-grid">
              {displayedPosts.map((post, idx) => {
                const cardBg = CARD_THEMES[idx % CARD_THEMES.length];
                return (
                  <article
                    key={post.id}
                    className="resource-card"
                    onClick={() => navigate(`/blog/${post.slug}`)}
                  >
                    {/* Top Solid / Gradient Blue Image Block (Exact Reference Image Style) */}
                    <div
                      className="card-image-box"
                      style={{ background: cardBg }}
                    >
                      <div className="card-image-overlay">
                        <span className="image-city-tag">📍 {post.cityTag}</span>
                      </div>
                    </div>

                    {/* Card Content Area */}
                    <div className="card-body">
                      {/* Eyebrow / Category & Read Time (Terracotta Accent Style like Reference) */}
                      <div className="card-eyebrow">
                        <span className="eyebrow-cat">{post.category}</span>
                        <span className="eyebrow-dot">·</span>
                        <span className="eyebrow-time">{post.readTime}</span>
                      </div>

                      {/* Title */}
                      <h2 className="card-title">
                        <a
                          href={`/blog/${post.slug}`}
                          onClick={(e) => {
                            e.preventDefault();
                            navigate(`/blog/${post.slug}`);
                          }}
                        >
                          {post.title}
                        </a>
                      </h2>

                      {/* Description */}
                      <p className="card-desc">{post.summary}</p>

                      {/* Bottom Date Row (Exact Reference Style: "August 21, 2026 · 3 min read") */}
                      <div className="card-date-row">
                        <span>
                          {post.date} · {post.readTime}
                        </span>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>

            {/* Load More Pagination */}
            {visibleCount < BLOGS_DATA.length && (
              <div className="load-more-container">
                <button
                  type="button"
                  className="btn-load-more"
                  onClick={() => setVisibleCount((prev) => prev + 12)}
                >
                  Load More Resources (
                  {BLOGS_DATA.length - visibleCount} remaining)
                </button>
              </div>
            )}
          </section>

          {/* Bottom Callout Banner */}
          <section className="cta-banner">
            <div className="cta-content">
              <span className="cta-badge">ADCS Training Center</span>
              <h2>Want hands-on experience in a real server lab?</h2>
              <p>
                Our 8-week Server Support BootCamp in Sterling, VA teaches
                server racking, fiber cabling, BIOS setup, and Linux troubleshooting.
                Classroom lectures are paired with live lab practice.
              </p>
              <div className="cta-buttons">
                <button
                  type="button"
                  className="btn-register"
                  onClick={() => navigate("/registration")}
                >
                  Register Now
                </button>
                <button
                  type="button"
                  className="btn-outline"
                  onClick={() => navigate("/course-outline")}
                >
                  View 8-Week Course Outline
                </button>
              </div>
            </div>
          </section>
        </main>
      </div>

      <Footer />

      <style>{`
        .blogs-page-wrap {
          background: #ffffff;
          min-height: 100vh;
        }

        /* Clean Site Header (Matching AboutUs / CourseOutline style) */
        .resources-header {
          max-width: 1240px;
          margin: 0 auto;
          padding: 48px 20px 24px;
        }

        .header-inner {
          max-width: 860px;
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
          padding: 6px 14px;
          border-radius: 999px;
        }

        .resources-header h1 {
          font-size: clamp(2rem, 3.8vw, 2.85rem);
          font-weight: 900;
          color: #0f1c2e;
          line-height: 1.18;
          letter-spacing: -0.02em;
          margin: 0 0 16px;
        }

        .resources-header .accent {
          color: #6415ff;
        }

        .lede {
          color: #4a5568;
          font-size: 1.05rem;
          line-height: 1.7;
          margin: 0;
          max-width: 44rem;
        }

        /* Main Section */
        .resources-main {
          max-width: 1240px;
          margin: 0 auto;
          padding: 20px 20px 80px;
        }

        /* 3-Column Card Grid (Matching Reference Images 1 & 2 Exactly) */
        .cards-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 26px;
        }

        @media (max-width: 1024px) {
          .cards-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }

        @media (max-width: 640px) {
          .cards-grid {
            grid-template-columns: 1fr;
          }
        }

        .resource-card {
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 18px;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.04);
          transition: transform 0.22s ease, box-shadow 0.22s ease, border-color 0.22s ease;
          cursor: pointer;
        }

        .resource-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 16px 36px rgba(2, 132, 199, 0.12);
          border-color: #7dd3fc;
        }

        /* Top Blue Block (Matching Reference Image) */
        .card-image-box {
          height: 190px;
          width: 100%;
          position: relative;
        }

        .card-image-overlay {
          position: absolute;
          bottom: 12px;
          left: 14px;
        }

        .image-city-tag {
          display: inline-block;
          font-size: 11px;
          font-weight: 700;
          background: rgba(15, 23, 42, 0.65);
          backdrop-filter: blur(4px);
          color: #ffffff;
          padding: 4px 10px;
          border-radius: 6px;
        }

        /* Card Body */
        .card-body {
          padding: 24px;
          display: flex;
          flex-direction: column;
          flex-grow: 1;
        }

        /* Category Eyebrow (Terracotta / Orange Accent Style) */
        .card-eyebrow {
          font-size: 12px;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          color: #ea580c; /* Reference terracotta/orange */
          margin-bottom: 8px;
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .eyebrow-cat {
          font-weight: 800;
        }

        .eyebrow-dot {
          opacity: 0.7;
        }

        .eyebrow-time {
          font-weight: 700;
        }

        /* Title */
        .card-title {
          font-size: 18px;
          font-weight: 800;
          color: #0f172a;
          line-height: 1.35;
          margin: 0 0 10px;
        }

        .card-title a {
          color: inherit;
          text-decoration: none;
        }

        .card-title a:hover {
          color: #0284c7;
        }

        /* Description */
        .card-desc {
          font-size: 14px;
          color: #64748b;
          line-height: 1.55;
          margin: 0 0 20px;
          flex-grow: 1;
        }

        /* Bottom Date Row (Matching Reference) */
        .card-date-row {
          font-size: 12px;
          color: #94a3b8;
          font-weight: 500;
          padding-top: 12px;
          border-top: 1px solid #f1f5f9;
        }

        /* Load More */
        .load-more-container {
          text-align: center;
          margin-top: 48px;
        }

        .btn-load-more {
          background: #ffffff;
          border: 2px solid #0284c7;
          color: #0284c7;
          font-weight: 700;
          font-size: 15px;
          padding: 12px 32px;
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.2s;
        }

        .btn-load-more:hover {
          background: #0284c7;
          color: #ffffff;
        }

        /* CTA Banner */
        .cta-banner {
          margin-top: 64px;
          background: linear-gradient(135deg, #091728 0%, #0c233c 60%, #0369a1 100%);
          color: #ffffff;
          border-radius: 20px;
          padding: 44px 32px;
          text-align: center;
          box-shadow: 0 14px 40px rgba(9, 23, 40, 0.2);
        }

        .cta-badge {
          display: inline-block;
          font-size: 12px;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: #38bdf8;
          background: rgba(56, 189, 248, 0.12);
          padding: 4px 14px;
          border-radius: 999px;
          margin-bottom: 12px;
        }

        .cta-banner h2 {
          font-size: clamp(24px, 3.5vw, 34px);
          font-weight: 900;
          margin: 0 0 12px;
          color: #ffffff;
        }

        .cta-banner p {
          max-width: 720px;
          margin: 0 auto 24px;
          color: #cbd5e1;
          font-size: 15px;
          line-height: 1.6;
        }

        .cta-buttons {
          display: flex;
          justify-content: center;
          gap: 14px;
          flex-wrap: wrap;
        }

        .btn-register {
          background: #0284c7;
          color: #ffffff;
          font-weight: 800;
          font-size: 15px;
          padding: 12px 28px;
          border-radius: 10px;
          border: none;
          cursor: pointer;
          transition: background 0.15s, transform 0.15s;
        }

        .btn-register:hover {
          background: #0369a1;
          transform: translateY(-2px);
        }

        .btn-outline {
          background: rgba(255, 255, 255, 0.1);
          color: #ffffff;
          font-weight: 700;
          font-size: 15px;
          padding: 12px 28px;
          border-radius: 10px;
          border: 1px solid rgba(255, 255, 255, 0.25);
          cursor: pointer;
          transition: background 0.15s;
        }

        .btn-outline:hover {
          background: rgba(255, 255, 255, 0.2);
        }
      `}</style>
    </AnimationRevealPage>
  );
}
