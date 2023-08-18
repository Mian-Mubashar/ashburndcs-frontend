import React from "react";
import tw from "twin.macro";
// import { css } from "styled-components/macro"; //eslint-disable-line

import FAQ from "components/faqs/SingleCol.js";
import Hero from "components/hero/TwoColumnWithInput.js";
import GetStarted from "components/cta/GetStartedLight.js";
import Blog from "components/blogs/GridWithFeaturedPost.js";
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import Footer from "components/footers/FiveColumnWithInputForm.js";
import Features from "components/features/ThreeColWithSideImage.js";
import Pricing from "components/pricing/TwoPlansWithDurationSwitcher.js";
import Testimonial from "components/testimonials/TwoColumnWithImageAndRating.js";
import serverSecureIllustrationImageSrc from "images/server-secure-illustration.svg";
import FeatureStats from "components/features/ThreeColCenteredStatsPrimaryBackground.js";
import MainFeature from "components/features/TwoColWithTwoHorizontalFeaturesAndButton.js";
import serverRedundancyIllustrationImageSrc from "images/server-redundancy-illustration.svg";

const HighlightedText = tw.span`text-primary-500`;

export default () => {
  return (
    <AnimationRevealPage>
      <Hero roundedHeaderButton={true} />
      <Features
        heading={
          <>
            Ashburn <HighlightedText>Features</HighlightedText>
          </>
        }
      />
      <FeatureStats />

      <MainFeature
        subheading="Solution"
        heading="Services"
        imageSrc={serverRedundancyIllustrationImageSrc}
        description="Ashburn Tech offers comprehensive services including SEO optimization, website design and development, and advanced networking solutions. Catering to diverse digital needs, it empowers businesses with effective online presence, seamless connectivity, and strategic growth strategies, ensuring success in today's competitive landscape."
      />
      <MainFeature
        subheading="Courses"
        heading="E-learning"
        imageSrc={serverSecureIllustrationImageSrc}
        textOnLeft={false}
        description="Ashburn e-learning pioneers accessible and interactive online education. Offering diverse courses, expert instructors, and user-friendly platforms, it empowers learners worldwide to acquire new skills, advance careers, and embrace lifelong learning, regardless of geographical constraints."
      />
      <MainFeature
        heading={
          <>
            Ashburn built by and for{" "}
            <HighlightedText>Professionals</HighlightedText>
          </>
        }
        description="Ashburn Tech: Expertly Designed by and for Professionals. A purpose-driven ecosystem, tailored to empower industry leaders, startups, and experts, fostering collaboration, innovation, and success"
      />
      <Testimonial
        heading={
          <>
            Our Clients <HighlightedText>Love Us</HighlightedText>
          </>
        }
        description="Ashburn Tech proudly serves a diverse clientele spanning startups, enterprises, tech innovators, and academic institutions. Our esteemed clients benefit from our cutting-edge services, fostering growth, innovation, and technological advancement."
      />
      <Pricing
        heading={
          <>
            Flexible <HighlightedText>Plans</HighlightedText>
          </>
        }
      />
      <FAQ
        heading={
          <>
            Any <HighlightedText>Questions ?</HighlightedText>
          </>
        }
      />
      {/* <Blog
        subheading=""
        heading={
          <>
            We love <HighlightedText>Writing</HighlightedText>
          </>
        }
      /> */}
      <GetStarted />
      <Footer />
    </AnimationRevealPage>
  );
};
