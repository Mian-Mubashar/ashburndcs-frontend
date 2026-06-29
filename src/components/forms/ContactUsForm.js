import React, { useState } from "react";
import tw from "twin.macro";
import styled from "styled-components";
import {
  SectionHeading,
  Subheading as SubheadingBase,
} from "components/misc/Headings.js";
import EmailIllustrationSrc from "images/email-illustration.svg";
import { Toast } from "helpers/Alert";
import axios from "axios";

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

const FormCard = styled.div`
  ${tw`mt-8 md:mt-10 max-w-xl mx-auto md:mx-0`}
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 16px;
  padding: 28px 24px;
  box-shadow: 0 12px 40px rgba(100, 21, 255, 0.08);

  @media (min-width: 768px) {
    padding: 32px;
  }
`;

const FormCardHeader = styled.div`
  margin-bottom: 24px;
  padding-bottom: 20px;
  border-bottom: 1px solid #f3f4f6;

  h3 {
    margin: 0 0 6px;
    font-size: 20px;
    font-weight: 800;
    color: #111827;
  }

  p {
    margin: 0;
    font-size: 14px;
    color: #6b7280;
    line-height: 1.5;
  }
`;

const Form = tw.form`flex flex-col gap-5`;

const FieldRow = styled.div`
  display: grid;
  gap: 16px;

  @media (min-width: 640px) {
    grid-template-columns: 1fr 1fr;
  }
`;

const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const Label = styled.label`
  font-size: 13px;
  font-weight: 700;
  color: #374151;
  letter-spacing: 0.02em;
`;

const inputStyles = `
  width: 100%;
  padding: 12px 14px;
  font-size: 15px;
  font-weight: 500;
  color: #111827;
  background: #f9fafb;
  border: 1.5px solid #e5e7eb;
  border-radius: 10px;
  outline: none;
  transition: border-color 0.2s, box-shadow 0.2s, background 0.2s;

  &::placeholder {
    color: #9ca3af;
    font-weight: 400;
  }

  &:focus {
    background: #fff;
    border-color: #6415ff;
    box-shadow: 0 0 0 3px rgba(100, 21, 255, 0.12);
  }

  &:disabled {
    opacity: 0.65;
    cursor: not-allowed;
  }
`;

const Input = styled.input`${inputStyles}`;
const Textarea = styled.textarea`
  ${inputStyles}
  min-height: 120px;
  resize: vertical;
  line-height: 1.6;
`;

const SubmitButton = styled.button`
  width: 100%;
  margin-top: 8px;
  padding: 14px 20px;
  border: none;
  border-radius: 12px;
  background-color: #6415ff;
  background-image: linear-gradient(90deg, #6415ff, #430ce5);
  color: #ffffff;
  font-size: 16px;
  font-weight: 700;
  font-family: inherit;
  line-height: 1.25;
  cursor: pointer;
  appearance: none;
  -webkit-appearance: none;
  transition: transform 0.15s, box-shadow 0.15s, opacity 0.15s;

  &:hover:not(:disabled) {
    transform: translateY(-1px);
    box-shadow: 0 8px 20px rgba(100, 21, 255, 0.35);
    color: #ffffff;
    background-color: #430ce5;
    background-image: linear-gradient(90deg, #6415ff, #430ce5);
  }

  &:disabled {
    opacity: 0.65;
    cursor: not-allowed;
  }
`;

const WhatsAppButton = styled.button`
  width: 100%;
  margin-top: 12px;
  padding: 14px 20px;
  border: none;
  border-radius: 12px;
  background-color: #16a34a;
  background-image: linear-gradient(90deg, #22c55e, #16a34a);
  color: #ffffff;
  font-size: 16px;
  font-weight: 700;
  font-family: inherit;
  line-height: 1.25;
  cursor: pointer;
  appearance: none;
  -webkit-appearance: none;
  transition: transform 0.15s, box-shadow 0.15s;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 8px 20px rgba(34, 197, 94, 0.35);
    color: #ffffff;
    background-color: #15803d;
    background-image: linear-gradient(90deg, #22c55e, #16a34a);
  }
`;

const SuccessButton = styled(SubmitButton)`
  margin-top: 24px;
  max-width: 280px;
  background-color: #ffffff;
  background-image: none;
  color: #15803d;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.12);

  &:hover:not(:disabled) {
    background-color: #f0fdf4;
    background-image: none;
    color: #166534;
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
  }
`;

const SuccessCard = styled.div`
  ${tw`mt-8 p-8 text-center max-w-xl mx-auto md:mx-0`}
  background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%);
  border-radius: 16px;
  box-shadow: 0 12px 40px rgba(34, 197, 94, 0.25);

  h3 {
    margin: 0 0 8px;
    font-size: 26px;
    font-weight: 800;
    color: #fff;
  }

  p {
    margin: 0;
    color: rgba(255, 255, 255, 0.95);
    font-size: 15px;
    line-height: 1.6;
  }
`;

