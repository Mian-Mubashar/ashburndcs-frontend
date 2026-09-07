import React from "react";
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import Header from "components/headers/light.js";
import Footer from "components/footers/MiniCenteredFooter";
import { COURSE_SCHEDULE, COURSE_DATE_RANGE } from "AppData/CourseScheduleData";
import { FeatureCardsDataL1, FeatureCardsDataL2, FeatureCardsDataL3 } from "AppData/MainFeatureData";

const CURRICULUM_BLOCKS = [
  { title: "Server Hardware & Lab Foundations", cards: FeatureCardsDataL1 },
  { title: "Networking & Remote Management", cards: FeatureCardsDataL2 },
  { title: "Operations & Final Assessment", cards: FeatureCardsDataL3 },
];

export default function CourseOutline() {
  return (
    <AnimationRevealPage>
      <Header />
      <main className="outline-page">
        <div className="outline-header">
          <h1>Course Outline</h1>
          <p>8-Week Master Schedule · Starts Saturday, September 19, 2026 · {COURSE_DATE_RANGE}</p>
        </div>

        <section className="outline-section" aria-labelledby="curriculum-heading">
          <h2 id="curriculum-heading">Curriculum</h2>
          <p className="section-sub">
            Classroom lessons are paired with real lab sessions so you are ready for data center work.
          </p>
          {CURRICULUM_BLOCKS.map((block) => (
            <div className="curriculum-block" key={block.title}>
              <h3>{block.title}</h3>
              <div className="curriculum-grid">
                {block.cards.map((card) => (
                  <article className="curriculum-card" key={card.title}>
                    <h4>{card.title}</h4>
                    <p>{card.description}</p>
                  </article>
                ))}
              </div>
            </div>
          ))}
        </section>

        <section className="outline-section" aria-labelledby="schedule-heading">
          <h2 id="schedule-heading">Class Schedule</h2>
          <p className="section-sub">
            90-minute classes on Wednesday evenings and Saturday/Sunday mornings, with 2-hour practical labs on Saturday/Sunday afternoons.
          </p>

          <div className="schedule-list">
            {COURSE_SCHEDULE.map((wk) => (
              <div className="schedule-week" key={wk.week}>
                <h3>{wk.week}: {wk.title}</h3>
                <table>
                  <tbody>
                    {wk.sessions.map((s, i) => (
                      <tr key={`${s.date}-${s.time}-${i}`}>
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

        .curriculum-block {
          margin-bottom: 28px;
        }

        .curriculum-block h3 {
          font-size: 15px;
          font-weight: 800;
          color: #6415ff;
          background: #f5f3ff;
          padding: 8px 12px;
          border-radius: 6px;
          margin: 0 0 12px;
        }

        .curriculum-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 14px;
        }

        .curriculum-card {
          background: #fff;
          border: 1px solid #e5e7eb;
          border-radius: 12px;
          padding: 16px 18px;
        }

        .curriculum-card h4 {
          font-size: 15px;
          font-weight: 800;
          color: #111827;
          margin: 0 0 8px;
        }

        .curriculum-card p {
          margin: 0;
          color: #4b5563;
          font-size: 14px;
          line-height: 1.6;
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
          width: 210px;
        }

        .col-time {
          color: #6b7280;
          white-space: nowrap;
          width: 160px;
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

        @media (max-width: 700px) {
          .curriculum-grid {
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
