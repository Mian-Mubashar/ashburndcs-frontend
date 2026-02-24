import React, { useState } from "react";
import tw from "twin.macro";
import styled from "styled-components";
import { css } from "styled-components/macro"; //eslint-disable-line
import {
  SectionHeading,
  Subheading as SubheadingBase,
} from "components/misc/Headings.js";
import { PrimaryButton as PrimaryButtonBase } from "components/misc/Buttons.js";
import EmailIllustrationSrc from "images/email-illustration.svg";
import { collection, addDoc } from "firebase/firestore";
// import { db } from "FireBase";
import { Toast } from "helpers/Alert";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import WhatsAppContact from "components/myComponent/Whatsapp";

const Container = tw.div`relative`;
const TwoColumn = tw.div`flex flex-col md:flex-row justify-between max-w-screen-xl mx-auto py-20 md:py-24`;
const Column = tw.div`w-full max-w-md mx-auto md:max-w-none md:mx-0`;
const ImageColumn = tw(Column)`md:w-5/12 flex-shrink-0 h-80 md:h-auto`;
const TextColumn = styled(Column)((props) => [
  tw`md:w-7/12 mt-16 md:mt-0`,
  props.textOnLeft
    ? tw`md:mr-12 lg:mr-16 md:order-first`
    : tw`md:ml-12 lg:ml-16 md:order-last`,
]);

const Image = styled.div((props) => [
  `background-image: url("${props.imageSrc}");`,
  tw`rounded bg-contain bg-no-repeat bg-center h-full`,
]);
const TextContent = tw.div`lg:py-8 text-center md:text-left`;

const Subheading = tw(SubheadingBase)`text-center md:text-left`;
const Heading = tw(
  SectionHeading
)`mt-4 font-black text-left text-3xl sm:text-4xl lg:text-5xl text-center md:text-left leading-tight`;
const Description = tw.p`mt-4 text-center md:text-left text-sm md:text-base lg:text-lg font-medium leading-relaxed text-secondary-100`;

const Form = tw.form`mt-8 md:mt-10 text-sm flex flex-col max-w-sm mx-auto md:mx-0`;
const Input = tw.input`mt-6 first:mt-0 border-b-2 py-3 focus:outline-none font-medium transition duration-300 hocus:border-primary-500`;
const Textarea = styled(Input).attrs({ as: "textarea" })`
  ${tw`h-24`}
`;

const SubmitButton = tw(PrimaryButtonBase)`inline-block mt-8`;

