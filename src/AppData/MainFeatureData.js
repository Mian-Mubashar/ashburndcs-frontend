import tw from "twin.macro";
import FastIconImage from "images/fast-icon.svg";
import ShieldIconImage from "images/shield-icon.svg";
import SimpleIconImage from "images/simple-icon.svg";
import SupportIconImage from "images/support-icon.svg";
import ReliableIconImage from "images/reliable-icon.svg";
import CustomizeIconImage from "images/customize-icon.svg";
import serverSecureIllustrationImageSrc from "images/server-secure-illustration.svg";
import serverRedundancyIllustrationImageSrc from "images/server-redundancy-illustration.svg";
import dataCenterImage from "images/newImages/data center.jpeg.jpg";

const HighlightedText = tw.span`text-primary-500`;

export const FeatureCardsData = [
  {
    imageSrc: ShieldIconImage,
    title: "Certified Computer Repair Technicians",
    description:
      "Our team consists of certified computer repair technicians with expertise in laptop repair, PC repair, printer repair, and data center services. Professional computer repair near me with years of experience.",
  },
  {
    imageSrc: SupportIconImage,
    title: "24/7 Emergency Computer Repair Support",
    description:
      "Round-the-clock emergency response services for critical computer repair issues, ensuring minimal downtime and maximum reliability. Fast computer repair service when you need it most.",
  },
  {
    imageSrc: CustomizeIconImage,
    title: "Hardware Specialization & Computer Repair",
    description:
      "Expert knowledge in major computer brands including Dell, HP, Lenovo, Apple, ASUS, and specialized hardware troubleshooting and repair. Professional computer repair shop with certified technicians.",
  },
  {
    imageSrc: ReliableIconImage,
    title: "Preventive Computer Maintenance",
    description:
      "Proactive computer maintenance programs to prevent hardware failures, optimize performance, and extend equipment lifespan. Professional computer repair services with warranty.",
  },
  {
    imageSrc: FastIconImage,
    title: "Rapid Computer Repair Response",
    description:
      "Quick response times with on-site and remote computer repair support capabilities for immediate issue resolution and system restoration. Same-day computer repair service available.",
  },
  {
    imageSrc: SimpleIconImage,
    title: "Infrastructure & Computer Repair Expertise",
    description:
      "Comprehensive understanding of computer repair, data center infrastructure including power, cooling, security, and environmental monitoring. Expert computer repair technicians.",
  },
];

export const MainFeatureData = [
  {
    heading: "Professional Computer Repair & Data Center Services",
    subheading: "Computer Repair Near Me - Sterling, VA",
    imageSrc: dataCenterImage,
    primaryButtonText: "Our Services",
    textOnLeft: true,
    description:
      "Ashburn DCS provides comprehensive computer repair services in Sterling, VA including laptop repair, PC repair, printer repair, and data center server technician services. Our certified computer repair technicians are trained in the latest technologies and industry best practices, ensuring your computers and critical infrastructure operate at peak performance with maximum reliability and security. Professional computer repair shop with competitive pricing and warranty on all repairs.",
  },
  {
    heading: "Computer Hardware Repair & Infrastructure",
    subheading: "Expert Computer Repair Services",
    imageSrc: serverRedundancyIllustrationImageSrc,
    primaryButtonText: "Learn More",
    textOnLeft: false,
    description:
      "Professional computer hardware repair and infrastructure management services with precision installation, proper cable management, and optimal space utilization. Our certified computer repair technicians handle everything from laptop repair to server systems, implementing industry standards for computer repair, rack organization, power distribution, and environmental monitoring. Expert computer repair services for all your hardware needs.",
  },
  {
    heading: "Network & Security Solutions",
    subheading: "Computer Repair & Infrastructure Security",
    imageSrc: serverSecureIllustrationImageSrc,
    primaryButtonText: "Learn More",
    textOnLeft: true,
    description:
      "Comprehensive network infrastructure and computer repair services including switch configuration, routing setup, VLAN management, and security implementation. Our computer repair technicians provide troubleshooting, optimization, and redundancy solutions to ensure high availability and reliable network performance for your computer systems and data center operations. Professional computer repair and IT support services.",
  },
];

export const FeatureData = [
  {
    heading: (
      <>
        Computer Repair <HighlightedText>Services</HighlightedText> & Data Center Expertise
      </>
    ),
    subheading: "Professional Computer Repair Services",
    description:
      "Our certified computer repair technicians provide comprehensive computer repair services including laptop repair, PC repair, printer repair, and infrastructure management to ensure your computers and data center operate at peak efficiency with maximum reliability and security. Professional computer repair near me with fast service and competitive pricing.",
  },
];

export const FeatureCardsDataL1 = [
  {
    imageSrc: ReliableIconImage,
    title: "Computer Hardware Installation",
    description:
      "Professional computer repair services including laptop repair, PC repair, hardware installation with proper diagnostics and documentation",
  },
  {
    imageSrc: FastIconImage,
    title: "Computer Repair & Break-Fix Services",
    description:
      "Rapid diagnosis and repair of computer hardware failures with certified computer repair technicians and quality replacement parts",
  },
  {
    imageSrc: SimpleIconImage,
    title: "Preventive Computer Maintenance",
    description:
      "Regular computer maintenance schedules to prevent hardware failures and optimize computer performance and reliability",
  },
];

export const FeatureCardsDataL2 = [
  {
    imageSrc: ReliableIconImage,
    title: "Network Infrastructure & Computer Repair",
    description:
      "Expert network configuration, troubleshooting, and optimization for reliable computer connectivity and data center operations",
  },
  {
    imageSrc: FastIconImage,
    title: "Computer Administration & Support",
    description:
      "Comprehensive computer management including OS installation, configuration, security, and performance tuning",
  },
  {
    imageSrc: SimpleIconImage,
    title: "Infrastructure Monitoring",
    description:
      "24/7 monitoring of computer systems and data center infrastructure including power, cooling, security, and environmental systems",
  },
];

export const FeatureCardsDataL3 = [
  {
    imageSrc: ReliableIconImage,
    title: "Advanced Computer Troubleshooting",
    description:
      "Expert-level problem resolution for complex computer hardware and infrastructure issues with strategic solutions",
  },
  {
    imageSrc: FastIconImage,
    title: "Infrastructure Design",
    description:
      "Computer system and data center infrastructure planning, design, and implementation for optimal performance and scalability",
  },
  {
    imageSrc: SimpleIconImage,
    title: "Technical Consulting",
    description:
      "Strategic technical consulting for computer optimization, security enhancement, and technology upgrades",
  },
];