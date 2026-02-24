import React from "react";
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import tw from "twin.macro";
import styled from "styled-components"; //eslint-disable-line
import { css } from "styled-components/macro"; //eslint-disable-line
import Header from "components/headers/light.js";
import Footer from "components/footers/MiniCenteredFooter";
import MainFeature1 from "components/features/TwoColWithButton.js";
import Features from "components/features/ThreeColSimple.js";

import SupportIconImage from "images/support-icon.svg";
import ShieldIconImage from "images/shield-icon.svg";
import CustomerLoveIconImage from "images/simple-icon.svg";
import { MainFeatureData } from "AppData/MainFeatureData";

const Subheading = tw.span`uppercase tracking-wider text-sm`;
export default () => {
  return (
    <AnimationRevealPage>
      <Header />
      {MainFeatureData.map((value, i) => (
        <MainFeature1
          key={i}
          heading={value.heading}
          imageSrc={value.imageSrc}
          subheading={value.subheading}
          textOnLeft={value.textOnLeft}
          description={value.description}
          primaryButtonText={value.primaryButtonText}
        />
      ))}
      <Features
        subheading={<Subheading>Our Expertise</Subheading>}
        heading="Computer Repair & Data Center Services"
        description="Professional computer repair services in Sterling, VA with certified computer repair technicians, 24/7 support, and industry best practices for optimal performance and reliability. Expert laptop repair, PC repair, printer repair, and data center services."
        cards={[
          {
            imageSrc: SupportIconImage,
            title: "Certified Computer Repair Technicians",
            description:
              "Our team consists of certified computer repair technicians with expertise in laptop repair, PC repair, printer repair, and data center services. Professional computer repair near me with years of experience.",
          },
          {
            imageSrc: ShieldIconImage,
            title: "24/7 Emergency Computer Repair Support",
            description:
              "Round-the-clock emergency response services for critical computer repair issues, ensuring minimal downtime and maximum reliability. Fast computer repair service when you need it most.",
          },
          {
            imageSrc: CustomerLoveIconImage,
            title: "Hardware Specialization & Computer Repair",
            description:
              "Expert knowledge in major computer brands including Dell, HP, Lenovo, Apple, ASUS, and specialized hardware troubleshooting and repair. Professional computer repair shop with certified technicians.",
          },
        ]}
        linkText=""
      />
      <Footer />
    </AnimationRevealPage>
  );
};
