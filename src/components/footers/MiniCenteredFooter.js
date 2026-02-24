// import React from "react";
// import tw from "twin.macro";
// import styled from "styled-components";
// import { Container as ContainerBase } from "components/misc/Layouts.js";
// import logo from "../../images/logo.svg";
// import { ReactComponent as FacebookIcon } from "../../images/facebook-icon.svg";
// import { ReactComponent as TwitterIcon } from "../../images/twitter-icon.svg";
// import { ReactComponent as YoutubeIcon } from "../../images/youtube-icon.svg";
// import { useNavigate } from "react-router-dom";

// const Container = tw(ContainerBase)`bg-gray-900 text-gray-100 -mx-8 -mb-8`;
// const Content = tw.div`max-w-screen-xl mx-auto py-20 lg:py-24`;

// const Row = tw.div`flex items-center justify-center flex-col px-8`;

// const LogoContainer = tw.div`flex items-center cursor-pointer justify-center md:justify-start`;
// const LogoImg = tw.img`w-8`;
// const LogoText = tw.h5`ml-2 text-2xl font-black tracking-wider`;

// const LinksContainer = tw.div`mt-8 font-medium cursor-pointer flex flex-wrap justify-center items-center flex-col sm:flex-row`;
// const Link = tw.a`border-b-2 border-transparent hocus:text-gray-300 hocus:border-gray-300 pb-1 transition duration-300 mt-2 mx-4`;

// const SocialLinksContainer = tw.div`mt-10`;
// const SocialLink = styled.a`
//   ${tw`cursor-pointer inline-block text-gray-100 hover:text-gray-500 transition duration-300 mx-4`}
//   svg {
//     ${tw`w-5 h-5`}
//   }
// `;

// const CopyrightText = tw.p`text-center mt-10 font-medium tracking-wide text-sm text-gray-600`;
// export default ({ navigate = useNavigate() }) => {
//   return (
//     <Container>
//       <Content>
//         <Row>
//           <LogoContainer>
//             <LogoImg src={logo} style={{width:"6.5rem"}}/>
//           </LogoContainer>
//           <LinksContainer>
//             <Link onClick={() => navigate("/")}>Home</Link>
//             <Link onClick={() => navigate("/services")}>Services</Link>
//             <Link onClick={() => navigate("/e-learning")}>E-Learning</Link>
//             <Link onClick={() => navigate("/about-us")}>About Us</Link>
//             <Link onClick={() => navigate("/contact-us")}>Contact Us</Link>
//           </LinksContainer>
//           <SocialLinksContainer>
//             <SocialLink href="https://facebook.com">
//               <FacebookIcon />
//             </SocialLink>
//             <SocialLink href="https://twitter.com">
//               <TwitterIcon />
//             </SocialLink>
//             <SocialLink href="https://youtube.com">
//               <YoutubeIcon />
//             </SocialLink>
//           </SocialLinksContainer>
//           <CopyrightText>
//             &copy; Copyright 2023, ADCS Inc. All Rights Reserved.
//           </CopyrightText>
//         </Row>
//       </Content>
//     </Container>
//   );
// };







