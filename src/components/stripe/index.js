import React, { useEffect, useState } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import "./style.css"; // Custom CSS file for styling
import { useLocation, useNavigate } from "react-router-dom";
import { Toast } from "helpers/Alert";
import { Email } from "Email";
export const Stripee = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [clientSecret, setClientSecret] = useState("");
  const Token = window.localStorage.getItem("token");
  useEffect(() => {
    console.log({ Token });
  }, [Token]);
  useEffect(() => {
    if (!Token) {
      navigate("/");
      Toast({
        message: "Kindly Login first to perform transaction",
        type: "info",
      });
    } else {
      fetch(`${process.env.REACT_APP_BACKEND_URL}create-payment-intent`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: state.amount,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log({ data });
          setClientSecret(data.clientSecret);
        });
    }
  }, [Token]);
  console.log({ clientSecret });
  return (
    <div>
      <h1>
        Complete Your Payment {state.amount} for {state.plan}
      </h1>
      {Token && <PaymentForm clientSecret={clientSecret} />}
    </div>
  );
};
const PaymentForm = ({ clientSecret }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isLoading, setIsLoading] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    if (!stripe || !elements) {
      setIsLoading(false);
      return; // Stripe.js has not yet loaded.
    }

    const cardElement = elements.getElement(CardElement);
    const { paymentIntent, error } = await stripe.confirmCardPayment(
      clientSecret,
      {
        payment_method: {
          card: cardElement,
          billing_details: {
            name: "Customer Name", // Replace with customer data
          },
        },
      }
    );

    if (error) {
      setPaymentStatus(`❌ Payment failed: ${error.message}`);
    } else if (paymentIntent.status === "succeeded") {
      setPaymentStatus("✅ Payment succeeded!");
      Email(paymentIntent);
    }

    setIsLoading(false);
  };

  return (
    <div className="payment-form-container">
      <h2 className="title">Complete Your Payment</h2>
      <form onSubmit={handleSubmit} className="payment-form">
        <div className="card-element-wrapper">
          <CardElement className="card-element" />
        </div>
        <button
          type="submit"
          disabled={!stripe || isLoading}
          className="pay-button"
        >
          {isLoading ? "Processing..." : "Pay"}
        </button>
        {paymentStatus && <div className="payment-status">{paymentStatus}</div>}
      </form>
    </div>
  );
};

export default PaymentForm;
