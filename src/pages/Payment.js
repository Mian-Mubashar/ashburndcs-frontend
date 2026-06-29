import React, { useState, useEffect } from "react";
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import tw from "twin.macro";
import styled from "styled-components";
import Header from "components/headers/light.js";
import Footer from "components/footers/MiniCenteredFooter";
import {
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  useStripe,
  useElements,
  Elements
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import { Toast } from "helpers/Alert";

// UI Components matching the clean "Card" aesthetic
const Container = tw.div`min-h-screen flex flex-col`;
const Content = tw.div`flex-1 flex justify-center items-center p-4 md:p-8`;
const Card = tw.div`bg-white shadow-xl rounded-2xl w-full max-w-lg p-6 md:p-10 border border-gray-100`;

const CardHeader = tw.div`mb-8 text-center md:text-left`;
const Title = tw.h2`text-2xl font-bold text-gray-800 mb-2`;
const SubTitle = tw.p`text-gray-500 text-sm`;

const Form = tw.form`space-y-6`;

const FormGroup = tw.div`flex flex-col space-y-2`;
const Label = tw.label`text-sm font-semibold text-gray-700`;
const InputWrapper = tw.div`relative`;

// Custom styling for the Amount Input to match the design
const AmountInput = styled.input`
  ${tw`w-full px-4 py-3 rounded-lg border border-gray-300 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all duration-200 font-medium text-gray-800`}
`;

// Styling wrapper for Stripe Elements
const StripeElementWrapper = styled.div`
  ${tw`w-full px-4 py-3 rounded-lg border border-gray-300 focus-within:bg-white focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-200 transition-all duration-200`}

  .StripeElement {
    width: 100%;
    color: #374151;
    background-color: transparent;
  }
`;

const Row = tw.div`flex space-x-4`;
const Col = tw.div`flex-1`;

const PayButton = styled.button`
  ${tw`w-full py-4 text-lg text-white font-bold rounded-lg shadow-md hover:shadow-lg transform active:scale-95 transition-all duration-200 flex justify-center items-center gap-2`}
  background-color: #2563EB!important; /* Bright Blue */

  &:disabled {
    ${tw`opacity-50 cursor-not-allowed transform-none shadow-none bg-gray-400`}
  }
`;

const SuccessView = tw.div`text-center py-10`;
const CheckIcon = tw.div`w-16 h-16 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl`;

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE);

// Style options for Stripe Elements
const elementOptions = {
  style: {
    base: {
      fontSize: '16px',
      color: '#1F2937',
      fontFamily: 'Inter, sans-serif',
      '::placeholder': {
        color: '#9CA3AF',
      },
      iconColor: '#2563EB',
    },
    invalid: {
      color: '#EF4444',
      iconColor: '#EF4444',
    },
  },
};

function PaymentForm() {
  const [amount, setAmount] = useState("");
  const [email, setEmail] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [paymentId, setPaymentId] = useState("");

  const stripe = useStripe();
  const elements = useElements();

  const handleAmountChange = (e) => {
    const value = e.target.value;
    if (value === "" || /^\d*\.?\d*$/.test(value)) {
      setAmount(value);
    }
  };

  const handlePay = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

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
        { headers: { 'Content-Type': 'application/json' } }
      );

      if (!data.clientSecret) {
        throw new Error("No client secret returned from backend");
      }

      setClientSecret(data.clientSecret);

      // 2. Confirm Card Payment directly
      const cardElement = elements.getElement(CardNumberElement);
      const result = await stripe.confirmCardPayment(data.clientSecret, {
        payment_method: {
          card: cardElement,
          billing_details: {
            email: email,
          },
        },
      });

      if (result.error) {
        console.error("Payment error:", result.error);
        Toast({ message: result.error.message, type: "error" });
        setIsProcessing(false);
      } else if (result.paymentIntent && result.paymentIntent.status === "succeeded") {
        setPaymentSuccess(true);
        setPaymentId(result.paymentIntent.id);
        Toast({ message: "Payment Successful!", type: "success" });
        setIsProcessing(false);
      }
    } catch (err) {
      console.error("Process error:", err);
      let msg = "Payment failed. Please try again.";
      if (err.response) {
        msg = err.response.data?.error || "Server error";
      } else if (err.message === "Network Error") {
        msg = "Cannot connect to server. Ensure backend is running.";
      }
      Toast({ message: msg, type: "error" });
      setIsProcessing(false);
    }
  };

  if (paymentSuccess) {
    return (
      <Card>
        <SuccessView>
          <CheckIcon>✓</CheckIcon>
          <Title>Payment Successful</Title>
          <SubTitle>Transaction ID: {paymentId}</SubTitle>
          <p className="my-6 text-gray-600">
            Thank you for your payment of <b>${amount}</b>. A confirmation email has been sent to {email}.
          </p>
          <PayButton onClick={() => {
            setPaymentSuccess(false);
            setAmount("");
            setClientSecret("");
          }}>
            Make Another Payment
          </PayButton>
        </SuccessView>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <Title>Secure Payment</Title>
        <SubTitle>Pay any amount securely with your card.</SubTitle>
      </CardHeader>

      <Form onSubmit={handlePay}>
        {/* Email Field */}
        <FormGroup>
          <Label>Email Address</Label>
          <AmountInput
            type="email"
            placeholder="example@email.com"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            disabled={isProcessing}
          />
        </FormGroup>

        {/* Amount Field */}
        <FormGroup>
          <Label>Amount (USD)</Label>

          <div className="relative">
            {/* Dollar Icon */}
            <span
              className="
        absolute 
        left-4 
        top-1/2 
        -translate-y-1/2 
        text-gray-400 
        font-bold 
        pointer-events-none
      "
            >
              $
            </span>

            {/* Input */}
            <AmountInput
              type="text"
              placeholder="0.00"
              value={amount}
              onChange={handleAmountChange}
              required
              disabled={isProcessing}
              style={{ paddingLeft: "2.75rem" }}   // 👈 IMPORTANT FIX
            />
          </div>
        </FormGroup>


        {/* Card Number */}
        <FormGroup>
          <Label>Account Number (Card Number)</Label>
          <StripeElementWrapper>
            <CardNumberElement options={{ ...elementOptions, showIcon: true }} />
          </StripeElementWrapper>
        </FormGroup>

        {/* Expiry & CVC */}
        <Row>
          <Col>
            <FormGroup>
              <Label>Expiry Date</Label>
              <StripeElementWrapper>
                <CardExpiryElement options={elementOptions} />
              </StripeElementWrapper>
            </FormGroup>
          </Col>
          <Col>
            <FormGroup>
              <Label>CVV</Label>
              <StripeElementWrapper>
                <CardCvcElement options={elementOptions} />
              </StripeElementWrapper>
            </FormGroup>
          </Col>
        </Row>

        <PayButton type="submit" disabled={!stripe || isProcessing}>
          {isProcessing ? (
            <span>Processing...</span>
          ) : (
            <span>Pay {amount ? `$${amount}` : "Now"}</span>
          )}
        </PayButton>
      </Form>
    </Card>
  );
}

export default function PaymentPage() {
  return (
    <AnimationRevealPage>
      <Header />
      <Container>
        <Content>
          <Elements stripe={stripePromise}>
            <PaymentForm />
          </Elements>
        </Content>
      </Container>
      <Footer />
    </AnimationRevealPage>
  );
}

