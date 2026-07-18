import React, { useEffect, useState } from "react";
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import illustration from "images/email-illustration.svg";
import { useNavigate, useSearchParams, useLocation } from "react-router-dom";
import { Toast } from "helpers/Alert";
import {
  AuthPageLayout,
  AuthButton,
  AuthLink,
  AuthMessage,
  AuthInput,
  AuthForm,
} from "components/auth/AuthLayout";
import { authApi, getAuthToken, saveAuthToken } from "services/authApi";

export default function VerifyEmailPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const emailFromState = location.state?.email || "";

  const [status, setStatus] = useState(token ? "verifying" : "pending");
  const [email, setEmail] = useState(emailFromState);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!token) return;

    if (getAuthToken()?.token) {
      navigate("/dashboard", { replace: true });
      return;
    }

    const lockKey = `verify:${token}`;
    if (sessionStorage.getItem(lockKey)) return;
    sessionStorage.setItem(lockKey, "1");

    const verify = async () => {
      try {
        const { data } = await authApi.verifyEmail(token);
        if (data.token && data.user) {
          saveAuthToken(data.token, data.user.email, data.user.role);
          setStatus("success");
          if (!data.alreadyVerified) {
            Toast({ message: "Account verified! You are signed in.", type: "success" });
          }
          navigate(data.user.role === "admin" ? "/admin" : "/dashboard", { replace: true });
          return;
        }
        setStatus("success");
      } catch (error) {
        sessionStorage.removeItem(lockKey);
        if (getAuthToken()?.token) {
          navigate("/dashboard", { replace: true });
          return;
        }
        setStatus("error");
        Toast({
          message: error.response?.data?.error || "Verification failed.",
          type: "error",
        });
      }
    };

    verify();
  }, [token, navigate]);

  const handleResend = async (e) => {
    e.preventDefault();
    if (!email) {
      Toast({ message: "Please enter your email.", type: "error" });
      return;
    }

    setLoading(true);
    try {
      const { data } = await authApi.resendVerification(email);
      Toast({ message: data.message, type: "success" });
    } catch (error) {
      const msg = error.response?.data?.error || "Failed to resend email.";
      if (msg.toLowerCase().includes("already verified")) {
        Toast({ message: "Email already verified. Please sign in.", type: "info" });
        navigate("/login");
        return;
      }
      Toast({ message: msg, type: "error" });
    } finally {
      setLoading(false);
    }
  };

  const headings = {
    verifying: "Verifying Email...",
    success: "Email Verified!",
    error: "Verification Failed",
    pending: "Verify Your Email",
  };

  return (
    <AnimationRevealPage>
      <AuthPageLayout illustrationSrc={illustration} heading={headings[status]}>
        {status === "verifying" && (
          <AuthMessage type="info">Please wait while we verify your email...</AuthMessage>
        )}

        {status === "success" && (
          <AuthMessage type="success">
            Your email has been verified. Redirecting to your dashboard...
          </AuthMessage>
        )}

        {status === "error" && (
          <>
            <AuthMessage type="info">
              The verification link is invalid or has expired. Sign in, or request a new link below.
            </AuthMessage>
            <ResendForm
              email={email}
              setEmail={setEmail}
              loading={loading}
              onSubmit={handleResend}
            />
          </>
        )}

        {status === "pending" && (
          <>
            <AuthMessage type="info">
              We sent a verification link to your email. Click the button in that email — you will be signed in automatically.
            </AuthMessage>
            <ResendForm
              email={email}
              setEmail={setEmail}
              loading={loading}
              onSubmit={handleResend}
            />
          </>
        )}

        {status !== "success" && status !== "verifying" && (
          <p tw="mt-8 text-sm text-gray-600 text-center">
            <AuthLink type="button" onClick={() => navigate("/login")}>
              Back to Sign In
            </AuthLink>
          </p>
        )}
      </AuthPageLayout>
    </AnimationRevealPage>
  );
}

function ResendForm({ email, setEmail, loading, onSubmit }) {
  return (
    <AuthForm onSubmit={onSubmit} tw="mt-6">
      <AuthInput
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <AuthButton type="submit" disabled={loading}>
        {loading ? "Sending..." : "Resend Verification Email"}
      </AuthButton>
    </AuthForm>
  );
}
