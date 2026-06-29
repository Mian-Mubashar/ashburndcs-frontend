import React, { useEffect, useState } from "react";
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import illustration from "images/signup-illustration.svg";
import { ReactComponent as SignUpIcon } from "feather-icons/dist/icons/user-plus.svg";
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
import { authApi, getAuthToken } from "services/authApi";
import tw from "twin.macro";

export default function SignupPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [registered, setRegistered] = useState(false);

  useEffect(() => {
    if (getAuthToken()) navigate("/");
  }, [navigate]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data } = await authApi.register(form);
      setRegistered(true);
      Toast({ message: data.message, type: "success" });
    } catch (error) {
      Toast({
        message: error.response?.data?.error || "Registration failed.",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  if (registered) {
    return (
      <AnimationRevealPage>
        <AuthPageLayout illustrationSrc={illustration} logoWidth="6.5rem" heading="Check Your Email">
          <AuthMessage type="success">
            We sent a verification link to <strong>{form.email}</strong>.
            <br />
            Click the link in your email to activate your account.
          </AuthMessage>
          <AuthButton
            type="button"
            tw="mt-6"
            onClick={() => navigate("/verify-email", { state: { email: form.email } })}
          >
            Resend Verification Email
          </AuthButton>
          <p tw="mt-6 text-sm text-gray-600 text-center">
            <AuthLink type="button" onClick={() => navigate("/login")}>
              Back to Sign In
            </AuthLink>
          </p>
        </AuthPageLayout>
      </AnimationRevealPage>
    );
  }

  return (
    <AnimationRevealPage>
      <AuthPageLayout illustrationSrc={illustration} logoWidth="6.5rem" heading="Sign Up For ADCS">
        <AuthForm onSubmit={handleRegister}>
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
            placeholder="Password (min 6 characters)"
            value={form.password}
            onChange={handleChange}
            required
            minLength={6}
          />

          <AuthButton type="submit" disabled={loading}>
            <SignUpIcon tw="w-5 h-5 mr-2" />
            {loading ? "Creating Account..." : "Sign Up"}
          </AuthButton>

          <p tw="mt-6 text-xs text-gray-600 text-center">
            By signing up, you agree to our{" "}
            <AuthLink type="button" onClick={() => navigate("/terms")}>
              Terms of Service
            </AuthLink>{" "}
            and{" "}
            <AuthLink type="button" onClick={() => navigate("/policy")}>
              Privacy Policy
            </AuthLink>
          </p>
        </AuthForm>

        <p tw="mt-8 text-sm text-gray-600 text-center">
          Already have an account?{" "}
          <AuthLink type="button" onClick={() => navigate("/login")}>
            Sign In
          </AuthLink>
        </p>
      </AuthPageLayout>
    </AnimationRevealPage>
  );
}
