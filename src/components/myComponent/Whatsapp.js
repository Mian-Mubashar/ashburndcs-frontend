import React from "react";
import styled from "styled-components";

const WhatsAppButton = styled.button`
  display: block;
  width: 100%;
  margin-top: 12px;
  padding: 14px 20px;
  border: none;
  border-radius: 12px;
  background-color: #16a34a;
  background-image: linear-gradient(90deg, #22c55e, #16a34a);
  color: #ffffff;
  font-size: 16px;
  font-weight: 700;
  font-family: inherit;
  line-height: 1.25;
  cursor: pointer;
  appearance: none;
  -webkit-appearance: none;
  transition: transform 0.15s, box-shadow 0.15s;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 8px 20px rgba(34, 197, 94, 0.35);
    color: #ffffff;
    background-color: #15803d;
    background-image: linear-gradient(90deg, #22c55e, #16a34a);
  }
`;

const WhatsAppContact = () => {
  const openWhatsAppChat = () => {
    window.open("https://wa.me/+15715313630", "_blank");
  };

  return (
    <WhatsAppButton type="button" className="contact-whatsapp-btn" onClick={openWhatsAppChat}>
      Chat on WhatsApp
    </WhatsAppButton>
  );
};

export default WhatsAppContact;
