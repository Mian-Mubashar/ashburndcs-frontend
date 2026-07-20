import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ReactComponent as CloseIcon } from "feather-icons/dist/icons/x.svg";
import { ReactComponent as EyeIcon } from "feather-icons/dist/icons/eye.svg";
import { ReactComponent as EyeOffIcon } from "feather-icons/dist/icons/eye-off.svg";
import Swal from "sweetalert2";
import { Toast } from "helpers/Alert";
import { useAuthModal } from "context/AuthModalContext";
import { authApi, saveAuthToken } from "services/authApi";
import {
  Overlay,
  ModalBox,
  CloseButton,
  ModalTitle,
  ModalForm,
  FieldRow,
  Field,
  Label,
  Input,
  PasswordWrap,
  TogglePassword,
  PrimaryButton,
  TextLink,
  FooterText,
  CheckboxRow,
  MessageBox,
  ForgotRow,
} from "./AuthModalStyles";

const SwalToast = Swal.mixin({
  toast: true,
  position: "top",
  showConfirmButton: false,
  timer: 4000,
  timerProgressBar: true,
});

const isTechnicalMailError = (msg = "") =>
  /535|BadCredentials|Invalid login|gsmtp|EAUTH|SMTP|nodemailer/i.test(msg);

const friendlyAuthMessage = (msg, fallback) => {
  if (!msg || isTechnicalMailError(msg)) {
    return fallback || "We couldn't send the email right now. Please try again later.";
  }
  return msg;
};

const showAuthError = (error, fallback = "Something went wrong.") => {
  const offline =
    !error.response ||
    error.code === "ERR_NETWORK" ||
    error.message?.includes("Network Error");
  const raw = error.response?.data?.error || error.response?.data?.message || "";
  const text = offline
    ? "Server unavailable. Please try again in a few minutes."
    : friendlyAuthMessage(raw, fallback);

  SwalToast.fire({ icon: "error", title: text });
};

const showAuthMessage = ({ ok, message, fallback }) => {
  const text = friendlyAuthMessage(message, fallback);
  SwalToast.fire({
    icon: ok ? "success" : "error",
    title: text,
  });
};

export default function AuthModal() {
  const { isOpen, view, modalData, closeAuthModal, switchView } = useAuthModal();
  const navigate = useNavigate();

  if (!isOpen) return null;

  const titles = {
    login: "Sign in to access ADCS services easily.",
    signup: "Sign up to book services and manage your account easily.",
    forgot: "Forgot your password?",
    "verify-pending": "Verify your email",
    reset: "Set a new password",
  };

  return (
    <Overlay onClick={closeAuthModal}>
      <ModalBox onClick={(e) => e.stopPropagation()}>
        <CloseButton type="button" onClick={closeAuthModal} aria-label="Close">
          <CloseIcon style={{ width: 20, height: 20 }} />
        </CloseButton>

        <ModalTitle>{titles[view] || "ADCS Account"}</ModalTitle>

        {view === "login" && (
          <LoginForm
            onSuccess={closeAuthModal}
            onForgot={() => switchView("forgot")}
            onSignup={() => switchView("signup")}
            onVerify={(email) => switchView("verify-pending", { email, emailSent: false })}
            initialEmail={modalData.email || ""}
          />
        )}

        {view === "signup" && (
          <SignupForm
            onLogin={() => switchView("login")}
            onRegistered={(email, emailSent) =>
              switchView("verify-pending", { email, emailSent })
            }
            onTerms={() => { closeAuthModal(); navigate("/terms"); }}
            onPolicy={() => { closeAuthModal(); navigate("/policy"); }}
          />
        )}

        {view === "forgot" && (
          <ForgotForm onBack={() => switchView("login")} />
        )}

        {view === "verify-pending" && (
          <VerifyPendingForm
            email={modalData.email || ""}
            initialEmailSent={modalData.emailSent}
            onClose={closeAuthModal}
            onLogin={() => switchView("login")}
          />
        )}

        {view === "reset" && (
          <ResetForm
            token={modalData.token}
            onDone={(email) => switchView("login", { token: undefined, email: email || "" })}
          />
        )}
      </ModalBox>
    </Overlay>
  );
}

