import React, { useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import tw from "twin.macro";
import styled from "styled-components";
import { authApi, getAuthToken, saveAuthToken } from "services/authApi";
import { Toast } from "helpers/Alert";
import { useAuthModal } from "context/AuthModalContext";

const Screen = tw.div`min-h-screen flex flex-col items-center justify-center px-6`;
const Card = tw.div`w-full max-w-md text-center`;
const Brand = tw.div`text-2xl font-bold tracking-tight text-primary-700 mb-8`;
const Title = tw.h1`text-xl sm:text-2xl font-semibold text-gray-900 mb-3`;
const Sub = tw.p`text-sm text-gray-500 leading-relaxed`;
const Spinner = styled.div`
  ${tw`mx-auto mb-6 h-10 w-10 rounded-full border-4 border-primary-100`}
  border-top-color: #6415ff;
  animation: spin 0.7s linear infinite;
  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

export default function VerifyingEmailPage() {
  const { token } = useParams();
  const navigate = useNavigate();
  const { closeAuthModal, openAuthModal } = useAuthModal();
  const started = useRef(false);

  useEffect(() => {
    closeAuthModal();

    if (!token) {
      navigate("/", { replace: true });
      openAuthModal("login");
      return;
    }

    const existing = getAuthToken();
    if (existing?.token) {
      navigate(existing.role === "admin" ? "/admin" : "/dashboard", { replace: true });
      return;
    }

    if (started.current) return;
    started.current = true;

    const lockKey = `verify:${token}`;
    if (sessionStorage.getItem(lockKey)) {
      // Another pass already in flight — wait briefly then check session
      const t = setTimeout(() => {
        const auth = getAuthToken();
        if (auth?.token) {
          navigate(auth.role === "admin" ? "/admin" : "/dashboard", { replace: true });
        }
      }, 800);
      return () => clearTimeout(t);
    }
    sessionStorage.setItem(lockKey, "1");

    let cancelled = false;

    (async () => {
      try {
        const { data } = await authApi.verifyEmail(token);
        if (cancelled) return;

        if (data.token && data.user) {
          saveAuthToken(data.token, data.user.email, data.user.role);
          closeAuthModal();
          if (!data.alreadyVerified) {
            Toast({ message: "Account verified! You are signed in.", type: "success" });
          }
          navigate(data.user.role === "admin" ? "/admin" : "/dashboard", { replace: true });
          return;
        }

        navigate("/dashboard", { replace: true });
      } catch (error) {
        sessionStorage.removeItem(lockKey);
        if (cancelled) return;

        if (getAuthToken()?.token) {
          closeAuthModal();
          navigate("/dashboard", { replace: true });
          return;
        }

        const code = error.response?.data?.code;
        const msg = error.response?.data?.error || "";
        Toast({
          message:
            code === "INVALID_TOKEN" || /invalid|expired/i.test(msg)
              ? "This link was already used or expired. Please sign in."
              : msg || "Verification failed. Please sign in.",
          type: "info",
        });
        navigate("/", { replace: true });
        openAuthModal("login");
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [token, navigate, closeAuthModal, openAuthModal]);

  return (
    <Screen style={{ background: "linear-gradient(165deg, #f5f3ff 0%, #ffffff 45%, #eef2ff 100%)" }}>
      <Card>
        <Brand>ADCS</Brand>
        <Spinner aria-hidden />
        <Title>Verifying your email…</Title>
        <Sub>Please wait — we are signing you in.</Sub>
      </Card>
    </Screen>
  );
}
