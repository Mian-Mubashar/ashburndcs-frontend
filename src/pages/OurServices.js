import React from "react";
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import tw from "twin.macro";
import styled from "styled-components"; //eslint-disable-line
import { css } from "styled-components/macro"; //eslint-disable-line
import Header from "components/headers/light.js";
import Footer from "components/footers/FiveColumnWithInputForm.js";
import MainFeature1 from "components/features/TwoColWithButton.js";

import Features from "components/features/ThreeColSimple.js";
import TeamCardGrid from "components/cards/ProfileThreeColGrid.js";
import SupportIconImage from "images/support-icon.svg";
import ShieldIconImage from "images/shield-icon.svg";
import CustomerLoveIconImage from "images/simple-icon.svg";

import WD from "images/services/WD.jpg";
import MAD from "images/services/MAD.jpg";
import SD from "images/services/SD.jpg";
import IC from "images/services/IC.jpg";
import EC from "images/services/EC.jpg";
import MIS from "images/services/MIS.jpg";
import SEO from "images/services/SEO.jpg";
import SMM from "images/services/SMM.jpg";
import AM from "images/services/AM.jpg";
import DMS from "images/services/DA.jpg";


const Subheading = tw.span`uppercase tracking-wider text-sm`;

export default () => {
  return (
    <AnimationRevealPage>
      <Header />
      <MainFeature1
        subheading={<Subheading>IT Service</Subheading>}
        heading="Website Development"
        buttonRounded={false}
        description=" Craft responsive and intuitive websites that align with your brand, ensuring seamless user experiences and effective communication of your message"
        primaryButtonText="More Info"
        imageSrc={WD}
      />

      <MainFeature1
        subheading={<Subheading>IT Service</Subheading>}
        heading="Mobile App Development"
        buttonRounded={false}
        primaryButtonText="More Info"
        description="Create user-friendly mobile apps that cater to your audience's needs, providing convenient access to your products or services"
        imageSrc={MAD}
        textOnLeft={false}
      />
      <MainFeature1
        subheading={<Subheading>IT Service</Subheading>}
        heading="Software Development"
        buttonRounded={false}
        primaryButtonText="More Info"
        description="Tailor software solutions to optimize your operations, leveraging technology to enhance efficiency and meet specific business goals"
        imageSrc={SD}

      />
      <MainFeature1
        subheading={<Subheading>IT Service</Subheading>}
        heading="IT Consulting"
        buttonRounded={false}
        primaryButtonText="More Info"
        description="Benefit from expert guidance to formulate IT strategies that enhance productivity, security, and align technology with your business objectives"
        imageSrc={IC}
        textOnLeft={false}

      />
      <MainFeature1
        subheading={<Subheading>IT Service</Subheading>}
        heading="E-commerce Solutions"
        buttonRounded={false}
        primaryButtonText="More Info"
        description="Establish and manage online stores with secure payment gateways, inventory management, and user-friendly interfaces for optimal customer experiences."
        imageSrc={EC}
      />
      <MainFeature1
        subheading={<Subheading>IT Service</Subheading>}
        heading="Managed IT Services"
        buttonRounded={false}
        primaryButtonText="More Info"
        description="Delegate IT management to experts, gaining proactive support, maintenance, and troubleshooting to keep your systems running seamlessly"
        imageSrc={MIS}
        textOnLeft={false}
      />
      <MainFeature1
        subheading={<Subheading>Digital Marketing Service</Subheading>}
        heading="Search Engine Optimization (SEO)"
        buttonRounded={false}
        primaryButtonText="More Info"
        description="Enhance online visibility and drive organic traffic through strategic search engine optimization techniques tailored to your target audience."
        imageSrc={SEO}
      />
      <MainFeature1
        subheading={<Subheading>Digital Marketing Service</Subheading>}
        heading="Social Media Marketing"
        buttonRounded={false}
        primaryButtonText="More Info"
        description="Amplify brand presence on social platforms, engaging users and building strong connections through well-crafted content and interactions."
        imageSrc={SMM}
        textOnLeft={false}
      />
      <MainFeature1
        subheading={<Subheading>Digital Marketing Service</Subheading>}
        heading="Affiliate Marketing"
        buttonRounded={false}
        primaryButtonText="More Info"
        description="Collaborate with affiliates to promote your offerings and gain wider exposure."
        imageSrc={AM}
      />
      <MainFeature1
        subheading={<Subheading>Digital Marketing Service</Subheading>}
        heading="Analytics and Data Analysis"
        buttonRounded={false}
        primaryButtonText="More Info"
        description="Monitoring and analyzing data to optimize marketing efforts."
        imageSrc={DMS}
        textOnLeft={false}
      />
      <Features
        subheading={<Subheading>Our Values</Subheading>}
        heading="We follow these."
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
        cards={[
          {
            imageSrc: SupportIconImage,
            title: "24/7 Support",
            description:
              "Lorem ipsum donor amet siti ceali placeholder text alipiscing elit sed do eiusmod temport",
          },
          {
            imageSrc: ShieldIconImage,
            title: "Strong Teams",
            description:
              "Lorem ipsum donor amet siti ceali placeholder text alipiscing elit sed do eiusmod temport",
          },
          {
            imageSrc: CustomerLoveIconImage,
            title: "Customer Satisfaction",
            description:
              "Lorem ipsum donor amet siti ceali placeholder text alipiscing elit sed do eiusmod temport",
          },
        ]}
        linkText=""
      />
      <TeamCardGrid subheading={<Subheading>Our Team</Subheading>} />

      <Footer />
    </AnimationRevealPage>
  );
};
