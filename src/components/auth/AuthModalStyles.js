import React from "react";
import styled from "styled-components";
import tw from "twin.macro";

export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
  background: rgba(0, 0, 0, 0.45);
  backdrop-filter: blur(4px);
`;

export const ModalBox = styled.div`
  position: relative;
  width: 100%;
  max-width: 440px;
  max-height: 90vh;
  overflow-y: auto;
  background: #fff;
  border-radius: 16px;
  padding: 32px 28px 28px;
  box-shadow: 0 24px 60px rgba(0, 0, 0, 0.2);
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 16px;
  right: 16px;
  width: 32px;
  height: 32px;
  border: none;
  background: transparent;
  color: #9ca3af;
  cursor: pointer;
  border-radius: 50%;
  display: grid;
  place-items: center;
  transition: background 0.2s, color 0.2s;

  &:hover {
    background: #f3f4f6;
    color: #374151;
  }
`;

export const ModalTitle = styled.h2`
  font-size: 22px;
  font-weight: 800;
  color: #111827;
  line-height: 1.35;
  margin: 0 0 24px;
  padding-right: 24px;
`;

export const ModalForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const FieldRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

export const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

export const Label = styled.label`
  font-size: 13px;
  font-weight: 600;
  color: #374151;
`;

export const Input = styled.input`
  width: 100%;
  padding: 12px 14px;
  border: 1.5px solid #e8d5ff;
  border-radius: 10px;
  font-size: 14px;
  outline: none;
  transition: border-color 0.2s, box-shadow 0.2s;

  &:focus {
    border-color: #6415ff;
    box-shadow: 0 0 0 3px rgba(100, 21, 255, 0.12);
  }

  &::placeholder {
    color: #9ca3af;
  }
`;

export const PasswordWrap = styled.div`
  position: relative;

  input {
    padding-right: 44px;
  }
`;

export const TogglePassword = styled.button`
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  border: none;
  background: transparent;
  color: #9ca3af;
  cursor: pointer;
  padding: 4px;
  display: grid;
  place-items: center;

  &:hover {
    color: #6415ff;
  }
`;

export const PrimaryButton = styled.button`
  width: 100%;
  padding: 14px;
  border: none;
  border-radius: 10px;
  font-size: 15px;
  font-weight: 700;
  color: #fff;
  cursor: pointer;
  background: linear-gradient(90deg, #6415ff 0%, #430ce5 100%);
  transition: transform 0.15s, box-shadow 0.15s;
  margin-top: 4px;

  &:hover:not(:disabled) {
    transform: translateY(-1px);
    box-shadow: 0 8px 20px rgba(100, 21, 255, 0.35);
  }

  &:disabled {
    opacity: 0.55;
    cursor: not-allowed;
  }
`;

export const TextLink = styled.button`
  border: none;
  background: none;
  color: #6415ff;
  font-weight: 600;
  cursor: pointer;
  padding: 0;
  font-size: inherit;

  &:hover {
    text-decoration: underline;
  }
`;

export const FooterText = styled.p`
  text-align: center;
  font-size: 14px;
  color: #6b7280;
  margin: 20px 0 0;
`;

export const CheckboxRow = styled.label`
  display: flex;
  align-items: flex-start;
  gap: 10px;
  font-size: 13px;
  color: #4b5563;
  cursor: pointer;
  line-height: 1.5;

  input {
    margin-top: 3px;
    accent-color: #6415ff;
  }
`;

export const MessageBox = styled.div`
  padding: 14px;
  border-radius: 10px;
  font-size: 14px;
  line-height: 1.6;
  text-align: center;
  ${(props) =>
    props.type === "success"
      ? `background:#f0fdf4;color:#166534;border:1px solid #bbf7d0;`
      : `background:#eff6ff;color:#1e40af;border:1px solid #bfdbfe;`}
`;

export const ForgotRow = styled.div`
  text-align: right;
  margin-top: -8px;
`;

export const DevLinkBox = styled.div`
  margin-top: 14px;
  padding: 14px;
  border-radius: 10px;
  background: #fef3c7;
  border: 1px solid #fcd34d;
  font-size: 13px;
  color: #92400e;
  line-height: 1.6;
  word-break: break-all;

  a {
    color: #6415ff;
    font-weight: 700;
    text-decoration: underline;
  }
`;
