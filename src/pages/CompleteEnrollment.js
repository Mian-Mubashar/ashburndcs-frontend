import React, { useEffect } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { getAuthToken } from "services/authApi";

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 9999;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
`;

const Modal = styled(motion.div)`
  background: #fff;
  border-radius: 16px;
  padding: 32px;
  width: 100%;
  max-width: 420px;
  box-shadow: 0 24px 60px rgba(0, 0, 0, 0.2);
  text-align: center;
`;

const Title = styled.h2`
  font-size: 22px;
  font-weight: 800;
  margin: 0 0 8px;
`;
const Sub = styled.p`
  color: #6b7280;
  font-size: 14px;
  margin: 0 0 24px;
  line-height: 1.6;
`;
const Btn = styled.button`
  width: 100%;
  padding: 14px;
  border: none;
  border-radius: 10px;
  background: linear-gradient(90deg, #6415ff, #430ce5);
  color: #fff;
  font-weight: 700;
  font-size: 15px;
  cursor: pointer;
`;

/** Old email links pointed here — password step is no longer required. */
export default function CompleteEnrollment() {
  const navigate = useNavigate();
  const auth = getAuthToken();

  useEffect(() => {
    const t = setTimeout(() => {
      navigate(auth?.token ? "/dashboard" : "/login", { replace: true });
    }, 2500);
    return () => clearTimeout(t);
  }, [auth?.token, navigate]);

  return (
    <Overlay>
      <Modal initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
        <Title>You&apos;re already enrolled</Title>
        <Sub>
          No password setup needed anymore. After admin approval you are fully enrolled.
          Sign in with your account to open the Student Dashboard.
        </Sub>
        <Btn type="button" onClick={() => navigate(auth?.token ? "/dashboard" : "/login", { replace: true })}>
          {auth?.token ? "Go to Dashboard" : "Sign In"}
        </Btn>
      </Modal>
    </Overlay>
  );
}
