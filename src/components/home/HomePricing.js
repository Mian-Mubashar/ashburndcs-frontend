import React from "react";
import tw from "twin.macro";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { PRICING } from "AppData/CourseScheduleData";

const Wrap = tw.section`bg-white py-16 lg:py-20`;
const Inner = tw.div`max-w-screen-xl mx-auto px-4`;
const Title = tw.h2`text-3xl md:text-4xl font-black text-secondary-900 text-center`;
const Sub = tw.p`mt-3 text-gray-600 text-center max-w-2xl mx-auto leading-relaxed`;

const Grid = styled.div`
  margin-top: 2.5rem;
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.25rem;

  @media (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const Card = styled.div`
  border-radius: 1rem;
  border: 1px solid #edf2f7;
  background: #fff;
  padding: 1.5rem;
  text-align: center;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  transition: box-shadow 0.2s, border-color 0.2s;

  ${(p) =>
    p.$featured &&
    `
    border: 2px solid #243e63;
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
    background: linear-gradient(180deg, #ffffff 0%, #f7fafc 100%);
  `}
`;

const Label = tw.p`text-sm font-semibold text-gray-500 uppercase tracking-wide`;
const Amount = tw.p`mt-2 text-3xl md:text-4xl font-black text-secondary-900`;
const Note = tw.p`mt-1 text-sm text-gray-600`;
const Badge = styled.span`
  display: inline-block;
  margin-bottom: 0.5rem;
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  background: #ecc94b;
  color: #1a202c;
  padding: 0.25rem 0.65rem;
  border-radius: 0.25rem;
`;

const Learn = styled.ul`
  margin: 2.5rem auto 0;
  max-width: 42rem;
  padding: 0;
  list-style: none;
  display: grid;
  grid-template-columns: 1fr;
  gap: 0.5rem;

  @media (min-width: 640px) {
    grid-template-columns: 1fr 1fr;
  }
`;

const LearnItem = tw.li`text-sm text-gray-700 font-medium flex items-start`;
const CtaRow = tw.div`mt-10 flex justify-center`;
const Cta = styled.button`
  padding: 0.875rem 2rem;
  border-radius: 0.5rem;
  background: #1a202c;
  color: #fff;
  font-weight: 700;
  font-size: 0.875rem;
  border: none;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background: #2d3748;
  }
`;

/** Homepage tuition block — conversion + SEO */
export default function HomePricing() {
  const navigate = useNavigate();

  return (
    <Wrap id="pricing" aria-labelledby="pricing-heading">
      <Inner>
        <Title id="pricing-heading">Tuition &amp; Pricing</Title>
        <Sub>{PRICING.schedule}</Sub>
        <Grid>
          <Card>
            <Label>Price Per Month</Label>
            <Amount>{PRICING.monthly.amount}</Amount>
            <Note>{PRICING.monthly.note}</Note>
          </Card>
          <Card $featured>
            <Badge>Best Value</Badge>
            <Label>Pay in Full</Label>
            <Amount>{PRICING.payInFull.amount}</Amount>
            <Note>{PRICING.payInFull.note}</Note>
          </Card>
          <Card>
            <Label>Total Program Cost</Label>
            <Amount>{PRICING.total}</Amount>
            <Note>Full 8-week BootCamp tuition</Note>
          </Card>
        </Grid>
        <Learn>
          {PRICING.learn.map((item) => (
            <LearnItem key={item}>
              <span aria-hidden="true" style={{ marginRight: 8 }}>✓</span>
              {item}
            </LearnItem>
          ))}
        </Learn>
        <CtaRow>
          <Cta type="button" onClick={() => navigate("/registration")}>
            Register for the BootCamp
          </Cta>
        </CtaRow>
      </Inner>
    </Wrap>
  );
}
