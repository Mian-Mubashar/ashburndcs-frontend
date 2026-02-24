import React, { useState } from "react";

import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import { Container, ContentWithPaddingXl } from "components/misc/Layouts";
import styled from "styled-components";
import Header from "components/headers/light.js";
import Footer from "components/footers/FiveColumnWithInputForm.js";
import { SectionHeading } from "components/misc/Headings";
import { PrimaryButton } from "components/misc/Buttons";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Modal from "react-modal";
import { ReactComponent as CloseIcon } from "feather-icons/dist/icons/x.svg";
import { ReactComponent as SvgDecoratorBlob1 } from "images/svg-decorator-blob-5.svg";
import { ReactComponent as SvgDecoratorBlob2 } from "images/svg-decorator-blob-7.svg";

/* -------------------- Styled UI (No Tailwind / No twin) -------------------- */

const PageWrap = styled.div`
  position: relative;
`;

const HeadingRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 24px;
  flex-wrap: wrap;
  margin-bottom: 32px;
`;

const Heading = styled(SectionHeading)`
  color: #1f2937;
  font-weight: 900;
  letter-spacing: -0.02em;
  font-size: clamp(28px, 3vw, 48px);
  line-height: 1.1;
`;

const Accent = styled.span`
  color: #6415ff;
`;

const Description = styled.p`
  margin-top: 12px;
  max-width: 720px;
  color: #6b7280;
  font-size: 15px;
  line-height: 1.7;
`;

const JobsGrid = styled.div`
  margin-top: 28px;
  display: grid;
  grid-template-columns: 1fr;
  gap: 18px;

  @media (min-width: 640px) {
    grid-template-columns: 1fr 1fr;
    gap: 22px;
  }

  @media (min-width: 1024px) {
    grid-template-columns: 1fr 1fr 1fr;
    gap: 26px;
  }
`;

const JobCard = styled.div`
  background: #ffffff;
  border-radius: 16px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  transition: transform 180ms ease, box-shadow 180ms ease;
  border-top: 6px solid #6415ff;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 16px 40px rgba(0, 0, 0, 0.12);
  }
`;

const CardBody = styled.div`
  padding: 22px 22px 0 22px;
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const Pill = styled.span`
  display: inline-flex;
  align-self: flex-start;
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: #6415ff;
  background: rgba(100, 21, 255, 0.12);
  padding: 8px 12px;
  border-radius: 999px;
  margin-bottom: 14px;
`;

const JobTitle = styled.h4`
  font-size: 20px;
  font-weight: 900;
  color: #111827;
  margin: 0 0 10px 0;
`;

const JobDescription = styled.p`
  font-size: 14px;
  line-height: 1.8;
  color: #4b5563;
  margin: 0 0 18px 0;
  flex: 1;
`;

const CardFooter = styled.div`
  padding: 18px 22px 22px 22px;
`;

const ApplyButton = styled(PrimaryButton)`
  width: 100%;
  border-radius: 14px !important;
  padding: 12px 14px !important;
  font-weight: 800 !important;
  letter-spacing: 0.04em !important;
  background: linear-gradient(90deg, #6415ff 0%, #3b0adf 100%) !important;
  transition: transform 160ms ease, box-shadow 160ms ease !important;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 12px 28px rgba(100, 21, 255, 0.25);
  }
`;

const Decorator1 = styled(SvgDecoratorBlob1)`
  position: absolute;
  right: 0;
  top: 0;
  width: 280px;
  height: 280px;
  opacity: 0.12;
  transform: translate(40%, -25%);
  pointer-events: none;
  z-index: -1;
`;

const Decorator2 = styled(SvgDecoratorBlob2)`
  position: absolute;
  left: 0;
  bottom: 0;
  width: 340px;
  height: 340px;
  opacity: 0.12;
  transform: translate(-40%, 25%);
  pointer-events: none;
  z-index: -1;
`;

/* -------------------- Modal UI -------------------- */