export default ({
  modal = false,
  subheading = "Contact Us",
  heading = (
    <>
      Feel free to <span tw="text-primary-500">get in touch</span>
      <wbr /> with us.
    </>
  ),
  description = "Connect with ADCS's dedicated tech experts for reliable solutions. Reach out now for prompt assistance with your technical needs",
  submitButtonText = "Send",
  textOnLeft = true,
}) => {
  const navigate = useNavigate();

  const [data, setData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleChange = ({ target: { name, value } }) =>
    setData({ ...data, [name]: value });
  
  const addContact = async (e) => {
    e.preventDefault();
    if (
      data.name === "" ||
      data.email === "" ||
      data.subject === "" ||
      data.message === ""
    ) {
      Toast({ message: "Please fill all data in the fields", type: "info" });
    } else {
      setIsSubmitting(true);
      try {
        const response = await axios.post(
          "https://ashburnbe-abdulbasits-projects-c78465b7.vercel.app/api/contact",
          {
            name: data.name,
            email: data.email,
            subject: data.subject,
            message: data.message,
          }
        );
        
        if (response.data.success) {
          Toast({ message: "Thank you! Your message has been sent successfully.", type: "success" });
          setIsSubmitted(true);
          // Reset form
          setData({
            name: "",
            email: "",
            subject: "",
            message: "",
          });
        } else {
          Toast({ message: response.data.error || "Failed to send message. Please try again.", type: "error" });
        }
      } catch (error) {
        console.error("Contact form error:", error);
        Toast({ 
          message: error.response?.data?.error || "An error occurred. Please try again later.", 
          type: "error" 
        });
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <>
      {!modal ? (
        <Container>
          <TwoColumn>
            <ImageColumn>
              <Image imageSrc={EmailIllustrationSrc} />
            </ImageColumn>
            <TextColumn textOnLeft={textOnLeft}>
              <TextContent>
                {subheading && <Subheading>{subheading}</Subheading>}
                <Heading>{heading}</Heading>
                {description && <Description>{description}</Description>}
                {isSubmitted ? (
                  <div tw="mt-8 p-6 bg-green-500 border-2 border-green-200 rounded-lg text-center">
                    <h3 tw="text-2xl font-bold text-green-700 mb-2">Thank You!</h3>
                    <p tw="text-green-600">Your message has been sent successfully. We'll get back to you soon.</p>
                    <SubmitButton 
                      onClick={() => setIsSubmitted(false)}
                      tw="mt-4"
                    >
                      Send Another Message
                    </SubmitButton>
                  </div>
                ) : (
                  <Form>
                    <Input
                      type="email"
                      name="email"
                      id="email"
                      required
                      value={data.email}
                      onChange={handleChange}
                      placeholder="Your Email Address"
                      disabled={isSubmitting}
                    />
                    <Input
                      type="text"
                      name="name"
                      id="name"
                      required
                      value={data.name}
                      onChange={handleChange}
                      placeholder="Full Name"
                      disabled={isSubmitting}
                    />
                    <Input
                      type="text"
                      name="subject"
                      id="subject"
                      required
                      value={data.subject}
                      onChange={handleChange}
                      placeholder="Subject"
                      disabled={isSubmitting}
                    />
                    <Textarea
                      name="message"
                      id="message"
                      required
                      value={data.message}
                      onChange={handleChange}
                      placeholder="Your Message Here"
                      disabled={isSubmitting}
                    />
                    <SubmitButton 
                      onClick={addContact}
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Sending..." : submitButtonText}
                    </SubmitButton>
                    <WhatsAppContact />
                  </Form>
                )}
              </TextContent>
            </TextColumn>
          </TwoColumn>
        </Container>
      ) : (
        <TextColumn textOnLeft={textOnLeft}>
          <TextContent>
            {subheading && <Subheading>{subheading}</Subheading>}
            <Heading>{heading}</Heading>
            {description && <Description>{description}</Description>}
            {isSubmitted ? (
              <div tw="mt-8 p-6 bg-green-500 border-2 border-green-200 rounded-lg text-center">
                <h3 tw="text-2xl font-bold text-green-700 mb-2">Thank You!</h3>
                <p tw="text-green-600">Your message has been sent successfully. We'll get back to you soon.</p>
                <SubmitButton 
                  onClick={() => setIsSubmitted(false)}
                  tw="mt-4"
                >
                  Send Another Message
                </SubmitButton>
              </div>
            ) : (
              <Form>
                <Input
                  type="email"
                  name="email"
                  id="email"
                  required
                  value={data.email}
                  onChange={handleChange}
                  placeholder="Your Email Address"
                  disabled={isSubmitting}
                />
                <Input
                  type="text"
                  name="name"
                  id="name"
                  required
                  value={data.name}
                  onChange={handleChange}
                  placeholder="Full Name"
                  disabled={isSubmitting}
                />
                <Input
                  type="text"
                  name="subject"
                  id="subject"
                  required
                  value={data.subject}
                  onChange={handleChange}
                  placeholder="Subject"
                  disabled={isSubmitting}
                />
                <Textarea
                  name="message"
                  id="message"
                  required
                  value={data.message}
                  onChange={handleChange}
                  placeholder="Your Message Here"
                  disabled={isSubmitting}
                />
                <SubmitButton 
                  onClick={addContact}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Sending..." : submitButtonText}
                </SubmitButton>
                <WhatsAppContact />
              </Form>
            )}
          </TextContent>
        </TextColumn>
      )}
    </>
  );
};
