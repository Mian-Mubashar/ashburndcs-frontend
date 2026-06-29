import React, { useEffect, useState } from "react";
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import illustration from "images/login-illustration.svg";
import { ReactComponent as LoginIcon } from "feather-icons/dist/icons/log-in.svg";
import { useNavigate } from "react-router-dom";
import { Toast } from "helpers/Alert";
import {
  AuthPageLayout,
  AuthForm,
  AuthInput,
  AuthButton,
  AuthLink,
} from "components/auth/AuthLayout";
import { authApi, getAuthToken, saveAuthToken } from "services/authApi";
import tw from "twin.macro";

export default function LoginPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (getAuthToken()) navigate("/");
  }, [navigate]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data } = await authApi.login(form);
      saveAuthToken(data.token, data.user.email);
      Toast({ message: "Login successful!" });
      navigate("/");
    } catch (error) {
      const res = error.response?.data;

      if (res?.needsVerification) {
        Toast({ message: res.error, type: "info" });
        navigate("/verify-email", { state: { email: form.email, pending: true } });
        return;
      }

      Toast({ message: res?.error || "Login failed. Please try again.", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimationRevealPage>
      <AuthPageLayout illustrationSrc={illustration} heading="Sign In To ADCS">
        <AuthForm onSubmit={handleLogin}>
          <AuthInput
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
          />
          <AuthInput
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
          />

          <p tw="mt-3 text-right">
            <AuthLink type="button" onClick={() => navigate("/forgot-password")}>
              Forgot Password?
            </AuthLink>
          </p>

          <AuthButton type="submit" disabled={loading}>
            <LoginIcon tw="w-5 h-5 mr-2" />
            {loading ? "Signing In..." : "Sign In"}
          </AuthButton>
        </AuthForm>

        <p tw="mt-8 text-sm text-gray-600 text-center">
          Don't have an account?{" "}
          <AuthLink type="button" onClick={() => navigate("/register")}>
            Sign Up
          </AuthLink>
        </p>
      </AuthPageLayout>
    </AnimationRevealPage>
  );
}
