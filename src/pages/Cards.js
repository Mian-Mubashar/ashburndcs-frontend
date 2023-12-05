import React from "react";
import tw from "twin.macro";
import { css } from "styled-components/macro"; //eslint-disable-line
import { PrimaryButton as PrimaryButtonBase } from "components/misc/Buttons.js";

import {
  ContentWithVerticalPadding,
  Content2Xl,
} from "components/misc/Layouts";
import { SectionDescription as DescriptionBase } from "components/misc/Typography";

import styled from "styled-components";
import { SectionHeading } from "components/misc/Headings.js";
import { motion } from "framer-motion";
import DataCenter from "../images/services/DataCenter1.jpg";
import ITservice from "../images/services/ITservice1.jpg";
import Lplatform from "../images/services/Lplatform.jpg";
import { useNavigate } from "react-router-dom";

const Container = tw.div`relative`;

const SectionDescription = tw(
  DescriptionBase
)`text-center mx-auto text-gray-600 max-w-4xl`;

// const Input = tw.input`mt-6 first:mt-0 border-b-2 py-3 focus:outline-none font-medium transition duration-300 hocus:border-primary-500`
// const Textarea = styled(Input).attrs({as: "textarea"})`
//   ${tw`h-24`}
// `
const SectionContainer = tw(ContentWithVerticalPadding)``;
// const noOfLandingPages = Object.keys(landingPages).length;
const PreviewCards = tw.div`flex flex-wrap -mr-12`;
const PreviewCardContainer = tw.div`mt-24 mx-auto md:mx-0 max-w-lg w-full md:w-1/2 lg:w-1/3 pr-12`;
const PreviewCard = tw(motion.a)`block rounded-lg shadow-raised`;
const PreviewCardImageContainer = tw.div`rounded-t-lg border-0 border-b-0`;
const PreviewCardImage = styled(motion.div)`
  ${(props) =>
    css`
      background-image: url("${props.$imageSrc}");
    `}
  ${tw`h-128 md:h-144 bg-cover bg-left-top`}
`;
const PreviewButton = tw(
  PrimaryButtonBase
)`w-full rounded-b-lg rounded-t-none py-5 font-semibold`;

export default () => {
  const previewImageAnimationVariants = {
    rest: {
      backgroundPositionY: "0%",
    },
    hover: {
      backgroundPositionY: "100%",
      transition: { type: "tween", ease: "linear", duration: 5 },
    },
    navigate: useNavigate(),
  };
  return (
    <Container tw="bg-gray-100 -mx-8 -mt-8 pt-8 px-8">
      <Content2Xl>
        <SectionContainer id="landingPageDemos">
          <SectionHeading>ADCS Services</SectionHeading>
          <SectionDescription>
            ADCS specializes in delivering comprehensive data center solutions,
            e-learning platforms, and IT services. We excel in optimizing data
            management and providing cutting-edge e-learning experiences. Our
            dedicated IT team ensures seamless technological support, making us
            the trusted choice for businesses seeking reliable solutions in the
            digital era
          </SectionDescription>
          <PreviewCards>
            <PreviewCardContainer
              key={Math.random()}
              onClick={() =>
                previewImageAnimationVariants.navigate("/services")
              }
            >
              <PreviewCardImageContainer>
                <PreviewCardImage
                  transition={{ type: "tween" }}
                  variants={previewImageAnimationVariants}
                  $imageSrc={DataCenter}
                />
              </PreviewCardImageContainer>
              <PreviewButton>Data Center</PreviewButton>
            </PreviewCardContainer>
            <PreviewCardContainer
              key={Math.random()}
              onClick={() =>
                previewImageAnimationVariants.navigate("/services")
              }
            >
              <PreviewCardImageContainer>
                <PreviewCardImage
                  transition={{ type: "tween" }}
                  variants={previewImageAnimationVariants}
                  $imageSrc={ITservice}
                />
              </PreviewCardImageContainer>
              <PreviewButton>IT Services</PreviewButton>
            </PreviewCardContainer>
            <PreviewCardContainer
              key={Math.random()}
              onClick={() =>
                previewImageAnimationVariants.navigate("/e-learning")
              }
            >
              <PreviewCardImageContainer>
                <PreviewCardImage
                  transition={{ type: "tween" }}
                  variants={previewImageAnimationVariants}
                  $imageSrc={Lplatform}
                />
              </PreviewCardImageContainer>
              <PreviewButton>E-learning Platform</PreviewButton>
            </PreviewCardContainer>
          </PreviewCards>
        </SectionContainer>
      </Content2Xl>
    </Container>
  );
};