function PasswordField({ label, value, onChange, placeholder, name }) {
  const [show, setShow] = useState(false);

  return (
    <Field>
      <Label>{label}</Label>
      <PasswordWrap>
        <Input
          type={show ? "text" : "password"}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required
          minLength={6}
        />
        <TogglePassword type="button" onClick={() => setShow(!show)}>
          {show ? <EyeOffIcon style={{ width: 18, height: 18 }} /> : <EyeIcon style={{ width: 18, height: 18 }} />}
        </TogglePassword>
      </PasswordWrap>
    </Field>
  );
}

function LoginForm({ onSuccess, onForgot, onSignup, onVerify, initialEmail = "" }) {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: initialEmail, password: "" });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (initialEmail) setForm((prev) => ({ ...prev, email: initialEmail }));
  }, [initialEmail]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await authApi.login(form);
      saveAuthToken(data.token, data.user.email, data.user.role);
      Toast({ message: "Login successful!" });
      onSuccess();
      if (data.user.role === "admin") {
        navigate("/admin", { replace: true });
      } else {
        navigate("/dashboard", { replace: true });
      }
    } catch (error) {
      const res = error.response?.data;
      if (res?.needsVerification) {
        Toast({ message: res.error, type: "info" });
        onVerify(form.email);
        return;
      }
      showAuthError(error, "Login failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <ModalForm onSubmit={handleSubmit}>
        <Field>
          <Label>Email address</Label>
          <Input type="email" name="email" placeholder="Enter email" value={form.email} onChange={handleChange} required />
        </Field>
        <PasswordField label="Password" name="password" placeholder="Enter password" value={form.password} onChange={handleChange} />
        <ForgotRow>
          <TextLink type="button" onClick={onForgot}>Forgot password?</TextLink>
        </ForgotRow>
        <PrimaryButton type="submit" disabled={loading}>
          {loading ? "Signing in..." : "Continue"}
        </PrimaryButton>
      </ModalForm>
      <FooterText>
        Don't have an account? <TextLink type="button" onClick={onSignup}>Sign Up</TextLink>
      </FooterText>
    </>
  );
}

function SignupForm({ onLogin, onRegistered, onTerms, onPolicy }) {
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", password: "" });
  const [agreed, setAgreed] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!agreed) {
      Toast({ message: "Please agree to Terms & Conditions.", type: "info" });
      return;
    }
    setLoading(true);
    try {
      const { data } = await authApi.register({
        email: form.email,
        password: form.password,
        name: `${form.firstName} ${form.lastName}`.trim(),
      });
      SwalToast.fire({
        icon: data.emailSent ? "success" : "info",
        title: friendlyAuthMessage(
          data.message,
          data.emailSent
            ? "Check your email to verify your account."
            : "Account created. Please verify your email."
        ),
      });
      onRegistered(form.email, data.emailSent);
    } catch (error) {
      showAuthError(error, "Registration failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <ModalForm onSubmit={handleSubmit}>
        <FieldRow>
          <Field>
            <Label>First name</Label>
            <Input name="firstName" placeholder="First name" value={form.firstName} onChange={handleChange} required />
          </Field>
          <Field>
            <Label>Last name</Label>
            <Input name="lastName" placeholder="Last name" value={form.lastName} onChange={handleChange} required />
          </Field>
        </FieldRow>
        <Field>
          <Label>Email address</Label>
          <Input type="email" name="email" placeholder="Enter email" value={form.email} onChange={handleChange} required />
        </Field>
        <PasswordField label="Password" name="password" placeholder="Enter password" value={form.password} onChange={handleChange} />
        <CheckboxRow>
          <input type="checkbox" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} />
          <span>
            I agree to the{" "}
            <TextLink type="button" onClick={onTerms}>Terms & Conditions</TextLink>
            {" "}and{" "}
            <TextLink type="button" onClick={onPolicy}>Privacy Policy</TextLink>
          </span>
        </CheckboxRow>
        <PrimaryButton type="submit" disabled={loading}>
          {loading ? "Creating account..." : "Continue"}
        </PrimaryButton>
      </ModalForm>
      <FooterText>
        Already have an account? <TextLink type="button" onClick={onLogin}>Log In</TextLink>
      </FooterText>
    </>
  );
}

