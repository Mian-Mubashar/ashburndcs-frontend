import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import Header from "components/headers/light.js";
import Footer from "components/footers/MiniCenteredFooter";
import { COURSE_SCHEDULE, COURSE_DATE_RANGE, PRICING, FAQ_ITEMS } from "AppData/CourseScheduleData";

export default function CourseOutline() {
  const navigate = useNavigate();
  const [selectedPlan, setSelectedPlan] = useState("payInFull");

  return (
    <AnimationRevealPage>
      <Header />
      <main className="outline-page">
        <div className="outline-header">
          <h1>Course Outline & FAQ</h1>
          <p>{PRICING.title} · {COURSE_DATE_RANGE}</p>
        </div>

        {/* Schedule */}
        <section className="outline-section">
          <h2>Class Schedule</h2>
          <p className="section-sub">{PRICING.schedule}</p>

          <div className="schedule-list">
            {COURSE_SCHEDULE.map((wk) => (
              <div className="schedule-week" key={wk.week}>
                <h3>{wk.week}: {wk.title}</h3>
                <table>
                  <tbody>
                    {wk.sessions.map((s, i) => (
                      <tr key={i}>
                        <td className="col-date">{s.date}</td>
                        <td className="col-time">{s.time}</td>
                        <td>
                          <span className={`type-badge type-${s.type.toLowerCase().replace(" ", "-")}`}>
                            {s.type}
                          </span>
                        </td>
                        <td className="col-topic">{s.topic}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ))}
          </div>
        </section>

        {/* Pricing */}
        <section className="outline-section pricing-section">
          <h2>Tuition & Pricing</h2>
          <div className="pricing-grid" role="radiogroup" aria-label="Payment plan">
            <button
              type="button"
              className={`pricing-card${selectedPlan === "monthly" ? " selected" : ""}`}
              onClick={() => setSelectedPlan("monthly")}
              role="radio"
              aria-checked={selectedPlan === "monthly"}
            >
              <p className="pricing-label">Monthly Plan</p>
              <p className="pricing-amount">{PRICING.monthly.amount}</p>
              <p className="pricing-note">{PRICING.monthly.note}</p>
            </button>
            <button
              type="button"
              className={`pricing-card${selectedPlan === "payInFull" ? " selected" : ""}`}
              onClick={() => setSelectedPlan("payInFull")}
              role="radio"
              aria-checked={selectedPlan === "payInFull"}
            >
              <p className="pricing-label">Pay In Full</p>
              <p className="pricing-amount">{PRICING.payInFull.amount}</p>
              <p className="pricing-note">{PRICING.payInFull.note}</p>
            </button>
            <button
              type="button"
              className={`pricing-card${selectedPlan === "total" ? " selected" : ""}`}
              onClick={() => setSelectedPlan("total")}
              role="radio"
              aria-checked={selectedPlan === "total"}
            >
              <p className="pricing-label">Total Cost</p>
              <p className="pricing-amount">{PRICING.total}</p>
              <p className="pricing-note">before pay-in-full discount</p>
            </button>
          </div>

          <div className="learn-list">
            <p className="pricing-label">What you'll learn</p>
            <ul>
              {PRICING.learn.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>

          <button type="button" className="btn-primary" onClick={() => navigate("/registration")}>
            Register Now
          </button>
        </section>

        {/* FAQ */}
        <section className="outline-section">
          <h2>Frequently Asked Questions</h2>
          <div className="faq-list">
            {FAQ_ITEMS.map((item, i) => (
              <details key={i} className="faq-item">
                <summary>{item.q}</summary>
                <p>{item.a}</p>
              </details>
            ))}
          </div>
        </section>
      </main>

      <Footer />

      <style>{`
        .outline-page {
          max-width: 950px;
          margin: 0 auto;
          padding: 48px 20px 60px;
        }

        .outline-header h1 {
          font-size: 32px;
          font-weight: 900;
          color: #111827;
          margin: 0 0 6px;
        }

        .outline-header p {
          color: #6b7280;
          font-size: 15px;
          margin: 0 0 40px;
        }

        .outline-section {
          margin-bottom: 48px;
        }

        .outline-section h2 {
          font-size: 22px;
          font-weight: 800;
          color: #111827;
          margin: 0 0 8px;
        }

        .section-sub {
          color: #4b5563;
          font-size: 14px;
          margin: 0 0 20px;
        }

        .schedule-week {
          margin-bottom: 24px;
        }

        .schedule-week h3 {
          font-size: 15px;
          font-weight: 800;
          color: #6415ff;
          background: #f5f3ff;
          padding: 8px 12px;
          border-radius: 6px;
          margin: 0 0 8px;
        }

        .schedule-week table {
          width: 100%;
          border-collapse: collapse;
          font-size: 13px;
        }

        .schedule-week td {
          padding: 8px 10px;
          border-bottom: 1px solid #f3f4f6;
          vertical-align: top;
        }

        .col-date {
          font-weight: 700;
          color: #111827;
          white-space: nowrap;
          width: 90px;
        }

        .col-time {
          color: #6b7280;
          white-space: nowrap;
          width: 140px;
        }

        .col-topic {
          color: #374151;
        }

        .type-badge {
          display: inline-block;
          font-size: 11px;
          font-weight: 700;
          padding: 3px 8px;
          border-radius: 999px;
          white-space: nowrap;
        }

        .type-classroom { background: #eef2ff; color: #3730a3; }
        .type-lab { background: #ecfdf5; color: #065f46; }
        .type-bonus-lab { background: #fffbeb; color: #92400e; }

        .pricing-section {
          background: #f9fafb;
          border: 1px solid #e5e7eb;
          border-radius: 16px;
          padding: 32px;
        }

        .pricing-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
          margin-bottom: 28px;
        }

        .pricing-card {
          background: #fff;
          border: 1px solid #e5e7eb;
          border-radius: 12px;
          padding: 20px;
          text-align: center;
          font-family: inherit;
          cursor: pointer;
          width: 100%;
          transition: border-color 0.15s, box-shadow 0.15s;
        }

        .pricing-card.selected {
          border-color: #6415ff;
          box-shadow: 0 0 0 2px #6415ff inset;
        }

        .pricing-card:hover:not(.selected) {
          border-color: #c4b5fd;
        }

        .pricing-card:focus-visible {
          outline: 2px solid #6415ff;
          outline-offset: 2px;
        }

        .pricing-label {
          font-size: 12px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: #6b7280;
          margin: 0 0 6px;
        }

        .pricing-amount {
          font-size: 28px;
          font-weight: 900;
          color: #111827;
          margin: 0 0 4px;
        }

        .pricing-note {
          font-size: 12px;
          color: #6b7280;
          margin: 0;
        }

        .learn-list {
          margin-bottom: 24px;
        }

        .learn-list ul {
          margin: 8px 0 0;
          padding-left: 20px;
          color: #374151;
          font-size: 14px;
          line-height: 1.8;
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

        .faq-list {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .faq-item {
          border: 1px solid #e5e7eb;
          border-radius: 10px;
          padding: 14px 18px;
        }

        .faq-item summary {
          font-weight: 700;
          color: #111827;
          cursor: pointer;
          font-size: 15px;
        }

        .faq-item p {
          margin: 12px 0 0;
          color: #4b5563;
          font-size: 14px;
          line-height: 1.6;
        }

        @media (max-width: 700px) {
          .pricing-grid {
            grid-template-columns: 1fr;
          }

          .col-time {
            width: auto;
          }

          .schedule-week table,
          .schedule-week tbody,
          .schedule-week tr,
          .schedule-week td {
            display: block;
            width: 100%;
          }

          .schedule-week tr {
            padding: 10px 0;
            border-bottom: 1px solid #f3f4f6;
          }

          .schedule-week td {
            border-bottom: none;
            padding: 2px 0;
          }
        }
      `}</style>
    </AnimationRevealPage>
  );
}
