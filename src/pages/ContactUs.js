// import React from "react";
// import AnimationRevealPage from "helpers/AnimationRevealPage.js";
// import tw from "twin.macro";
// import { css } from "styled-components/macro"; //eslint-disable-line
// import Header from "components/headers/light.js";
// import Footer from "components/footers/MiniCenteredFooter";
// import ContactUsForm from "components/forms/ContactUsForm";
// import ContactDetails from "components/cards/ThreeColContactDetails.js";

// const Address = tw.span`leading-relaxed`;
// const AddressLine = tw.span`block`;
// const Email = tw.span`text-sm mt-6 block text-gray-500`;
// const Phone = tw.span`text-sm mt-0 block text-gray-500`;

// export default () => {
//   return (
//     <AnimationRevealPage>
//       <Header />
//       <ContactUsForm />
//       <ContactDetails
//         cards={[
//           {
//             title: "Computer Repair & IT Support",
//             description: (
//               <>
//                 <Address>
//                   <AddressLine>Ashburn DCS</AddressLine>
//                   <AddressLine>
//                     Professional Computer Repair Services
//                   </AddressLine>
//                 </Address>
//                 <Email>ashburndcsolutions@gmail.com</Email>
//                 <Phone>+1 (571) 531-3630</Phone>
//                 <br />
//                 <Phone>24/7 Emergency Computer Repair Support</Phone>
//                 <Phone>Same-Day Computer Repair Service Available</Phone>
//                 <Phone>22648 Glenn Dr 102 Sterling VA 20164</Phone>
//               </>
//             ),
//           },
//         ]}
//       />
//       <Footer />
//     </AnimationRevealPage>
//   );
// };


import React from "react";
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import tw from "twin.macro";
import { css } from "styled-components/macro";
import Header from "components/headers/light.js";
import Footer from "components/footers/MiniCenteredFooter";
import ContactUsForm from "components/forms/ContactUsForm";

const Container = tw.div`px-4 py-10 md:px-8 lg:px-24`;
const CardGrid = tw.div`grid gap-6 md:grid-cols-3`;
const Card = tw.div`bg-white shadow-lg rounded-lg p-6 text-center transition-transform transform hover:scale-105 duration-300`;
const Title = tw.h5`text-lg font-semibold mb-2`;
const Description = tw.p`text-sm text-gray-700`;
const Link = tw.a`text-blue-600 hover:underline break-all`;

const MapWrapper = tw.div`mt-10 w-full h-96`;

export default () => {
  return (
    <AnimationRevealPage>
      <Header />
      <ContactUsForm />
      <Container>
        <CardGrid>
          {/* Phone Card */}
          <Card>
            <Title>Phone</Title>
            <Description>
              <Link href="tel:+15715313630">+1 (571) 531-3630</Link>
              <br />
              24/7 Emergency Support
              <br />
              Same-Day Service Available
            </Description>
          </Card>

          {/* Email Card */}
          <Card>
            <Title>Email</Title>
            <Description>
              <Link href="mailto:ashburndcsolutions@gmail.com">
                ashburndcsolutions@gmail.com
              </Link>
            </Description>
          </Card>

          {/* Address Card */}
          <Card>
            <Title>Address</Title>
            <Description>
              <Link
                href="https://maps.app.goo.gl/98fpBNcLerhM2hoQ8"
                target="_blank"
                rel="noopener noreferrer"
              >
                Ashburn DCS
                <br />
                22648 Glenn Dr STE 102,
                <br />
                Sterling, VA 20164
              </Link>
            </Description>
          </Card>
        </CardGrid>

        {/* Embedded Google Map */}
        <MapWrapper>
          <iframe
            title="Ashburn DCS Map"
            width="100%"
            height="100%"
            frameBorder="0"
            style={{ border: 0 }}
            loading="lazy"
            allowFullScreen
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3101.0910922701123!2d-77.42639602535358!3d38.99041734121231!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89b639c9b42f6fb7%3A0x4ee85b0a7f47cb34!2sAshburn%20Data%20Center%20Solutions!5e0!3m2!1sen!2s!4v1754300995830!5m2!1sen!2s"
          ></iframe>
        </MapWrapper>
      </Container>
      <Footer />
    </AnimationRevealPage>
  );
};
