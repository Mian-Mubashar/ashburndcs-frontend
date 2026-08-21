import React, { useState } from "react";
import tw from "twin.macro";
import styled from "styled-components";
import { Toast } from "helpers/Alert";
import axios from "axios";

const MAP_EMBED_SRC =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3101.0910922701123!2d-77.42639602535358!3d38.99041734121231!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89b639c9b42f6fb7%3A0x4ee85b0a7f47cb34!2sAshburn%20Data%20Center%20Solutions!5e0!3m2!1sen!2s!4v1754300995830!5m2!1sen!2s";

const Container = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 40px 12px 20px;
  width: 100%;
`;

const PageHeader = styled.div`
  text-align: center;
  max-width: 720px;
  margin: 0 auto 36px;
`;

const Eyebrow = styled.p`
  display: inline-block;
  margin: 0 0 12px;
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: #243e63;
  background: rgba(36, 62, 99, 0.08);
  padding: 6px 12px;
  border-radius: 999px;
`;

const Heading = styled.h1`
  margin: 0 0 14px;
  font-size: clamp(1.85rem, 3.2vw, 2.65rem);
  font-weight: 900;
  line-height: 1.15;
  color: #0f1c2e;
  letter-spacing: -0.02em;
`;

const Description = styled.p`
  margin: 0 auto 22px;
  font-size: 1.05rem;
  line-height: 1.7;
  color: #4a5568;
  max-width: 38rem;
`;

const TrustRow = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px 18px;
`;

const TrustItem = styled.li`
  font-size: 13px;
  font-weight: 700;
  color: #374151;

  span {
    color: #16a34a;
    margin-right: 6px;
  }
`;

const FormMapGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 24px;
  align-items: stretch;

  @media (min-width: 960px) {
    grid-template-columns: 1.05fr 0.95fr;
    gap: 28px;
  }
`;

const FormCard = styled.div`
  background: #fff;
  border: 1px solid #e2e8f0;
  border-radius: 16px;
  padding: 28px 24px;
  box-shadow: 0 16px 40px rgba(15, 28, 46, 0.07);
  height: 100%;

  @media (min-width: 768px) {
    padding: 32px;
  }
`;

const FormCardHeader = styled.div`
  margin-bottom: 22px;
  padding-bottom: 18px;
  border-bottom: 1px solid #edf2f7;

  h2 {
    margin: 0 0 6px;
    font-size: 1.25rem;
    font-weight: 800;
    color: #0f1c2e;
  }

  p {
    margin: 0;
    font-size: 14px;
    color: #64748b;
    line-height: 1.55;
  }
`;

const MapPanel = styled.div`
  display: flex;
  flex-direction: column;
  background: #fff;
  border: 1px solid #e2e8f0;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 16px 40px rgba(15, 28, 46, 0.07);
  min-height: 480px;

  @media (min-width: 960px) {
    min-height: 100%;
  }
`;

const MapFrame = styled.div`
  flex: 1 1 auto;
  min-height: 260px;
  position: relative;
  background: #cbd5e1;

  iframe {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    border: 0;
    display: block;
  }
