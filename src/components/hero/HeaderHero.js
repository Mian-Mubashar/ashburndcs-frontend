import React from "react";
import tw from "twin.macro";
import styled from "styled-components";
import Header from "../headers/light.js";
import DesignIllustration from "../../images/newImages/HeaderImage.png";
import { ReactComponent as SvgDecoratorBlob1 } from "../../images/svg-decorator-blob-1.svg";

const Container = tw.div`relative`;
const Paragraph = tw.p`my-5 lg:my-8 text-base xl:text-lg`;
const IllustrationContainer = tw.div`flex justify-center lg:justify-end items-center`;
const RightColumn = tw.div`relative mt-12 lg:mt-0 flex-1 flex flex-col justify-center lg:self-end`;
const LeftColumn = tw.div`relative lg:w-5/12 text-center max-w-lg mx-auto lg:max-w-none lg:text-left`;
const TwoColumn = tw.div`flex flex-col lg:flex-row lg:items-center max-w-screen-xl mx-auto py-20 md:py-24`;
const Heading = tw.h1`font-bold text-3xl md:text-3xl lg:text-4xl xl:text-5xl text-gray-900 leading-tight `;
const DecoratorBlob1 = styled(SvgDecoratorBlob1)`
  ${tw`pointer-events-none opacity-5 absolute left-0 bottom-0 h-64 w-64 transform -translate-x-2/3 -z-10`}
`;
const HighlightedText = tw.span`text-primary-500`;

export default () => {
  return (
    <>
      <Header />
      <Container>
        <TwoColumn>
          <LeftColumn>
            <Heading>
              Professional <HighlightedText>Computer Repair</HighlightedText> & Data Center Services
            </Heading>
            <Paragraph>
              Expert laptop repair, PC repair, computer repair, and printer repair services with certified technicians. 
              We provide fast, reliable computer repair services including hardware diagnostics, virus removal, data recovery, 
              and network troubleshooting. Our data center server technicians ensure your critical infrastructure operates 
              at peak performance with 24/7 support and emergency response services.
            </Paragraph>
            <Paragraph>
              <HighlightedText>Trusted Computer Repair & IT Services in Sterling, VA</HighlightedText>
            </Paragraph>
          </LeftColumn>
          <RightColumn>
            <IllustrationContainer>
              <img
                tw="min-w-0 w-full max-w-lg xl:max-w-3xl"
                src={DesignIllustration}
                alt="Computer Repair and Data Center Services"
                style={{ borderRadius: "16px", height: "80%", width: "80%" }}
              />
            </IllustrationContainer>
          </RightColumn>
        </TwoColumn>
        <DecoratorBlob1 />
      </Container>
    </>
  );
};
