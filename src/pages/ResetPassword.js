import React, { useState } from "react";
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import illustration from "images/login-illustration.svg";
import { useNavigate, useSearchParams } from "react-router-dom";
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

export default function ResetPasswordPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      Toast({ message: "Passwords do not match.", type: "error" });
      return;
    }

    if (!token) {
      Toast({ message: "Invalid reset link.", type: "error" });
      return;
    }

    setLoading(true);

    try {
      const { data } = await authApi.resetPassword({ token, password });
      setDone(true);
      Toast({ message: data.message, type: "success" });
    } catch (error) {
      Toast({
        message: error.response?.data?.error || "Password reset failed.",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  if (!token) {
    return (
      <AnimationRevealPage>
        <AuthPageLayout illustrationSrc={illustration} heading="Invalid Link">
          <AuthMessage type="info">
            This password reset link is invalid. Please request a new one.
          </AuthMessage>
          <AuthButton type="button" tw="mt-6" onClick={() => navigate("/forgot-password")}>
            Request New Link
          </AuthButton>
        </AuthPageLayout>
      </AnimationRevealPage>
    );
  }

  return (
    <AnimationRevealPage>
      <AuthPageLayout
        illustrationSrc={illustration}
        heading={done ? "Password Updated" : "Set New Password"}
      >
        {done ? (
          <>
            <AuthMessage type="success">
              Your password has been reset successfully.
            </AuthMessage>
            <AuthButton type="button" tw="mt-6" onClick={() => navigate("/login")}>
              Sign In Now
            </AuthButton>
          </>
        ) : (
          <AuthForm onSubmit={handleSubmit}>
            <AuthInput
              type="password"
              placeholder="New password (min 6 characters)"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
            />
            <AuthInput
              type="password"
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              minLength={6}
            />
            <AuthButton type="submit" disabled={loading}>
              {loading ? "Updating..." : "Reset Password"}
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
