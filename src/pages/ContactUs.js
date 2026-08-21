import React from "react";
import { useNavigate } from "react-router-dom";
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import styled from "styled-components";
import Header from "components/headers/light.js";
import Footer from "components/footers/MiniCenteredFooter";
import ContactUsForm from "components/forms/ContactUsForm";

const NextSection = styled.section`
  max-width: 1400px;
  margin: 0 auto;
  padding: 12px 12px 56px;
  width: 100%;
`;

const SectionHead = styled.div`
  text-align: center;
  max-width: 560px;
  margin: 0 auto 28px;

  h2 {
    margin: 0 0 8px;
    font-size: clamp(1.35rem, 2.2vw, 1.75rem);
    font-weight: 900;
    color: #0f1c2e;
    letter-spacing: -0.02em;
  }

  p {
    margin: 0;
    font-size: 15px;
    line-height: 1.65;
    color: #64748b;
  }
`;

const CardGrid = styled.div`
  display: grid;
  gap: 16px;
  grid-template-columns: 1fr;

  @media (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const Card = styled.button`
  display: block;
  width: 100%;
  text-align: left;
  background: #fff;
  border: 1px solid #e2e8f0;
  border-radius: 14px;
  padding: 24px 22px;
  cursor: pointer;
  transition: border-color 0.2s, box-shadow 0.2s, transform 0.15s;
  box-shadow: 0 4px 16px rgba(15, 28, 46, 0.04);

  &:hover {
    border-color: #243e63;
    box-shadow: 0 12px 28px rgba(15, 28, 46, 0.1);
    transform: translateY(-2px);
  }
`;

const CardLabel = styled.span`
  display: block;
  margin-bottom: 8px;
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #c9a227;
`;

const CardTitle = styled.span`
  display: block;
  margin-bottom: 8px;
  font-size: 1.05rem;
  font-weight: 800;
  color: #0f1c2e;
`;

const CardBody = styled.span`
  display: block;
  font-size: 14px;
  line-height: 1.55;
  color: #64748b;
`;

const NEXT_STEPS = [
  {
    label: "Curriculum",
    title: "Course Outline & FAQ",
    body: "See what you learn week by week, tuition options, and answers to common questions.",
    to: "/course-outline",
  },
  {
    label: "Dates",
    title: "Schedule & Enroll",
    body: "Check the next cohort calendar and start your enrollment when you are ready.",
    to: "/schedule",
  },
  {
    label: "Apply",
    title: "Registration",
    body: "Begin registration for the Server Support BootCamp at our Sterling facility.",
    to: "/registration",
  },
];

export default () => {
  const navigate = useNavigate();

  return (
    <AnimationRevealPage>
      <Header />
      <ContactUsForm />
      <NextSection>
        <SectionHead>
          <h2>Already know what you need?</h2>
          <p>Skip the form and go straight to the outline, schedule, or registration.</p>
        </SectionHead>
        <CardGrid>
          {NEXT_STEPS.map((item) => (
            <Card key={item.to} type="button" onClick={() => navigate(item.to)}>
              <CardLabel>{item.label}</CardLabel>
              <CardTitle>{item.title}</CardTitle>
              <CardBody>{item.body}</CardBody>
            </Card>
          ))}
        </CardGrid>
      </NextSection>
      <Footer />
    </AnimationRevealPage>
  );
};
