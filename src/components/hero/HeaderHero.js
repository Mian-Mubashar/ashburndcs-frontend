import React from "react";
import tw from "twin.macro";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Header from "../headers/light.js";

const HERO_IMAGE = "/images/training/hero-servers.jpg?v=5";

const Section = styled.section`
  position: relative;
  background: linear-gradient(180deg, #ffffff 0%, #f7fafc 50%, #ffffff 100%);
`;

const TwoColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 1280px;
  margin: 0 auto;
  padding: 3.5rem 1rem;
  gap: 2.5rem;

  @media (min-width: 1024px) {
    flex-direction: row;
    padding: 5rem 1rem;
    gap: 3.5rem;
  }
`;

const LeftColumn = tw.div`relative w-full lg:w-1/2 text-center lg:text-left`;
const RightColumn = tw.div`relative w-full lg:w-1/2 flex justify-center lg:justify-end`;

const Eyebrow = styled.p`
  display: inline-block;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #243e63;
  background: rgba(36, 62, 99, 0.08);
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  margin: 0 0 1rem;
`;

const Heading = tw.h1`font-black text-3xl sm:text-4xl lg:text-5xl text-secondary-900 leading-tight`;
const Accent = tw.span`text-primary-600`;
const Paragraph = tw.p`mt-5 text-base md:text-lg text-gray-700 leading-relaxed max-w-xl mx-auto lg:mx-0`;

const BtnRow = styled.div`
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;

  @media (min-width: 640px) {
    flex-direction: row;
  }

  @media (min-width: 1024px) {
    justify-content: flex-start;
  }
`;

const PrimaryBtn = styled.button`
  width: 100%;
  padding: 0.875rem 2rem;
  border-radius: 0.5rem;
  background: #1a202c;
  color: #fff;
  font-weight: 700;
  font-size: 0.875rem;
  letter-spacing: 0.025em;
  border: none;
  cursor: pointer;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  transition: background 0.2s;

  @media (min-width: 640px) {
    width: auto;
  }

  &:hover {
    background: #2d3748;
  }
`;

const SecondaryBtn = styled.button`
  width: 100%;
  padding: 0.875rem 2rem;
  border-radius: 0.5rem;
  background: #fff;
  color: #1a202c;
  font-weight: 700;
  font-size: 0.875rem;
  letter-spacing: 0.025em;
  border: 2px solid #e2e8f0;
  cursor: pointer;
  transition: border-color 0.2s;

  @media (min-width: 640px) {
    width: auto;
  }

  &:hover {
    border-color: #243e63;
  }
`;

const TrustRow = styled.ul`
  margin: 2rem 0 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 0.5rem 1.25rem;

  @media (min-width: 1024px) {
    justify-content: flex-start;
  }
`;

const TrustItem = tw.li`text-sm font-semibold text-gray-600 flex items-center`;
const Check = tw.span`text-green-600 font-black mr-1`;

const HeroImage = styled.img`
  width: 100%;
  max-width: 560px;
  aspect-ratio: 4 / 3;
  object-fit: cover;
  border-radius: 16px;
  box-shadow: 0 24px 48px rgba(15, 23, 42, 0.16);
`;

/** SEO-first hero: H1, CTAs, trust signals, real photo */
export default function HeaderHero() {
  const navigate = useNavigate();

  return (
    <>
      <Header roundedHeaderButton />
      <Section>
        <TwoColumn>
          <LeftColumn>
            <Eyebrow>8-Week Server Support BootCamp</Eyebrow>
            <Heading>
              Data Center Technician Training in <Accent>Sterling, VA</Accent>
            </Heading>
            <Paragraph>
              Launch your IT career with hands-on data center training. Learn server hardware,
              networking, Linux, and remote management in a real lab, taught by working
              technicians. No prior IT experience required.
            </Paragraph>
            <BtnRow>
              <PrimaryBtn type="button" onClick={() => navigate("/registration")}>
                Register Now
              </PrimaryBtn>
              <SecondaryBtn type="button" onClick={() => navigate("/course-outline")}>
                View Course Outline
              </SecondaryBtn>
            </BtnRow>
            <TrustRow>
              <TrustItem><Check>✓</Check> Hands-on labs</TrustItem>
              <TrustItem><Check>✓</Check> 8-week program</TrustItem>
              <TrustItem><Check>✓</Check> Sterling, VA campus</TrustItem>
              <TrustItem><Check>✓</Check> Beginner-friendly</TrustItem>
            </TrustRow>
          </LeftColumn>
          <RightColumn>
            <HeroImage
              src={HERO_IMAGE}
              alt="Data center server racks used in ADCS technician training in Sterling Virginia"
              loading="eager"
              width={560}
              height={420}
            />
          </RightColumn>
        </TwoColumn>
      </Section>
    </>
  );
}
