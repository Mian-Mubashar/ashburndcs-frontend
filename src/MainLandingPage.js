import React from "react";
import tw from "twin.macro";
import Hero from "components/hero/HeaderHero";
import FAQ from "components/faqs/SingleCol.js";
import Banner from "components/testimonials/MainBanner";
import { TestimonialData } from "AppData/TestimonialData";
import GetStarted from "components/cta/GetStartedLight.js";
import FeatureStats from "components/features/StatFeature";
import Footer from "components/footers/MiniCenteredFooter";
import Testimonial from "components/testimonials/Testimonial";
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import Features from "components/features/ThreeColWithSideImage.js";
import { FeatureData, MainFeatureData } from "AppData/MainFeatureData";
import MainFeature from "components/features/TwoColWithTwoHorizontalFeaturesAndButton.js";

const HighlightedText = tw.span`text-primary-500`;

const HOME_FAQS = [
  {
    question: "Do I need prior IT experience to join the BootCamp?",
    answer:
      "No. The BootCamp is built for career changers and total beginners, as well as people with some IT background. We start from server hardware basics and build up from there.",
  },
  {
    question: "How long is the program and how is it scheduled?",
    answer:
      "The program runs 8 weeks. Classes are held Wednesday evenings and Saturday and Sunday mornings (90 minutes each), with hands-on labs on Saturday and Sunday afternoons (2 hours each).",
  },
  {
    question: "What will I actually learn?",
    answer:
      "You will learn server hardware and troubleshooting, BIOS configuration and RAID setup, VMware, Linux, and Windows installation, and network and router configuration. You will also get hands-on labs on racking, cabling, and remote server management with IPMI.",
  },
  {
    question: "What are my payment options?",
    answer:
      "You can pay $1,400 a month across two monthly payments, or pay in full for $2,650 (a $150 discount off the $2,800 total cost).",
  },
  {
    question: "Where are classes held?",
    answer: "Classes and labs are held at our training facility at 22648 Glenn Dr, STE 102, Sterling, VA 20164.",
  },
  {
    question: "Do I need my own equipment?",
    answer:
      "No. Hands-on labs use equipment provided at our training facility. Just bring yourself and a willingness to get hands-on with real server hardware.",
  },
];

export default () => {
  return (
    <AnimationRevealPage>
      <Hero roundedHeaderButton={true} />
      <Banner data={MainFeatureData} />
      {FeatureData.map((value, i) => (
        <Features
          key={i}
          heading={value.heading}
          subheading={value.subheading}
          description={value.description}
        />
      ))}

      <FeatureStats />
      {MainFeatureData.map((value, i) => (
        <MainFeature
          key={i}
          heading={value.heading}
          imageSrc={value.imageSrc}
          subheading={value.subheading}
          textOnLeft={value.textOnLeft}
          description={value.description}
          primaryButtonText={value.primaryButtonText}
        />
      ))}

      <Testimonial
        heading={TestimonialData.heading}
        imageSrc={TestimonialData.imageSrc}
        subheading={TestimonialData.subheading}
        textOnLeft={TestimonialData.textOnLeft}
        imageBorder={TestimonialData.imageBorder}
        imageShadow={TestimonialData.imageShadow}
        description={TestimonialData.description}
        testimonials={TestimonialData.testimonials}
        imageRounded={TestimonialData.imageRounded}
      />
      <FAQ
        heading={
          <>
            Any <HighlightedText>Questions ?</HighlightedText>
          </>
        }
        description="Frequently asked questions about data center technician training in Sterling, VA"
        faqs={HOME_FAQS}
      />
      <GetStarted
        subheading="Ready to Start Your Data Center Career?"
        heading="Join the Server Support BootCamp"
        primaryLinkText="Register Now"
        primaryLinkUrl="/registration"
        secondaryLinkText="View Course Outline"
        secondaryLinkUrl="/course-outline"
      />
      <Footer />
    </AnimationRevealPage>
  );
};
