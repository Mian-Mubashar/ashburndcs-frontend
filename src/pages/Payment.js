import React, { useState } from "react";
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import Header from "components/headers/light.js";
import Footer from "components/footers/MiniCenteredFooter";
import {
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import axios from "axios";
import { Toast } from "helpers/Alert";
import zelleQr from "images/payment/zelle-qr.png";
import venmoQr from "images/payment/venmo-qr.jpg";

const elementOptions = {
  style: {
    base: {
      fontSize: "16px",
      color: "#1F2937",
      fontFamily: "Inter, sans-serif",
      "::placeholder": { color: "#9CA3AF" },
      iconColor: "#6415ff",
    },
    invalid: { color: "#EF4444", iconColor: "#EF4444" },
  },
};

function StripeBackupForm() {
  const [amount, setAmount] = useState("");
  const [email, setEmail] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [paymentId, setPaymentId] = useState("");

  const stripe = useStripe();
  const elements = useElements();

  const handleAmountChange = (e) => {
    const value = e.target.value;
    if (value === "" || /^\d*\.?\d*$/.test(value)) setAmount(value);
  };

  const handlePay = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    if (!amount || Number(amount) <= 0) {
      Toast({ message: "Please enter a valid amount", type: "error" });
      return;
    }
    if (!email) {
      Toast({ message: "Please enter your email", type: "error" });
      return;
    }

    setIsProcessing(true);

    try {
      const backendUrl = (process.env.REACT_APP_BACKEND_URL || "http://localhost:5000/").replace(/\/$/, "");

      const { data } = await axios.post(
        `${backendUrl}/create-payment-intent`,
        { amount: Number(amount), email },
        { headers: { "Content-Type": "application/json" } }
      );

      if (!data.clientSecret) throw new Error("No client secret returned from backend");

      const cardElement = elements.getElement(CardNumberElement);
      const result = await stripe.confirmCardPayment(data.clientSecret, {
        payment_method: { card: cardElement, billing_details: { email } },
      });

      if (result.error) {
        Toast({ message: result.error.message, type: "error" });
        setIsProcessing(false);
      } else if (result.paymentIntent?.status === "succeeded") {
        setPaymentSuccess(true);
        setPaymentId(result.paymentIntent.id);
        Toast({ message: "Payment Successful!", type: "success" });
        setIsProcessing(false);
      }
    } catch (err) {
      let msg = "Payment failed. Please try again.";
      if (err.response) msg = err.response.data?.error || "Server error";
      else if (err.message === "Network Error") msg = "Cannot connect to server. Ensure backend is running.";
      Toast({ message: msg, type: "error" });
      setIsProcessing(false);
    }
  };

  if (paymentSuccess) {
    return (
      <div className="stripe-success">
        <p className="stripe-success-check">✓</p>
        <h3>Payment Successful</h3>
        <p>Transaction ID: {paymentId}</p>
        <p>
          Thank you for your payment of <b>${amount}</b>. A confirmation email has been sent to {email}.
        </p>
        <button type="button" className="btn-secondary" onClick={() => { setPaymentSuccess(false); setAmount(""); }}>
          Make Another Payment
        </button>
      </div>
    );
  }

  return (
    <form className="stripe-form" onSubmit={handlePay}>
      <label>
        Email Address
        <input type="email" placeholder="you@email.com" value={email} onChange={(e) => setEmail(e.target.value)} required disabled={isProcessing} />
      </label>

      <label>
        Amount (USD)
        <input type="text" placeholder="0.00" value={amount} onChange={handleAmountChange} required disabled={isProcessing} />
      </label>

      <label>
        Card Number
        <div className="stripe-element-wrap"><CardNumberElement options={{ ...elementOptions, showIcon: true }} /></div>
      </label>

      <div className="stripe-row">
        <label>
          Expiry
          <div className="stripe-element-wrap"><CardExpiryElement options={elementOptions} /></div>
        </label>
        <label>
          CVC
          <div className="stripe-element-wrap"><CardCvcElement options={elementOptions} /></div>
        </label>
      </div>

      <button type="submit" className="btn-primary" disabled={!stripe || isProcessing}>
        {isProcessing ? "Processing..." : `Pay ${amount ? `$${amount}` : "Now"}`}
      </button>
    </form>
  );
}

// Card payment (Stripe) is hidden per client request, QR codes only for now.
// Flip to true to bring the "Prefer to pay by card instead?" option back.
const SHOW_CARD_PAYMENT_OPTION = false;