const ModalShell = styled.div`
  width: 100%;
  max-width: 720px;
  background: #fff;
  border-radius: 18px;
  overflow: hidden;
  box-shadow: 0 24px 60px rgba(0, 0, 0, 0.25);
`;

const ModalHeader = styled.div`
  position: relative;
  padding: 22px 22px;
  color: #fff;
  background: linear-gradient(90deg, #6415ff 0%, #3b0adf 100%);
`;

const ModalTitle = styled.h3`
  margin: 0;
  font-size: 22px;
  font-weight: 900;
`;

const ModalSubtitle = styled.p`
  margin: 6px 0 0 0;
  font-size: 13px;
  color: rgba(255, 255, 255, 0.85);
`;

const CloseBtn = styled.button`
  position: absolute;
  right: 14px;
  top: 14px;
  width: 38px;
  height: 38px;
  border-radius: 999px;
  border: none;
  cursor: pointer;
  background: rgba(255, 255, 255, 0.18);
  display: grid;
  place-items: center;
  transition: background 160ms ease;

  &:hover {
    background: rgba(255, 255, 255, 0.28);
  }
`;

const ModalBody = styled.div`
  padding: 20px 22px 22px 22px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 14px;
`;

const Grid2 = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 14px;

  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }
`;

const Field = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  font-size: 11px;
  font-weight: 900;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: #6b7280;
  margin-bottom: 8px;
`;

const inputBase = `
  width: 100%;
  padding: 12px 12px;
  border-radius: 14px;
  border: 1px solid #e5e7eb;
  background: #f9fafb;
  font-size: 14px;
  outline: none;
  transition: border 160ms ease, box-shadow 160ms ease, background 160ms ease;

  &:focus {
    border-color: rgba(100, 21, 255, 0.7);
    background: #fff;
    box-shadow: 0 0 0 4px rgba(100, 21, 255, 0.12);
  }
`;

const Input = styled.input`${inputBase}`;
const Select = styled.select`${inputBase}`;

const TextArea = styled.textarea`
  ${inputBase}
  min-height: 120px;
  resize: none;
`;

const SubmitButton = styled(PrimaryButton)`
  width: 100%;
  border-radius: 14px !important;
  padding: 14px 14px !important;
  font-weight: 900 !important;
  letter-spacing: 0.06em !important;
  box-shadow: 0 12px 28px rgba(0, 0, 0, 0.12);
  background: #430ce5 !important;
  color: red !important;

  &:hover {
    transform: none !important;
    box-shadow: 0 12px 28px rgba(59, 46, 46, 0.12) !important;
  }
`;

/* -------------------- Data -------------------- */

const positions = [
  {
    title: "Sales Intern",
    type: "Internship",
    description:
      "Master the art of negotiation and client relationships in the fast-paced tech world. Ideal for ambitious communicators.",
  },
  {
    title: "Marketing Intern",
    type: "Internship",
    description:
      "Drive brand growth through creative campaigns and data-driven strategies. Perfect for creative minds with analytical skills.",
  },
  {
    title: "Server Engineer Intern",
    type: "Internship",
    description:
      "Dive deep into data center infrastructure, server management, and network optimization. Hands-on technical experience guaranteed.",
  },
];

Modal.setAppElement("#root");

/* -------------------- Component -------------------- */