function ForgotForm({ onBack }) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await authApi.forgotPassword(email);
      setSent(true);
      SwalToast.fire({
        icon: "success",
        title: friendlyAuthMessage(
          data.message,
          "Check your inbox for the reset link."
        ),
      });
    } catch (error) {
      showAuthError(error, "Failed to send reset link.");
    } finally {
      setLoading(false);
    }
  };

  if (sent) {
    return (
      <>
        <MessageBox type="success">
          If an account exists for <strong>{email}</strong>, a reset link has been sent. Check your inbox.
        </MessageBox>
        <FooterText>
          <TextLink type="button" onClick={onBack}>Back to Log In</TextLink>
        </FooterText>
      </>
    );
  }

  return (
    <>
      <ModalForm onSubmit={handleSubmit}>
        <Field>
          <Label>Email address</Label>
          <Input type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </Field>
        <PrimaryButton type="submit" disabled={loading}>
          {loading ? "Sending..." : "Send Reset Link"}
        </PrimaryButton>
      </ModalForm>
      <FooterText>
        <TextLink type="button" onClick={onBack}>Back to Log In</TextLink>
      </FooterText>
    </>
  );
}

function VerifyPendingForm({ email: initialEmail, initialEmailSent, onClose, onLogin }) {
  const [email, setEmail] = useState(initialEmail);
  const [loading, setLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(initialEmailSent !== false);

  const handleResend = async (e) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    try {
      const { data } = await authApi.resendVerification(email);
      setEmailSent(Boolean(data.emailSent));
      showAuthMessage({
        ok: Boolean(data.emailSent),
        message: data.message,
        fallback: "We couldn't send the email right now. Please try again later.",
      });
    } catch (error) {
      const msg = error.response?.data?.error || "Failed to resend.";
      // Already verified via email link — no need for this modal
      if (msg.toLowerCase().includes("already verified")) {
        onClose?.();
        SwalToast.fire({
          icon: "info",
          title: "Email already verified. Please sign in.",
        });
        onLogin?.();
        return;
      }
      showAuthError(error, "We couldn't send the email right now. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <MessageBox type={emailSent ? "success" : "info"}>
        {emailSent ? (
          <>
            We sent a verification link to <strong>{email || "your email"}</strong>.
            Open that email and click <strong>Verify Email Address</strong>.
            You will be signed in automatically — no extra step needed.
            Check spam if you don&apos;t see it.
          </>
        ) : (
          <>
            Please verify your email{email ? <> (<strong>{email}</strong>)</> : ""}.
            Use the link from your signup email, or resend below.
          </>
        )}
      </MessageBox>
      <ModalForm onSubmit={handleResend} style={{ marginTop: 16 }}>
        <Field>
          <Label>Email address</Label>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email"
            required
          />
        </Field>
        <PrimaryButton type="submit" disabled={loading}>
          {loading ? "Sending..." : "Resend Verification Email"}
        </PrimaryButton>
      </ModalForm>
      <FooterText>
        <TextLink type="button" onClick={onLogin}>
          Back to Log In
        </TextLink>
      </FooterText>
    </>
  );
}

function ResetForm({ token, onDone }) {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [resetEmail, setResetEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirm) {
      Toast({ message: "Passwords do not match.", type: "error" });
      return;
    }
    setLoading(true);
    try {
      const { data } = await authApi.resetPassword({ token, password });
      setResetEmail(data.email || "");
      setDone(true);
      Toast({ message: data.message, type: "success" });
    } catch (error) {
      Toast({ message: error.response?.data?.error || "Reset failed.", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  if (!token) {
    return (
      <>
        <MessageBox type="info">Invalid reset link. Please request a new one.</MessageBox>
        <FooterText><TextLink type="button" onClick={() => onDone()}>Back to Log In</TextLink></FooterText>
      </>
    );
  }

  if (done) {
    return (
      <>
        <MessageBox type="success">
          Password updated! Sign in with your email and new password. No verification needed.
        </MessageBox>
        <PrimaryButton type="button" style={{ marginTop: 16 }} onClick={() => onDone(resetEmail)}>
          Log In
        </PrimaryButton>
      </>
    );
  }

  return (
    <ModalForm onSubmit={handleSubmit}>
      <PasswordField label="New password" name="password" placeholder="Enter new password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <PasswordField label="Confirm password" name="confirm" placeholder="Confirm password" value={confirm} onChange={(e) => setConfirm(e.target.value)} />
      <PrimaryButton type="submit" disabled={loading}>
        {loading ? "Updating..." : "Reset Password"}
      </PrimaryButton>
    </ModalForm>
  );
}