export default function PaymentPage() {
  const [showStripe, setShowStripe] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState("zelle");

  return (
    <AnimationRevealPage>
      <Header />
      <main className="payment-page">
        <div className="payment-header">
          <h1>Pay Tuition</h1>
        </div>

        <p className="payment-intro">
          Use the Zelle QR code to pay with Zelle. Use the Venmo QR code to pay with Venmo.
        </p>

        <div className="qr-grid" role="radiogroup" aria-label="Payment method">
          <button
            type="button"
            className={`qr-card${selectedMethod === "zelle" ? " selected" : ""}`}
            onClick={() => setSelectedMethod("zelle")}
            role="radio"
            aria-checked={selectedMethod === "zelle"}
          >
            <p className="qr-label">Zelle (Preferred, no fee)</p>
            <img src={zelleQr} alt="Zelle QR code for LTeamHomes, LLC" />
          </button>

          <button
            type="button"
            className={`qr-card${selectedMethod === "venmo" ? " selected" : ""}`}
            onClick={() => setSelectedMethod("venmo")}
            role="radio"
            aria-checked={selectedMethod === "venmo"}
          >
            <p className="qr-label">Venmo (2% fee applies)</p>
            <img src={venmoQr} alt="Venmo QR code, @LTeamHomes" />
          </button>
        </div>

        {/* Card payment backup hidden per client request. Re-enable by
            setting SHOW_CARD_PAYMENT_OPTION back to true at the top of
            this file. */}
        {SHOW_CARD_PAYMENT_OPTION && (
          <div className="stripe-toggle-wrap">
            {!showStripe ? (
              <button type="button" className="btn-secondary" onClick={() => setShowStripe(true)}>
                Prefer to pay by card instead?
              </button>
            ) : (
              <div className="stripe-backup">
                <h2>Pay by Card</h2>
                <StripeBackupForm />
              </div>
            )}
          </div>
        )}
      </main>

      <Footer />

      <style>{`
        .payment-page {
          max-width: 780px;
          margin: 0 auto;
          padding: 48px 20px 60px;
        }

        .payment-header h1 {
          font-size: 30px;
          font-weight: 900;
          color: #111827;
          margin: 0 0 6px;
        }

        .payment-header p {
          color: #6b7280;
          font-size: 15px;
          margin: 0 0 32px;
        }

        .payment-intro {
          text-align: center;
          font-size: 15px;
          color: #4b5563;
          margin: 0 0 24px;
        }

        .qr-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
          margin-bottom: 20px;
        }

        .qr-card {
          border: 1px solid #e5e7eb;
          border-radius: 14px;
          padding: 22px;
          text-align: center;
          background: #fff;
          font-family: inherit;
          cursor: pointer;
          transition: border-color 0.15s, box-shadow 0.15s;
        }

        .qr-card.selected {
          border-color: #6415ff;
          box-shadow: 0 0 0 2px #6415ff inset;
        }

        .qr-card:hover:not(.selected) {
          border-color: #d1d5db;
        }

        .qr-card:focus-visible {
          outline: 2px solid #6415ff;
          outline-offset: 2px;
        }

        .qr-label {
          font-weight: 800;
          font-size: 14px;
          color: #111827;
          margin: 0 0 14px;
        }

        .qr-card img {
          width: 100%;
          max-width: 220px;
          border-radius: 8px;
        }

        .stripe-toggle-wrap {
          border-top: 1px solid #e5e7eb;
          padding-top: 28px;
          text-align: center;
        }

        .btn-secondary {
          background: transparent;
          color: #111827;
          border: 1.5px solid #d1d5db;
          font-weight: 700;
          font-size: 14px;
          padding: 12px 22px;
          border-radius: 8px;
          cursor: pointer;
        }

        .btn-secondary:hover {
          border-color: #111827;
        }

        .stripe-backup {
          max-width: 420px;
          margin: 0 auto;
          text-align: left;
        }

        .stripe-backup h2 {
          font-size: 18px;
          font-weight: 800;
          color: #111827;
          margin: 0 0 16px;
          text-align: center;
        }

        .stripe-form {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        .stripe-form label {
          display: flex;
          flex-direction: column;
          gap: 6px;
          font-size: 13px;
          font-weight: 700;
          color: #374151;
        }

        .stripe-form input {
          padding: 10px 12px;
          border-radius: 8px;
          border: 1px solid #d1d5db;
          font-size: 14px;
        }

        .stripe-element-wrap {
          padding: 10px 12px;
          border-radius: 8px;
          border: 1px solid #d1d5db;
        }

        .stripe-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 14px;
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

        .btn-primary:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .stripe-success {
          text-align: center;
          padding: 20px 0;
        }

        .stripe-success-check {
          font-size: 32px;
          color: #059669;
        }

        @media (max-width: 600px) {
          .qr-grid {
            grid-template-columns: 1fr;
          }

          .stripe-row {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </AnimationRevealPage>
  );
}
