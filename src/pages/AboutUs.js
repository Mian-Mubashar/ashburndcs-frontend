import React from "react";
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import tw from "twin.macro";
import styled from "styled-components"; //eslint-disable-line
import { css } from "styled-components/macro"; //eslint-disable-line
import Header from "components/headers/light.js";
import Footer from "components/footers/MiniCenteredFooter";
import MainFeature1 from "components/features/TwoColWithButton.js";
// import MainFeature2 from "components/features/TwoColSingleFeatureWithStats.js";
// import MainFeature3 from "components/features/TwoColSingleFeatureWithStats2.js";
import Features from "components/features/ThreeColSimple.js";
// import Features from "components/features/ThreeColWithSideImage.js";
// import TeamCardGrid from "components/cards/ProfileThreeColGrid.js";

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
        subheading={<Subheading>Our Values</Subheading>}
        heading="We follow these."
        description="Optimize operations through automated workflows, minimizing manual efforts while maximizing productivity and resource utilization"
        cards={[
          {
            imageSrc: SupportIconImage,
            title: "Bespoke Tech Solutions",
            description:
              "Tailored digital innovations to meet unique business needs",
          },
          {
            imageSrc: ShieldIconImage,
            title: "Efficiency Amplification",
            description:
              "Streamlined processes through automation and optimization",
          },
          {
            imageSrc: CustomerLoveIconImage,
            title: "End-to-End Support",
            description:
              "Comprehensive assistance from concept to implementation, driving success in every project",
          },
        ]}
        linkText=""
      />
      {/* <TeamCardGrid 
        subheading={<Subheading>Our Team</Subheading>}
      /> */}

      <Footer />
    </AnimationRevealPage>
  );
};
