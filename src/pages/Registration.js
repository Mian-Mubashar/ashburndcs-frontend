import React from "react";
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import Header from "components/headers/light.js";
import Footer from "components/footers/MiniCenteredFooter";

// Google Forms shares the same form ID between the owner's editor URL
// (.../edit) and the public fill-in URL (.../viewform) for "classic"
// forms — this is built from the ID in the edit link that was shared. If
// the form is restricted (e.g. limited to a Google account or
// organization), this will show a sign-in/permission page instead of the
// form. To fix: open the form → Send (top right) → click the link icon 🔗
// → copy that URL → paste it in below.
const GOOGLE_FORM_EMBED_URL =
  "https://docs.google.com/forms/d/1zjszgDio0_7tFUqOZYKQLEqhis2dpKxuCWEluwHx1os/viewform?embedded=true";

export default function Registration() {
  return (
    <AnimationRevealPage>
      <Header />
      <main className="registration-page">
        <div className="registration-header">
          <h1>Registration</h1>
          <p>Fill out the form below to apply for the Server Support BootCamp.</p>
        </div>

        {GOOGLE_FORM_EMBED_URL ? (
          <div className="form-embed-wrap">
            <iframe
              title="ADCS Enrollment Form"
              src={GOOGLE_FORM_EMBED_URL}
              width="100%"
              height="1200"
              frameBorder="0"
            >
              Loading form…
            </iframe>
          </div>
        ) : (
          <div className="form-embed-placeholder">
            <p>The enrollment form isn't connected yet.</p>
          </div>
        )}
      </main>

      <Footer />

      <style>{`
        .registration-page {
          max-width: 800px;
          margin: 0 auto;
          padding: 48px 20px 60px;
        }

        .registration-header h1 {
          font-size: 30px;
          font-weight: 900;
          color: #111827;
          margin: 0 0 6px;
        }

        .registration-header p {
          color: #6b7280;
          font-size: 15px;
          margin: 0 0 28px;
        }

        .form-embed-wrap iframe {
          border: 1px solid #e5e7eb;
          border-radius: 12px;
        }

        .form-embed-placeholder {
          border: 1px dashed #d1d5db;
          border-radius: 12px;
          padding: 40px 24px;
          text-align: center;
          color: #6b7280;
        }
      `}</style>
    </AnimationRevealPage>
  );
}