export default function Career() {
  const [selectedPosition, setSelectedPosition] = useState(positions[0].title);
  const [loading, setLoading] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const [formData, setFormData] = useState({
    user_name: "",
    user_email: "",
    user_phone: "",
    position: positions[0].title,
    message: "",
  });

  const openModal = (position) => {
    setSelectedPosition(position);
    setFormData((prev) => ({ ...prev, position }));
    setModalIsOpen(true);
  };

  const closeModal = () => setModalIsOpen(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}api/career`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Build your future! Application sent successfully.");

        setFormData({
          user_name: "",
          user_email: "",
          user_phone: "",
          position: positions[0].title,
          message: "",
        });
        closeModal();
      } else {
        toast.error(data.error || "Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting application:", error);
      toast.error("Network error. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimationRevealPage>
      <Header />
      <Container>
        <ContentWithPaddingXl>
          <PageWrap>
            <HeadingRow>
              <div>
                <Heading>
                  Join Our <Accent>World-Class</Accent> Team
                </Heading>
                <Description>
                  At Ashburn DCS, we don't just offer jobs; we offer careers. Apply now to work with industry leaders and
                  shape the future of technology.
                </Description>
              </div>
            </HeadingRow>

            <JobsGrid>
              {positions.map((job, index) => (
                <JobCard key={index}>
                  <CardBody>
                    <Pill>{job.type}</Pill>
                    <JobTitle>{job.title}</JobTitle>
                    <JobDescription>{job.description}</JobDescription>
                  </CardBody>

                  <CardFooter>
                    <ApplyButton type="button" onClick={() => openModal(job.title)}>
                      Apply Now
                    </ApplyButton>
                  </CardFooter>
                </JobCard>
              ))}
            </JobsGrid>

            <Decorator1 />
            <Decorator2 />
          </PageWrap>

          <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            shouldCloseOnOverlayClick
            shouldCloseOnEsc
            style={{
              overlay: {
                backgroundColor: "rgba(0,0,0,0.55)",
                zIndex: 50,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "16px",
              },
              content: {
                position: "static",
                inset: "auto",
                border: "none",
                background: "transparent",
                padding: 0,
                overflow: "visible",
                maxWidth: "720px",
                width: "100%",
              },
            }}
            contentLabel="Apply Now"
          >
            <ModalShell>
              <ModalHeader>
                <CloseBtn type="button" onClick={closeModal} aria-label="Close modal">
                  <CloseIcon style={{ width: 18, height: 18 }} />
                </CloseBtn>

                <ModalTitle>Apply for {selectedPosition}</ModalTitle>
                <ModalSubtitle>Take the next step in your professional journey</ModalSubtitle>
              </ModalHeader>

              <ModalBody>
                <Form onSubmit={handleSubmit}>
                  <Field>
                    <Label>Full Name</Label>
                    <Input
                      type="text"
                      name="user_name"
                      value={formData.user_name}
                      onChange={handleChange}
                      placeholder="e.g. John Doe"
                      required
                    />
                  </Field>

                  <Grid2>
                    <Field>
                      <Label>Email Address</Label>
                      <Input
                        type="email"
                        name="user_email"
                        value={formData.user_email}
                        onChange={handleChange}
                        placeholder="john@example.com"
                        required
                      />
                    </Field>

                    <Field>
                      <Label>Phone Number</Label>
                      <Input
                        type="text"
                        name="user_phone"
                        value={formData.user_phone}
                        onChange={handleChange}
                        placeholder="+1 (555) 000-0000"
                      />
                    </Field>
                  </Grid2>

                  <Field>
                    <Label>Position</Label>
                    <Select
                      name="position"
                      value={formData.position}
                      onChange={(e) => {
                        setFormData({ ...formData, position: e.target.value });
                        setSelectedPosition(e.target.value);
                      }}
                    >
                      {positions.map((job, index) => (
                        <option key={index} value={job.title}>
                          {job.title}
                        </option>
                      ))}
                    </Select>
                  </Field>

                  <Field>
                    <Label>Cover Letter / Resume Link</Label>
                    <TextArea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell us why you're a great fit, or paste a link to your LinkedIn/Resume..."
                      required
                    />
                  </Field>

                  <SubmitButton type="submit" disabled={loading}>
                    {loading ? "Submitting..." : "Submit Application"}
                  </SubmitButton>
                </Form>
              </ModalBody>
            </ModalShell>
          </Modal>
        </ContentWithPaddingXl>
      </Container>

      <Footer />
      <ToastContainer position="bottom-right" />
    </AnimationRevealPage>
  );
}