const emptyForm = {
  name: "",
  email: "",
  phone: "",
  subject: "",
  message: "",
};

const ContactFormFields = ({
  data,
  handleChange,
  isSubmitting,
  onSubmit,
  submitButtonText,
}) => {
  const openWhatsAppChat = () => {
    window.open("https://wa.me/+15715313630", "_blank");
  };

  return (
  <Form onSubmit={onSubmit}>
    <FieldRow>
      <Field>
        <Label htmlFor="contact-name">Full Name *</Label>
        <Input
          type="text"
          name="name"
          id="contact-name"
          required
          value={data.name}
          onChange={handleChange}
          placeholder="John Doe"
          disabled={isSubmitting}
        />
      </Field>
      <Field>
        <Label htmlFor="contact-email">Email Address *</Label>
        <Input
          type="email"
          name="email"
          id="contact-email"
          required
          value={data.email}
          onChange={handleChange}
          placeholder="you@example.com"
          disabled={isSubmitting}
        />
      </Field>
    </FieldRow>

    <FieldRow>
      <Field>
        <Label htmlFor="contact-phone">Phone Number *</Label>
        <Input
          type="tel"
          name="phone"
          id="contact-phone"
          required
          value={data.phone}
          onChange={handleChange}
          placeholder="(703) 555-0123"
          disabled={isSubmitting}
        />
      </Field>
      <Field>
        <Label htmlFor="contact-subject">Subject *</Label>
        <Input
          type="text"
          name="subject"
          id="contact-subject"
          required
          value={data.subject}
          onChange={handleChange}
          placeholder="How can we help?"
          disabled={isSubmitting}
        />
      </Field>
    </FieldRow>

    <Field>
      <Label htmlFor="contact-message">Your Message *</Label>
      <Textarea
        name="message"
        id="contact-message"
        required
        value={data.message}
        onChange={handleChange}
        placeholder="Tell us about your IT needs, questions, or project..."
        disabled={isSubmitting}
      />
    </Field>

    <SubmitButton type="submit" className="contact-send-btn" disabled={isSubmitting}>
      {isSubmitting ? "Sending..." : submitButtonText}
    </SubmitButton>
    <WhatsAppButton type="button" className="contact-whatsapp-btn" onClick={openWhatsAppChat}>
      Chat on WhatsApp
    </WhatsAppButton>
  </Form>
  );
};

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
  submitButtonText = "Send Message",
  textOnLeft = true,
}) => {
  const [data, setData] = useState(emptyForm);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = ({ target: { name, value } }) =>
    setData({ ...data, [name]: value });

  const addContact = async (e) => {
    e.preventDefault();
    if (!data.name || !data.email || !data.phone || !data.subject || !data.message) {
      Toast({ message: "Please fill in all required fields", type: "info" });
      return;
    }

    setIsSubmitting(true);
    try {
      const apiUrl = process.env.REACT_APP_BACKEND_URL || "http://localhost:5000/";
      const response = await axios.post(`${apiUrl}api/contact`, data);

      if (response.data.success) {
        Toast({ message: "Thank you! Your message has been sent successfully.", type: "success" });
        setIsSubmitted(true);
        setData(emptyForm);
      } else {
        Toast({ message: response.data.error || "Failed to send message. Please try again.", type: "error" });
      }
    } catch (error) {
      console.error("Contact form error:", error);
      Toast({
        message: error.response?.data?.error || "An error occurred. Please try again later.",
        type: "error",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const successView = (
    <SuccessCard>
      <h3>Thank You!</h3>
      <p>Your message has been sent successfully. We&apos;ll get back to you soon.</p>
      <SuccessButton type="button" onClick={() => setIsSubmitted(false)}>
        Send Another Message
      </SuccessButton>
    </SuccessCard>
  );

  const formView = (
    <FormCard>
      <FormCardHeader>
        <h3>Send us a message</h3>
        <p>Fill out the form below and our team will respond within 24 hours.</p>
      </FormCardHeader>
      <ContactFormFields
        data={data}
        handleChange={handleChange}
        isSubmitting={isSubmitting}
        onSubmit={addContact}
        submitButtonText={submitButtonText}
      />
    </FormCard>
  );

  const pageContent = (
    <TextContent>
      {subheading && <Subheading>{subheading}</Subheading>}
      <Heading>{heading}</Heading>
      {description && <Description>{description}</Description>}
      {isSubmitted ? successView : formView}
    </TextContent>
  );

  if (modal) {
    return (
      <TextColumn textOnLeft={textOnLeft}>
        {pageContent}
      </TextColumn>
    );
  }

  return (
    <Container>
      <TwoColumn>
        <ImageColumn>
          <Image imageSrc={EmailIllustrationSrc} />
        </ImageColumn>
        <TextColumn textOnLeft={textOnLeft}>
          {pageContent}
        </TextColumn>
      </TwoColumn>
    </Container>
  );
};
