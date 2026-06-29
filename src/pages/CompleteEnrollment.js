import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { useSearchParams, useNavigate } from "react-router-dom";
import { enrollmentApi } from "services/enrollmentApi";
import { saveAuthToken } from "services/authApi";
import { saveEnrollmentTrack } from "utils/enrollmentStorage";
import { Toast } from "helpers/Alert";

const Overlay = styled.div`
  position: fixed; inset: 0; z-index: 9999;
  background: rgba(0,0,0,0.5); backdrop-filter: blur(4px);
  display: flex; align-items: center; justify-content: center; padding: 16px;
`;

const Modal = styled(motion.div)`
  background: #fff; border-radius: 16px; padding: 32px;
  width: 100%; max-width: 420px; box-shadow: 0 24px 60px rgba(0,0,0,0.2);
`;

const Title = styled.h2`font-size: 22px; font-weight: 800; margin: 0 0 8px;`;
const Sub = styled.p`color: #6b7280; font-size: 14px; margin: 0 0 24px;`;
const Input = styled.input`
  width: 100%; padding: 12px 14px; border: 1.5px solid #e8d5ff; border-radius: 10px;
  font-size: 14px; margin-bottom: 14px; outline: none;
  &:focus { border-color: #6415ff; box-shadow: 0 0 0 3px rgba(100,21,255,0.12); }
`;
const Btn = styled.button`
  width: 100%; padding: 14px; border: none; border-radius: 10px;
  background: linear-gradient(90deg,#6415ff,#430ce5); color: #fff;
  font-weight: 700; font-size: 15px; cursor: pointer;
  &:disabled { opacity: 0.6; }
`;

export default function CompleteEnrollment() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!token) return;
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirm) {
      Toast({ message: "Passwords do not match.", type: "error" });
      return;
    }
    setLoading(true);
    try {
      const { data } = await enrollmentApi.completeRegistration({ token, password });
      saveAuthToken(data.token, data.user.email, data.user.role);
      saveEnrollmentTrack({
        email: data.user.email,
        fullName: data.user.name || data.user.email,
        courseTitle: "Course",
        status: "completed",
      });
      setDone(true);
      Toast({ message: data.message, type: "success" });
      setTimeout(() => navigate("/dashboard"), 2000);
    } catch (error) {
      Toast({ message: error.response?.data?.error || "Registration failed.", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Overlay>
      <AnimatePresence>
        <Modal initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
          {done ? (
            <>
              <Title>You're Enrolled!</Title>
              <Sub>Redirecting to your dashboard...</Sub>
            </>
          ) : !token ? (
            <>
              <Title>Complete Registration</Title>
              <Sub>
                Open the registration link from your email, or go to My Enrollment to send a new link.
              </Sub>
              <Btn type="button" onClick={() => navigate("/my-enrollment")}>
                Go to My Enrollment
              </Btn>
            </>
          ) : (
            <>
              <Title>Complete Registration</Title>
              <Sub>Create your password to access your student dashboard.</Sub>
              <form onSubmit={handleSubmit}>
                <Input type="password" placeholder="Create password (min 6 chars)" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={6} />
                <Input type="password" placeholder="Confirm password" value={confirm} onChange={(e) => setConfirm(e.target.value)} required minLength={6} />
                <Btn type="submit" disabled={loading}>{loading ? "Setting up..." : "Complete Registration"}</Btn>
              </form>
            </>
          )}
        </Modal>
      </AnimatePresence>
    </Overlay>
  );
}
