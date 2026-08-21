import React from "react";
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import Header from "components/headers/light.js";
import Footer from "components/footers/MiniCenteredFooter";
import zelleQr from "images/payment/zelle-qr.png";
import venmoQr from "images/payment/venmo-qr.jpg";

/** Contact from client flyer. payment confirmations */
const PAY_EMAIL = "adcstrainingcenter@gmail.com";
const PAY_PHONE = "(571) 228-5050";
const PAY_PHONE_TEL = "+15712285050";

const METHODS = [
  {
    id: "zelle",
    name: "Zelle",
    badge: "Preferred · no fee",
    desc: "Pay for ADCS training with Zelle. Preferred method with no fee. Send to LTeamHomes, LLC and put your name in the memo.",
    qr: zelleQr,
    alt: "Zelle QR code for LTeamHomes, LLC",
  },
  {
    id: "venmo",
    name: "Venmo",
    badge: "2% fee applies",
    desc: "Pay for ADCS training with Venmo (@LTeamHomes). A 2% fee applies, so include your name in the memo.",
    qr: venmoQr,
    alt: "Venmo QR code for @LTeamHomes",
  },
];

export default function PaymentPage() {
  return (
    <AnimationRevealPage>
      <Header />
      <main className="pay">
        <header className="pay-hero">
          <p className="eyebrow">8-Week Server Support BootCamp</p>
          <h1>
            Pricing &amp; <span>payment</span>
          </h1>
          <p className="lede">
            Scan a QR below to pay ADCS BootCamp tuition. Use Zelle or Venmo, then confirm with us
            by email or phone.
          </p>
        </header>

        <div className="price-strip" aria-label="Tuition pricing">
          <div>
            <span className="pl">Per month</span>
            <strong>$1,400</strong>
            <em>2 monthly payments</em>
          </div>
          <div className="featured">
            <span className="pl">Pay in full</span>
            <strong>$2,650</strong>
            <em>Includes $150 discount</em>
          </div>
          <div>
            <span className="pl">Total cost</span>
            <strong>$2,800</strong>
            <em>Before full-pay discount</em>
          </div>
        </div>

        <div className="qr-flex">
          {METHODS.map((m) => (
            <article key={m.id} className={`qr-card${m.id === "zelle" ? " preferred" : ""}`}>
              <div className="qr-top">
                <div className="qr-title-row">
                  <h2>{m.name}</h2>
                  <span className="badge">{m.badge}</span>
                </div>
                <p>{m.desc}</p>
              </div>
              <img src={m.qr} alt={m.alt} />
            </article>
          ))}
        </div>

        <div className="pay-contact">
          <p>
            After you pay, confirm with the training team so we can match your payment to enrollment.
          </p>
          <div className="contact-links">
            <a href={`mailto:${PAY_EMAIL}`}>{PAY_EMAIL}</a>
            <span className="dot" aria-hidden="true">·</span>
            <a href={`tel:${PAY_PHONE_TEL}`}>{PAY_PHONE}</a>
          </div>
        </div>
      </main>
      <Footer />

      <style>{`
        .pay {
          --navy: #0a1628;
          --gold: #f5c518;
          --ink: #0f1c2e;
          --muted: #4a5568;
          --line: #e2e8f0;
          max-width: 980px;
          margin: 0 auto;
          padding: 40px 16px 56px;
          color: var(--ink);
        }

        .pay-hero {
          text-align: center;
          max-width: 620px;
          margin: 0 auto 28px;
        }

        .eyebrow {
          display: inline-block;
          margin: 0 0 12px;
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #1e3a5f;
          background: rgba(30, 58, 95, 0.08);
          padding: 6px 12px;
          border-radius: 999px;
        }

        .pay-hero h1 {
          margin: 0 0 12px;
          font-size: clamp(1.9rem, 3.2vw, 2.55rem);
          font-weight: 900;
          letter-spacing: -0.02em;
          color: var(--navy);
          line-height: 1.15;
        }

        .pay-hero h1 span {
          color: #c9a227;
        }

        .lede {
          margin: 0;
          font-size: 1rem;
          line-height: 1.7;
          color: var(--muted);
        }

        .price-strip {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
          justify-content: center;
          margin-bottom: 28px;
        }

        .price-strip > div {
          flex: 1 1 160px;
          max-width: 220px;
          text-align: center;
          padding: 16px 14px;
          border-radius: 12px;
          background: #f7fafc;
          border: 1px solid var(--line);
        }

        .price-strip > div.featured {
          background: linear-gradient(160deg, #0a1628 0%, #1a365d 100%);
          border-color: transparent;
          color: #fff;
          box-shadow: 0 14px 32px rgba(10, 22, 40, 0.22);
        }

        .price-strip .pl {
          display: block;
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: #64748b;
          margin-bottom: 6px;
        }

        .price-strip .featured .pl {
          color: var(--gold);
        }

        .price-strip strong {
          display: block;
          font-size: 1.65rem;
          font-weight: 900;
          letter-spacing: -0.02em;
          color: var(--navy);
          margin-bottom: 4px;
        }

        .price-strip .featured strong {
          color: #fff;
        }

        .price-strip em {
          font-style: normal;
          font-size: 12px;
          font-weight: 600;
          color: #64748b;
        }

        .price-strip .featured em {
          color: rgba(255, 255, 255, 0.75);
        }

        .qr-flex {
          display: flex;
          flex-wrap: wrap;
          gap: 20px;
          justify-content: center;
          margin-bottom: 28px;
        }

        .qr-card {
          flex: 1 1 280px;
          max-width: 440px;
          background: #fff;
          border: 1px solid var(--line);
          border-radius: 16px;
          padding: 22px 20px 24px;
          text-align: center;
          box-shadow: 0 12px 32px rgba(15, 28, 46, 0.06);
        }

        .qr-card.preferred {
          border-color: #1a365d;
          box-shadow: 0 14px 36px rgba(10, 22, 40, 0.12);
        }

        .qr-top {
          margin-bottom: 16px;
          text-align: left;
        }

        .qr-title-row {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 8px 10px;
          margin-bottom: 10px;
        }

        .qr-top h2 {
          margin: 0;
          font-size: 1.25rem;
          font-weight: 900;
          color: var(--navy);
        }

        .badge {
          font-size: 10px;
          font-weight: 800;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          color: #78350f;
          background: #fef3c7;
          padding: 4px 10px;
          border-radius: 999px;
        }

        .qr-card.preferred .badge {
          color: #0a1628;
          background: var(--gold);
        }

        .qr-top p {
          margin: 0;
          font-size: 14px;
          line-height: 1.55;
          color: var(--muted);
        }

        .qr-card img {
          width: 100%;
          max-width: 236px;
          border-radius: 12px;
          border: 1px solid var(--line);
          display: block;
          margin: 0 auto;
        }

        .pay-contact {
          text-align: center;
          max-width: 520px;
          margin: 0 auto;
          padding: 20px 18px;
          border-radius: 12px;
          background: #f7fafc;
          border: 1px solid var(--line);
        }

        .pay-contact p {
          margin: 0 0 12px;
          font-size: 14px;
          line-height: 1.55;
          color: var(--muted);
        }

        .contact-links {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          align-items: center;
          gap: 8px 10px;
          font-size: 15px;
          font-weight: 700;
        }

        .contact-links a {
          color: #0a1628;
          text-decoration: none;
        }

        .contact-links a:hover {
          color: #c9a227;
        }

        .contact-links .dot {
          color: #cbd5e1;
        }

        @media (max-width: 640px) {
          .qr-flex {
            flex-direction: column;
            align-items: stretch;
          }

          .qr-card {
            max-width: none;
          }

          .price-strip > div {
            max-width: none;
          }
        }
      `}</style>
    </AnimationRevealPage>
  );
}
