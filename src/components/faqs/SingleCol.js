import React, { useState } from "react";
import { motion } from "framer-motion";
import styled from "styled-components";
import tw from "twin.macro";
import {
  SectionHeading,
  Subheading as SubheadingBase,
} from "components/misc/Headings.js";
import { SectionDescription } from "components/misc/Typography.js";
import { Container, ContentWithPaddingXl } from "components/misc/Layouts.js";
import { ReactComponent as ChevronDownIcon } from "feather-icons/dist/icons/chevron-down.svg";
import { ReactComponent as SvgDecoratorBlob1 } from "images/svg-decorator-blob-7.svg";
import { ReactComponent as SvgDecoratorBlob2 } from "images/svg-decorator-blob-8.svg";

const Subheading = tw(SubheadingBase)`mb-4 text-center`;
const Heading = tw(SectionHeading)`w-full`;
const Description = tw(SectionDescription)`w-full text-center`;

const Column = tw.div`flex flex-col items-center`;
const HeaderContent = tw.div``;

const FAQSContainer = tw.dl`mt-12 max-w-4xl relative`;
const FAQ = tw.div`cursor-pointer select-none mt-5 px-8 sm:px-10 py-5 sm:py-4 rounded-lg text-gray-800 hover:text-gray-900 bg-gray-200 hover:bg-gray-300 transition duration-300`;
const Question = tw.dt`flex justify-between items-center`;
const QuestionText = tw.span`text-lg lg:text-xl font-semibold`;
const QuestionToggleIcon = motion(styled.span`
  ${tw`ml-2 transition duration-300`}
  svg {
    ${tw`w-6 h-6`}
  }
`);
const Answer = motion(
  tw.dd`pointer-events-none text-sm sm:text-base leading-relaxed`
);

const DecoratorBlob1 = styled(SvgDecoratorBlob1)`
  ${tw`pointer-events-none -z-20 absolute right-0 top-0 h-56 w-56 opacity-15 transform translate-x-2/3 -translate-y-12 text-teal-400`}
`;
const DecoratorBlob2 = styled(SvgDecoratorBlob2)`
  ${tw`pointer-events-none -z-20 absolute left-0 bottom-0 h-64 w-64 opacity-15 transform -translate-x-2/3 text-primary-500`}
`;

export default ({
  subheading = "FAQS",
  heading = "You have Questions ?",
  description = "Frequently Asked Questions - Computer Repair & Data Center Services in Sterling, VA",
  faqs = [
    {
      question: "What computer repair services do you provide in Sterling, VA?",
      answer:
        "We provide comprehensive computer repair services including laptop repair, PC repair, desktop computer repair, printer repair, virus removal, data recovery, and network troubleshooting. Our certified computer repair technicians handle all major brands including Dell, HP, Lenovo, Apple, and ASUS. Professional computer repair near me with fast service and competitive pricing.",
    },
    {
      question: "Are your computer repair technicians certified and experienced?",
      answer:
        "Yes, our computer repair technicians are certified in major computer brands including Dell, HP, Lenovo, Apple, ASUS, and specialized hardware troubleshooting and repair. They have extensive experience in computer repair operations, hardware troubleshooting, and infrastructure management with industry best practices. Professional computer repair shop with years of experience.",
    },
    {
      question: "Do you provide same-day computer repair service?",
      answer:
        "Yes, we offer same-day computer repair service for common issues like virus removal, software troubleshooting, and basic hardware repairs. For complex computer repair issues, we provide fast turnaround times with on-site and drop-off options available. Our computer repair technicians work efficiently to get your computer back to optimal performance quickly.",
    },
    {
      question: "What is your response time for computer repair services?",
      answer:
        "Our standard response time for computer repair services is 2-4 hours for critical issues, with on-site computer repair support available within 24 hours. For emergency computer repair situations, we can provide immediate remote diagnostics and guidance while dispatching computer repair technicians. Fast computer repair service when you need it most.",
    },
    {
      question: "Do you handle laptop repair and PC repair services?",
      answer:
        "Absolutely. We specialize in laptop repair and PC repair services including hardware diagnostics, screen replacement, battery replacement, motherboard repairs, power supply replacement, RAM upgrades, and complete system builds. Our computer repair technicians provide diagnostic services, virus removal, data recovery, and performance optimization for all computer types.",
    },
    {
      question: "Can you work with my existing computer setup and provide printer repair?",
      answer:
        "Certainly. Our computer repair technicians are experienced with various computer environments and can work with your existing setup, providing upgrades, maintenance, and optimization while ensuring compatibility and minimal disruption. We also provide comprehensive printer repair services for all major brands including HP, Canon, Epson, Brother, and Lexmark.",
    },
  ],
}) => {
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(null);

  const toggleQuestion = (questionIndex) => {
    if (activeQuestionIndex === questionIndex) setActiveQuestionIndex(null);
    else setActiveQuestionIndex(questionIndex);
  };

  return (
    <Container>
      <ContentWithPaddingXl>
        <Column>
          <HeaderContent>
            {subheading && <Subheading>{subheading}</Subheading>}
            <Heading>{heading}</Heading>
            {description && <Description>{description}</Description>}
          </HeaderContent>
          <FAQSContainer>
            {faqs.map((faq, index) => (
              <FAQ
                key={index}
                onClick={() => {
                  toggleQuestion(index);
                }}
                className="group"
              >
                <Question>
                  <QuestionText>{faq.question}</QuestionText>
                  <QuestionToggleIcon
                    variants={{
                      collapsed: { rotate: 0 },
                      open: { rotate: -180 },
                    }}
                    initial="collapsed"
                    animate={
                      activeQuestionIndex === index ? "open" : "collapsed"
                    }
                    transition={{
                      duration: 0.02,
                      ease: [0.04, 0.62, 0.23, 0.98],
                    }}
                  >
                    <ChevronDownIcon />
                  </QuestionToggleIcon>
                </Question>
                <Answer
                  variants={{
                    open: { opacity: 1, height: "auto", marginTop: "16px" },
                    collapsed: { opacity: 0, height: 0, marginTop: "0px" },
                  }}
                  initial="collapsed"
                  animate={activeQuestionIndex === index ? "open" : "collapsed"}
                  transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
                >
                  {faq.answer}
                </Answer>
              </FAQ>
            ))}
          </FAQSContainer>
        </Column>
      </ContentWithPaddingXl>
      <DecoratorBlob1 />
      <DecoratorBlob2 />
    </Container>
  );
};
