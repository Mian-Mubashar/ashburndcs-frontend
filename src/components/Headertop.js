import React from "react";
import styled from "styled-components";

const PHONE = "(571) 531-3630";
const PHONE_HREF = "tel:+15715313630";
const MAP_URL = "https://maps.app.goo.gl/H5WSXNNQpUsMNrGa9";

/** Coolvibe-style top utility bar — polished ADCS strip */
const Bar = styled.div`
  background: linear-gradient(90deg, #00111c 0%, #001a2c 45%, #062a42 100%);
  color: rgba(255, 255, 255, 0.95);
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.18);
`;

const Inner = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0.75rem 1.15rem;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 0.45rem 1rem;
  text-align: center;
  font-size: 0.95rem;
  font-weight: 500;
  letter-spacing: 0.01em;

  @media (min-width: 768px) {
    font-size: 1rem;
    padding: 0.85rem 1.5rem;
    gap: 0.5rem 1.15rem;
  }
`;

const Highlight = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 700;
  color: #fff;
`;

const Dot = styled.span`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #f5a623;
  box-shadow: 0 0 0 3px rgba(245, 166, 35, 0.25);
  flex-shrink: 0;
`;

const Separator = styled.span`
  opacity: 0.4;
  font-weight: 400;
  user-select: none;

  @media (max-width: 640px) {
    display: none;
  }
`;

const Muted = styled.span`
  color: rgba(255, 255, 255, 0.82);
  font-weight: 500;

  @media (max-width: 640px) {
    display: none;
  }
`;

const Link = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  color: #fff;
  font-weight: 700;
  text-decoration: none;
  white-space: nowrap;
  padding: 0.2rem 0.55rem;
  border-radius: 6px;
  transition: background 0.15s, color 0.15s;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
    color: #f5c518;
  }
`;

const LocationLink = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  color: rgba(255, 255, 255, 0.85);
  text-decoration: none;
  white-space: nowrap;
  font-weight: 500;
  transition: color 0.15s;

  &:hover {
    color: #fff;
  }

  @media (max-width: 900px) {
    display: none;
  }
`;

const Icon = styled.span`
  font-size: 0.9em;
  opacity: 0.95;
`;

export default function Headertop() {
  return (
    <Bar role="banner">
      <Inner>
        <Highlight>
          <Dot aria-hidden="true" />
          Hands-on BootCamp
        </Highlight>
        <Separator>·</Separator>
        <Muted>Train to become a Data Center Technician in Sterling, VA.</Muted>
        <Separator>·</Separator>
        <LocationLink href={MAP_URL} target="_blank" rel="noopener noreferrer">
          <Icon aria-hidden="true">📍</Icon>
          Suite 102, Sterling VA
        </LocationLink>
        <Separator>·</Separator>
        <Link href={PHONE_HREF}>
          <Icon aria-hidden="true">📞</Icon>
          Call {PHONE}
        </Link>
      </Inner>
    </Bar>
  );
}