import React from "react";
import tw from "twin.macro";
import styled from "styled-components";
import { Container as ContainerBase } from "components/misc/Layouts.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faTwitter,
  faLinkedin,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import {
  faServer,
  faLaptop,
  faDesktop,
  faPrint,
  faPhone,
  faEnvelope,
  faMapMarkerAlt,
  faClock,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

// Styled Components
const Container = tw(ContainerBase)`bg-gray-900 text-gray-200 -mx-8 -mb-8`;
const Content = tw.div`max-w-screen-xl mx-auto py-12 lg:py-16 px-4 sm:px-8`;

const GridContainer = tw.div`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10`;
const Column = tw.div`flex flex-col`;

const ColumnTitle = tw.h5`text-white font-semibold text-lg mb-5 tracking-wide border-b border-gray-700 pb-2 uppercase`;
const ServiceItem = tw.div`flex items-center mb-3 text-sm hover:text-white transition duration-200`;
const ServiceIcon = tw.span`text-blue-500 mr-3 text-base`;

const ContactItem = tw.div`flex items-start mb-3 text-sm leading-relaxed`;
const ContactIcon = tw.span`text-blue-500 mr-3 mt-1 text-base`;

const LinkItem = tw.a`text-gray-400 hover:text-white text-sm mb-2 transition duration-200 cursor-pointer`;

const SocialLinksContainer = tw.div`flex mt-4`;
const SocialLink = styled.a`
  ${tw`inline-flex items-center justify-center w-8 h-8 rounded-full bg-gray-700 hover:bg-blue-600 text-gray-300 hover:text-white transition duration-300 mr-2`}
`;

const SatisfactionBadge = tw.div`bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full inline-block mb-4 shadow-md`;
const CompanyText = tw.p`text-gray-400 text-sm mb-4 leading-relaxed`;

const CopyrightContainer = tw.div`mt-12 pt-8 border-t border-gray-800 text-center`;
const CopyrightText = tw.p`text-gray-500 text-xs`;

export default ({ navigate = useNavigate() }) => {
  return (
    <Container>
      <Content>
        <GridContainer>
          {/* Services Column */}
          <Column>
            <ColumnTitle>Our Services</ColumnTitle>
            <ServiceItem>
              <ServiceIcon>
                <FontAwesomeIcon icon={faServer} />
              </ServiceIcon>
              Data Center Solutions
            </ServiceItem>
            <ServiceItem>
              <ServiceIcon>
                <FontAwesomeIcon icon={faLaptop} />
              </ServiceIcon>
              Laptop Repair
            </ServiceItem>
            <ServiceItem>
              <ServiceIcon>
                <FontAwesomeIcon icon={faDesktop} />
              </ServiceIcon>
              PC Repair & Maintenance
            </ServiceItem>
            <ServiceItem>
              <ServiceIcon>
                <FontAwesomeIcon icon={faPrint} />
              </ServiceIcon>
              Printer Services
            </ServiceItem>
          </Column>

          {/* Contact Column */}
          <Column>
            <ColumnTitle>Contact Us</ColumnTitle>
            <ContactItem>
              <ContactIcon>
                <FontAwesomeIcon icon={faPhone} />
              </ContactIcon>
              +1 (571) 531-3630
            </ContactItem>
            <ContactItem>
              <ContactIcon>
                <FontAwesomeIcon icon={faEnvelope} />
              </ContactIcon>
              ashburndcsolutions@gmail.com
            </ContactItem>
            <ContactItem>
              <ContactIcon>
                <FontAwesomeIcon icon={faMapMarkerAlt} />
              </ContactIcon>
              22648 Glenn Dr 102<br />
              Sterling VA 20164
            </ContactItem>
            <ContactItem>
              <ContactIcon>
                <FontAwesomeIcon icon={faClock} />
              </ContactIcon>
              24/7 Emergency Service
            </ContactItem>
          </Column>

          {/* Quick Links Column */}
          <Column>
            <ColumnTitle>Quick Links</ColumnTitle>
            <LinkItem onClick={() => navigate("/")}>Home</LinkItem>
            <LinkItem onClick={() => navigate("/d-services")}>Data Center Services</LinkItem>
            <LinkItem onClick={() => navigate("/services")}>Our Services</LinkItem>
            <LinkItem onClick={() => navigate("/about-us")}>About Company</LinkItem>
            <LinkItem onClick={() => navigate("/contact-us")}>Contact Us</LinkItem>
   
          </Column>

          {/* Company Info Column */}
          <Column>
            <ColumnTitle>Tech Solutions Inc.</ColumnTitle>
            <SatisfactionBadge>100% Satisfaction Guaranteed</SatisfactionBadge>
            <CompanyText>
              Professional IT services provided by certified technicians with fast, reliable, and cost-effective solutions for all your business needs.
            </CompanyText>
            <SocialLinksContainer>
              <SocialLink href="https://facebook.com" aria-label="Facebook">
                <FontAwesomeIcon icon={faFacebook} />
              </SocialLink>
              <SocialLink href="https://twitter.com" aria-label="Twitter">
                <FontAwesomeIcon icon={faTwitter} />
              </SocialLink>
              <SocialLink href="https://linkedin.com" aria-label="LinkedIn">
                <FontAwesomeIcon icon={faLinkedin} />
              </SocialLink>
              <SocialLink href="https://instagram.com" aria-label="Instagram">
                <FontAwesomeIcon icon={faInstagram} />
              </SocialLink>
            </SocialLinksContainer>
          </Column>
        </GridContainer>

        <CopyrightContainer>
          <CopyrightText>
            &copy; {new Date().getFullYear()} Tech Solutions Inc. All rights reserved.
          </CopyrightText>
        </CopyrightContainer>
      </Content>
    </Container>
  );
};





