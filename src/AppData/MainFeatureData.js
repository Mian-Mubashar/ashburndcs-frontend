import tw from "twin.macro";
import FastIconImage from "images/fast-icon.svg";
import ShieldIconImage from "images/shield-icon.svg";
import SimpleIconImage from "images/simple-icon.svg";
import SupportIconImage from "images/support-icon.svg";
import ReliableIconImage from "images/reliable-icon.svg";
import CustomizeIconImage from "images/customize-icon.svg";

/** Unique image per section — no duplicates with hero */
const IMG = {
  bootcamp: "/images/training/section-bootcamp.jpg?v=5",
  labs: "/images/training/tech-lab.jpg?v=5",
  network: "/images/training/section-network.jpg?v=5",
};

const HighlightedText = tw.span`text-primary-500`;

export const FeatureCardsData = [
  {
    imageSrc: ShieldIconImage,
    title: "Taught by Real Technicians",
    description:
      "Our Server Support BootCamp is taught by people who work in data centers every day. You train in a real lab, not just a classroom.",
  },
  {
    imageSrc: SupportIconImage,
    title: "Small Class Sizes",
    description:
      "You get real support from your instructor for all 8 weeks. Lots of lab time to practice on real servers.",
  },
  {
    imageSrc: CustomizeIconImage,
    title: "Learn Server Hardware From Scratch",
    description:
      "We teach server hardware, BIOS setup, and RAID configuration from the ground up. These are the skills data centers look for when they hire.",
  },
  {
    imageSrc: ReliableIconImage,
    title: "Great for Career Changers",
    description:
      "You do not need IT experience to start. We teach the basics first, then build up to real data center technician skills.",
  },
  {
    imageSrc: FastIconImage,
    title: "8 Weeks, Simple Schedule",
    description:
      "Classes are on Wednesday evenings and Saturday and Sunday mornings. Labs are on weekend afternoons. Built for people who work during the day.",
  },
  {
    imageSrc: SimpleIconImage,
    title: "VMware, Linux, and Networking",
    description:
      "You will finish the program knowing how to install VMware, Linux, and Windows, and how to set up routers and networks.",
  },
];

export const MainFeatureData = [
  {
    heading: "Server Support BootCamp",
    subheading: "Data Center Technician Training in Sterling, VA",
    imageSrc: IMG.bootcamp,
    primaryButtonText: "View Course Outline",
    primaryButtonUrl: "/course-outline",
    textOnLeft: true,
    description:
      "Ashburn Data Center Solutions trains data center technicians in Sterling, VA. Our 8-week Server Support BootCamp mixes classroom lessons with hands-on lab work. You will learn server hardware, BIOS and RAID setup, Linux, networking, and remote server management (IPMI), taught by working technicians in a real lab.",
  },
  {
    heading: "Hands-On Hardware Labs",
    subheading: "Real Server Hardware, Real Practice",
    imageSrc: IMG.labs,
    primaryButtonText: "See Full Schedule",
    primaryButtonUrl: "/schedule",
    textOnLeft: false,
    description:
      "Every week has classroom time and lab time. You will practice racking and cabling, RJ45 crimping, hardware assembly, drive installation, BIOS setup, networking, and full system troubleshooting. You leave with real practice, not just theory.",
  },
];

export const FeatureData = [
  {
    heading: (
      <>
        Server Support <HighlightedText>BootCamp</HighlightedText>: Data Center Technician Training
      </>
    ),
    subheading: "8-Week Hands-On Program",
    description:
      "Our instructors train data center technicians through hands-on server hardware, networking, and Linux training. Classroom lessons are paired with real lab sessions so you are ready for real data center work.",
  },
];

export const FeatureCardsDataL1 = [
  {
    imageSrc: ReliableIconImage,
    title: "Server Hardware and Troubleshooting",
    description:
      "Hands-on training in server hardware parts, diagnostics, and troubleshooting, using real equipment in our lab.",
  },
  {
    imageSrc: FastIconImage,
    title: "BIOS Configuration and RAID Setup",
    description:
      "Learn BIOS and UEFI setup, POST diagnostics, and RAID levels (0, 1, 5, 10) through guided lab practice.",
  },
  {
    imageSrc: SimpleIconImage,
    title: "Rack Systems and Cabling",
    description:
      "Practice rack mounting, RJ45 crimping, and cabling standards used in real data centers.",
  },
];

export const FeatureCardsDataL2 = [
  {
    imageSrc: ReliableIconImage,
    title: "VMware, Linux, and Windows",
    description:
      "Install and set up VMware, Linux, and Windows Server, with hands-on command line practice all through the program.",
  },
  {
    imageSrc: FastIconImage,
    title: "Advanced Network Configuration",
    description:
      "Learn the difference between routers and switches, IP addressing, and network setup through hands-on labs.",
  },
  {
    imageSrc: SimpleIconImage,
    title: "Remote Server Management",
    description:
      "Learn IPMI setup and remote troubleshooting, key skills for managing data center servers from anywhere.",
  },
];

export const FeatureCardsDataL3 = [
  {
    imageSrc: ReliableIconImage,
    title: "Firmware and Driver Updates",
    description:
      "Practice firmware and driver updates, including remote updates, on real server hardware.",
  },
  {
    imageSrc: FastIconImage,
    title: "Ticketing and Operations",
    description:
      "Get an introduction to ticketing systems, parts handling, and logistics, the day to day side of data center work.",
  },
  {
    imageSrc: SimpleIconImage,
    title: "Final Technical Assessment",
    description:
      "Finish the BootCamp with a mock ticketing scenario, full system troubleshooting, and a final technical assessment.",
  },
];
