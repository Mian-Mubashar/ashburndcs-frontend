import React, { useState } from "react";
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import illustration from "images/email-illustration.svg";
import { useNavigate } from "react-router-dom";
import { Toast } from "helpers/Alert";
import {
  AuthPageLayout,
  AuthForm,
  AuthInput,
  AuthButton,
  AuthLink,
  AuthMessage,
} from "components/auth/AuthLayout";
import { authApi } from "services/authApi";

export default function ForgotPasswordPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data } = await authApi.forgotPassword(email);
      setSent(true);
      Toast({ message: data.message, type: "success" });
    } catch (error) {
      Toast({
        message: error.response?.data?.error || "Failed to send reset link.",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimationRevealPage>
      <AuthPageLayout
        illustrationSrc={illustration}
        heading={sent ? "Check Your Email" : "Forgot Password"}
      >
        {sent ? (
          <AuthMessage type="success">
            If an account exists for <strong>{email}</strong>, we've sent a password reset link.
            Check your inbox and spam folder.
          </AuthMessage>
        ) : (
          <AuthForm onSubmit={handleSubmit}>
            <p tw="text-sm text-gray-500 text-center mb-2">
              Enter your email and we'll send you a reset link.
            </p>
            <AuthInput
              type="email"
              placeholder="Your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <AuthButton type="submit" disabled={loading}>
              {loading ? "Sending..." : "Send Reset Link"}
            </AuthButton>
          </AuthForm>
        )}

        <p tw="mt-8 text-sm text-gray-600 text-center">
          <AuthLink type="button" onClick={() => navigate("/login")}>
            Back to Sign In
          </AuthLink>
        </p>
      </AuthPageLayout>
    </AnimationRevealPage>
  );
}
