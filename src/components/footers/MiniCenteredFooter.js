import React from "react";
import tw from "twin.macro";
import styled from "styled-components";
import { Container as ContainerBase } from "components/misc/Layouts.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";
import {
  faServer,
  faGraduationCap,
  faPhone,
  faEnvelope,
  faMapMarkerAlt,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const Container = tw(ContainerBase)`bg-secondary-900 text-gray-200 -mx-8 -mb-8`;
const Content = tw.div`max-w-screen-xl mx-auto py-12 lg:py-16 px-4 sm:px-8`;
const GridContainer = tw.div`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10`;
const Column = tw.div`flex flex-col`;
const ColumnTitle = tw.h5`text-white font-semibold text-lg mb-5 tracking-wide border-b border-gray-700 pb-2 uppercase`;
const ServiceItem = tw.div`flex items-center mb-3 text-sm`;
const ServiceIcon = tw.span`text-yellow-400 mr-3 text-base`;
const ContactItem = tw.div`flex items-start mb-3 text-sm leading-relaxed`;
const ContactIcon = tw.span`text-yellow-400 mr-3 mt-1 text-base`;
const LinkItem = tw.button`text-left text-gray-400 hover:text-white text-sm mb-2 transition duration-200 cursor-pointer bg-transparent border-0 p-0`;
const SocialLinksContainer = tw.div`flex mt-4`;
const SocialLink = styled.a`
  ${tw`inline-flex items-center justify-center w-8 h-8 rounded-full bg-gray-700 hover:bg-secondary-500 text-gray-300 hover:text-white transition duration-300 mr-2`}
`;
const CompanyText = tw.p`text-gray-400 text-sm mb-4 leading-relaxed`;
const CopyrightContainer = tw.div`mt-12 pt-8 border-t border-gray-800 text-center`;
const CopyrightText = tw.p`text-gray-500 text-xs`;

export default function MiniCenteredFooter() {
  const navigate = useNavigate();

  return (
    <Container>
      <Content>
        <GridContainer>
          <Column>
            <ColumnTitle>Training</ColumnTitle>
            <ServiceItem>
              <ServiceIcon><FontAwesomeIcon icon={faGraduationCap} /></ServiceIcon>
              Server Support BootCamp
            </ServiceItem>
            <ServiceItem>
              <ServiceIcon><FontAwesomeIcon icon={faServer} /></ServiceIcon>
              Data Center Technician Skills
            </ServiceItem>
          </Column>

          <Column>
            <ColumnTitle>Contact</ColumnTitle>
            <ContactItem>
              <ContactIcon><FontAwesomeIcon icon={faPhone} /></ContactIcon>
              <a href="tel:+15715313630" style={{ color: "inherit", textDecoration: "none" }}>
                +1 (571) 531-3630
              </a>
            </ContactItem>
            <ContactItem>
              <ContactIcon><FontAwesomeIcon icon={faEnvelope} /></ContactIcon>
              <a href="mailto:ashburndcsolutions@gmail.com" style={{ color: "inherit", textDecoration: "none" }}>
                ashburndcsolutions@gmail.com
              </a>
            </ContactItem>
            <ContactItem>
              <ContactIcon><FontAwesomeIcon icon={faMapMarkerAlt} /></ContactIcon>
              22648 Glenn Dr STE 102<br />
              Sterling, VA 20164
            </ContactItem>
          </Column>

          <Column>
            <ColumnTitle>Quick Links</ColumnTitle>
            <LinkItem type="button" onClick={() => navigate("/")}>Home</LinkItem>
            <LinkItem type="button" onClick={() => navigate("/about-us")}>About Us</LinkItem>
            <LinkItem type="button" onClick={() => navigate("/course-outline")}>Course Outline</LinkItem>
            <LinkItem type="button" onClick={() => navigate("/schedule")}>Schedule</LinkItem>
            <LinkItem type="button" onClick={() => navigate("/registration")}>Registration</LinkItem>
            <LinkItem type="button" onClick={() => navigate("/payment")}>Payment</LinkItem>
            <LinkItem type="button" onClick={() => navigate("/my-enrollment")}>My Enrollment</LinkItem>
            <LinkItem type="button" onClick={() => navigate("/career")}>Career</LinkItem>
            <LinkItem type="button" onClick={() => navigate("/contact-us")}>Contact Us</LinkItem>
          </Column>

          <Column>
            <ColumnTitle>ADCS Training Center</ColumnTitle>
            <CompanyText>
              Hands-on data center technician training in Sterling, VA. Classroom instruction
              plus real lab practice for your IT career.
            </CompanyText>
            <SocialLinksContainer>
              <SocialLink href="https://www.facebook.com/ADCSLLCTrainingCenter" aria-label="Facebook" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faFacebook} />
              </SocialLink>
              <SocialLink href="https://www.linkedin.com" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faLinkedin} />
              </SocialLink>
            </SocialLinksContainer>
          </Column>
        </GridContainer>

        <CopyrightContainer>
          <CopyrightText>
            &copy; {new Date().getFullYear()} ADCS Training Center. All rights reserved.
          </CopyrightText>
        </CopyrightContainer>
      </Content>
    </Container>
  );
}
