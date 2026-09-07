import React from "react";
import Hero from "components/hero/HeaderHero";
import { TestimonialData } from "AppData/TestimonialData";
import GetStarted from "components/cta/GetStartedLight.js";
import FeatureStats from "components/features/StatFeature";
import Footer from "components/footers/MiniCenteredFooter";
import Testimonial from "components/testimonials/Testimonial";
import AnimationRevealPage from "helpers/AnimationRevealPage.js";

export default function MainLandingPage() {
  return (
    <AnimationRevealPage>
      <Hero />

      <FeatureStats />

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
}
