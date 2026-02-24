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
import { serviceData } from "AppData/ServiceData";
import ModalExample from "components/myComponent/Modal";

const Subheading = tw.span`uppercase tracking-wider text-sm`;

export default () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);
  return (
    <AnimationRevealPage>
      <Header />

      {serviceData.map((value) => (
        <MainFeature1
          key={value.id}
          subheading={<Subheading>{value.subheading}</Subheading>}
          heading={value.heading}
          description={value.description}
          imageSrc={value.imageSrc}
          buttonRounded={true}
          primaryButtonUrl={`/services/${value.id}?type=service`}
          primaryButtonText={value.primaryButtonText}
          textOnLeft={value.textOnLeft}
          contact={handleOpen}
        />
      ))}

      <Features
        subheading={<Subheading>Our Expertise</Subheading>}
        heading="Professional Computer Repair & IT Services"
        description="Comprehensive computer repair services in Sterling, VA including laptop repair, PC repair, printer repair, virus removal, data recovery, and IT support. Professional computer repair near me with certified technicians and competitive pricing."
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
      <ModalExample open={open} handleOpen={handleOpen} setOpen={setOpen} />
    </AnimationRevealPage>
  );
};
