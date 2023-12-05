import React, { useState } from "react";
import tw from "twin.macro";
import Header from "components/headers/light.js";
import ShieldIconImage from "images/shield-icon.svg";
import SupportIconImage from "images/support-icon.svg";
import CustomerLoveIconImage from "images/simple-icon.svg";
import Features from "components/features/ThreeColSimple.js";
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import Footer from "components/footers/MiniCenteredFooter";
// import TeamCardGrid from "components/cards/ProfileThreeColGrid.js";
import MainFeature1 from "components/features/TwoColWithButton.js";
import { ElearningData } from "AppData/E-learningData";
import ModalExample from "components/myComponent/Modal";

const Subheading = tw.span`uppercase tracking-wider text-sm`;

export default () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);
  return (
    <AnimationRevealPage>
      <Header />

      {ElearningData.map((value) => (
        <MainFeature1
          subheading={<Subheading>{value.subheading}</Subheading>}
          heading={value.heading}
          description={value.description}
          imageSrc={value.imageSrc}
          buttonRounded={false}
          primaryButtonUrl={`/E-learning/${value.id}`}
          primaryButtonText={value.primaryButtonText}
          textOnLeft={value.textOnLeft}
          contact={handleOpen}
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
      {/* <TeamCardGrid subheading={<Subheading>Our Team</Subheading>} /> */}

      <Footer />
      <ModalExample open={open} handleOpen={handleOpen} setOpen={setOpen} />
    </AnimationRevealPage>
  );
};