`;

const MapDetails = styled.div`
  padding: 20px 22px 22px;
  border-top: 1px solid #e2e8f0;
  background: linear-gradient(180deg, #f8fafc 0%, #fff 100%);
`;

const MapTitle = styled.h3`
  margin: 0 0 14px;
  font-size: 15px;
  font-weight: 800;
  color: #0f1c2e;
`;

const DetailList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 12px;
`;

const DetailItem = styled.li`
  font-size: 14px;
  line-height: 1.5;
  color: #475569;

  strong {
    display: block;
    font-size: 11px;
    font-weight: 800;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: #94a3b8;
    margin-bottom: 2px;
  }

  a {
    color: #0f1c2e;
    font-weight: 700;
    text-decoration: none;
  }

  a:hover {
    color: #6415ff;
  }
`;

const ModalWrap = styled.div`
  width: 100%;
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
  color: #334155;
`;

const inputStyles = `
  width: 100%;
  padding: 12px 14px;
  font-size: 15px;
  font-weight: 500;
  color: #0f1c2e;
  background: #f8fafc;
  border: 1.5px solid #e2e8f0;
  border-radius: 10px;
  outline: none;
  transition: border-color 0.2s, box-shadow 0.2s, background 0.2s;

  &::placeholder {
    color: #94a3b8;
    font-weight: 400;
  }

  &:focus {
    background: #fff;
    border-color: #243e63;
    box-shadow: 0 0 0 3px rgba(36, 62, 99, 0.12);
  }

  &:disabled {
    opacity: 0.65;
    cursor: not-allowed;
  }
`;

const Input = styled.input`${inputStyles}`;
const Textarea = styled.textarea`
  ${inputStyles}
  min-height: 110px;
  resize: vertical;
  line-height: 1.6;
`;

const SubmitButton = styled.button`
  width: 100%;
  margin-top: 4px;
  padding: 14px 20px;
  border: none;
  border-radius: 10px;
  background: #1a202c;
  color: #fff;
  font-size: 15px;
  font-weight: 700;
  font-family: inherit;
  cursor: pointer;
  transition: background 0.2s;

  &:hover:not(:disabled) {
    background: #2d3748;
  }

  &:disabled {
    opacity: 0.65;
    cursor: not-allowed;
  }
`;

const WhatsAppButton = styled.button`
  width: 100%;
  margin-top: 10px;
  padding: 13px 20px;
  border: 2px solid #16a34a;
  border-radius: 10px;
  background: #fff;
  color: #15803d;
  font-size: 15px;
  font-weight: 700;
  font-family: inherit;
  cursor: pointer;
  transition: background 0.2s, color 0.2s;

  &:hover {
    background: #f0fdf4;
  }
`;

const SuccessButton = styled(SubmitButton)`
  margin: 24px auto 0;
  max-width: 260px;
  background: #fff;
  color: #15803d;

  &:hover:not(:disabled) {
    background: #f0fdf4;
  }
`;

const SuccessCard = styled.div`
  padding: 40px 28px;
  text-align: center;
  height: 100%;
  min-height: 320px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: linear-gradient(145deg, #0f1c2e 0%, #1a365d 100%);
  border-radius: 16px;
  box-shadow: 0 16px 40px rgba(15, 28, 46, 0.2);

  h3 {
    margin: 0 0 10px;
    font-size: 1.6rem;
    font-weight: 900;
    color: #fff;
  }

  p {
    margin: 0;
    max-width: 28rem;
    color: rgba(255, 255, 255, 0.88);
    font-size: 15px;
    line-height: 1.65;
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
    window.open(
      "https://wa.me/15715313630?text=" +
        encodeURIComponent("Hi ADCS. I have a question about the Server Support BootCamp."),
      "_blank"
    );
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
            placeholder="Your full name"
            disabled={isSubmitting}
          />
        </Field>
        <Field>
          <Label htmlFor="contact-email">Email *</Label>
          <Input
            type="email"
            name="email"
            id="contact-email"
            required
            value={data.email}
            onChange={handleChange}
            placeholder="you@email.com"
            disabled={isSubmitting}
          />
        </Field>
      </FieldRow>

      <FieldRow>
        <Field>
          <Label htmlFor="contact-phone">Phone *</Label>
          <Input
            type="tel"
            name="phone"
            id="contact-phone"
            required
            value={data.phone}
            onChange={handleChange}
            placeholder="(571) 555-0123"
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
            placeholder="Enrollment, schedule, tuition…"
            disabled={isSubmitting}
          />
        </Field>
      </FieldRow>

      <Field>
        <Label htmlFor="contact-message">Message *</Label>
        <Textarea
          name="message"
          id="contact-message"
          required
          value={data.message}
          onChange={handleChange}
          placeholder="Ask about the BootCamp, next cohort dates, payment options, or visiting the Sterling lab…"
          disabled={isSubmitting}
        />
      </Field>

      <SubmitButton type="submit" className="contact-send-btn" disabled={isSubmitting}>
        {isSubmitting ? "Sending…" : submitButtonText}
      </SubmitButton>
      <WhatsAppButton type="button" className="contact-whatsapp-btn" onClick={openWhatsAppChat}>
        Prefer WhatsApp? Message us
      </WhatsAppButton>
    </Form>
  );
};

export default ({
  modal = false,
  submitButtonText = "Send Message",
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
        Toast({ message: "Message sent. We’ll reply within one business day.", type: "success" });
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
      <h3>Message received</h3>
      <p>
        Thanks for reaching out. A member of the ADCS training team will reply within one
        business day, usually sooner.
      </p>
      <SuccessButton type="button" onClick={() => setIsSubmitted(false)}>
        Send Another Message
      </SuccessButton>
    </SuccessCard>
  );

  const formView = (
    <FormCard>
      <FormCardHeader>
        <h2>Write to the training team</h2>
        <p>
          Enrollment questions, schedule fit, tuition, or a facility visit: tell us what you need
          and we will respond within one business day.
        </p>
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

  if (modal) {
    return <ModalWrap>{isSubmitted ? successView : formView}</ModalWrap>;
  }

  return (
    <Container>
      <PageHeader>
        <Eyebrow>Contact ADCS</Eyebrow>
        <Heading>Talk with the people who run the BootCamp.</Heading>
        <Description>
          Whether you are comparing schedules, checking tuition, or ready to enroll, reach the
          Sterling training team directly. No ticket bots. Real answers about the Server Support
          BootCamp.
        </Description>
        <TrustRow>
          <TrustItem>
            <span>✓</span>Reply within 1 business day
          </TrustItem>
          <TrustItem>
            <span>✓</span>Sterling, VA training facility
          </TrustItem>
          <TrustItem>
            <span>✓</span>(571) 531-3630
          </TrustItem>
        </TrustRow>
      </PageHeader>

      <FormMapGrid>
        {isSubmitted ? successView : formView}
        <MapPanel>
          <MapFrame>
            <iframe
              title="Ashburn Data Center Solutions training facility map"
              src={MAP_EMBED_SRC}
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
            />
          </MapFrame>
          <MapDetails>
            <MapTitle>Visit the training facility</MapTitle>
            <DetailList>
              <DetailItem>
                <strong>Address</strong>
                <a
                  href="https://maps.app.goo.gl/98fpBNcLerhM2hoQ8"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  22648 Glenn Dr, STE 102, Sterling, VA 20164
                </a>
              </DetailItem>
              <DetailItem>
                <strong>Phone</strong>
                <a href="tel:+15715313630">+1 (571) 531-3630</a>
              </DetailItem>
              <DetailItem>
                <strong>Email</strong>
                <a href="mailto:ashburndcsolutions@gmail.com">ashburndcsolutions@gmail.com</a>
              </DetailItem>
            </DetailList>
          </MapDetails>
        </MapPanel>
      </FormMapGrid>
    </Container>
  );
};
