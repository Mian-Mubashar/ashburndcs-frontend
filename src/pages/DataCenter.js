import React, { useState } from "react";
import tw from "twin.macro";
import Header from "components/headers/light.js";
import ShieldIconImage from "images/shield-icon.svg";
import SupportIconImage from "images/support-icon.svg";
import CustomerLoveIconImage from "images/simple-icon.svg";
import Features from "components/features/ThreeColSimple.js";
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import Footer from "components/footers/MiniCenteredFooter";
import MainFeature1 from "components/features/TwoColWithButton.js";
import ModalExample from "components/myComponent/Modal";
import { DServiceData } from "AppData/Data-Service";

const Subheading = tw.span`uppercase tracking-wider text-sm`;

export default () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);

  return (
    <AnimationRevealPage>
      <Header />

      {DServiceData.map((value) => (
        <MainFeature1
          key={value.id}
          subheading={<Subheading>{value.subheading}</Subheading>}
          heading={value.heading}
          description={value.description}
          imageSrc={value.imageSrc}
          buttonRounded={true}
          primaryButtonUrl={`/d-services/${value.id}?type=Data-service`}
          primaryButtonText={value.primaryButtonText}
          textOnLeft={value.textOnLeft}
          contact={handleOpen}
        />
      ))}

      <Features
        subheading={<Subheading>Our Expertise</Subheading>}
        heading="Data Center Server Technician Services"
        description="Professional data center infrastructure management with certified technicians, 24/7 support, and industry best practices for optimal performance and reliability"
        cards={[
          {
            imageSrc: SupportIconImage,
            title: "Certified Technicians",
            description:
              "Our team consists of certified data center technicians with expertise in server hardware, networking, and infrastructure management",
          },
          {
            imageSrc: ShieldIconImage,
            title: "24/7 Emergency Support",
            description:
              "Round-the-clock emergency response services for critical data center issues, ensuring minimal downtime and maximum reliability",
          },
          {
            imageSrc: CustomerLoveIconImage,
            title: "Hardware Specialization",
            description:
              "Expert knowledge in major server brands including Dell, HP, IBM, Cisco, and specialized hardware troubleshooting and repair",
          },
        ]}
        linkText=""
      />

      <Footer />
      <ModalExample open={open} handleOpen={handleOpen} setOpen={setOpen} />
    </AnimationRevealPage>
  );
};
