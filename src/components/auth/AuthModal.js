import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ReactComponent as CloseIcon } from "feather-icons/dist/icons/x.svg";
import { ReactComponent as EyeIcon } from "feather-icons/dist/icons/eye.svg";
import { ReactComponent as EyeOffIcon } from "feather-icons/dist/icons/eye-off.svg";
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
            onVerify={(email) => switchView("verify-pending", { email })}
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
            token={modalData.token}
            initialEmailSent={modalData.emailSent}
            onLogin={() => switchView("login")}
          />
        )}

        {view === "reset" && (
          <ResetForm token={modalData.token} onDone={() => switchView("login")} />
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

function LoginForm({ onSuccess, onForgot, onSignup, onVerify }) {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

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
      Toast({ message: res?.error || "Login failed.", type: "error" });
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
      Toast({ message: data.message, type: data.emailSent ? "success" : "info" });
      onRegistered(form.email, data.emailSent);
    } catch (error) {
      Toast({ message: error.response?.data?.error || "Registration failed.", type: "error" });
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
      Toast({ message: data.message, type: "success" });
    } catch (error) {
      Toast({ message: error.response?.data?.error || "Failed to send reset link.", type: "error" });
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

function VerifyPendingForm({ email: initialEmail, token, initialEmailSent, onLogin }) {
  const [email, setEmail] = useState(initialEmail);
  const [loading, setLoading] = useState(false);
  const [verified, setVerified] = useState(false);
  const [emailSent, setEmailSent] = useState(initialEmailSent !== false);

  useEffect(() => {
    if (!token) return;
    authApi.verifyEmail(token)
      .then(({ data }) => {
        setVerified(true);
        Toast({ message: data.message, type: "success" });
      })
      .catch((error) => {
        Toast({ message: error.response?.data?.error || "Verification failed.", type: "error" });
      });
  }, [token]);

  const handleResend = async (e) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    try {
      const { data } = await authApi.resendVerification(email);
      setEmailSent(data.emailSent);
      Toast({ message: data.message, type: data.emailSent ? "success" : "error" });
    } catch (error) {
      Toast({ message: error.response?.data?.error || "Failed to resend.", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  if (verified) {
    return (
      <>
        <MessageBox type="success">Your email is verified! You can now sign in.</MessageBox>
        <PrimaryButton type="button" style={{ marginTop: 16 }} onClick={onLogin}>Log In</PrimaryButton>
      </>
    );
  }

  return (
    <>
      <MessageBox type={emailSent ? "success" : "error"}>
        {emailSent ? (
          <>
            We sent a verification link to <strong>{email}</strong>.
            Open your Gmail inbox, find the email from ADCS, and click the verify button.
            Check spam if you don&apos;t see it.
          </>
        ) : (
          <>Email could not be sent. Ask the admin to configure SMTP, then try resending.</>
        )}
      </MessageBox>
      <ModalForm onSubmit={handleResend} style={{ marginTop: 16 }}>
        <Field>
          <Label>Email address</Label>
          <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter email" required />
        </Field>
        <PrimaryButton type="submit" disabled={loading}>
          {loading ? "Sending..." : "Resend Verification Email"}
        </PrimaryButton>
      </ModalForm>
      <FooterText>
        <TextLink type="button" onClick={onLogin}>Back to Log In</TextLink>
      </FooterText>
    </>
  );
}

function ResetForm({ token, onDone }) {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirm) {
      Toast({ message: "Passwords do not match.", type: "error" });
      return;
    }
    setLoading(true);
    try {
      const { data } = await authApi.resetPassword({ token, password });
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
        <FooterText><TextLink type="button" onClick={onDone}>Back to Log In</TextLink></FooterText>
      </>
    );
  }

  if (done) {
    return (
      <>
        <MessageBox type="success">Password updated successfully!</MessageBox>
        <PrimaryButton type="button" style={{ marginTop: 16 }} onClick={onDone}>Log In</PrimaryButton>
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
