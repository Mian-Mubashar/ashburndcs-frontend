import tw from "twin.macro";
import loveIllustrationImageSrc from "images/love-illustration.svg";

const HighlightedText = tw.span`text-primary-500`;

export const TestimonialData = {
  heading: (
    <>
      Our Clients <HighlightedText>Trust Us</HighlightedText>
    </>
  ),
  description:
    "Ashburn DCS proudly serves clients in Sterling, VA with professional computer repair services, laptop repair, PC repair, printer repair, and data center server technician services. Our certified computer repair technicians ensure maximum uptime, optimal performance, and reliable computer repair services for critical business operations.",
  testimonials: [
    {
      stars: 5,
      profileImageSrc:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=3.25&w=512&h=512&q=80",
      heading: "Exceptional Computer Repair Services",
      quote:
        "Ashburn DCS has transformed our computer repair experience. Their certified computer repair technicians provide expert laptop repair, PC repair, and hardware maintenance that keeps our computers running flawlessly. Their attention to detail and computer repair expertise is unmatched. Professional computer repair near me with fast service and competitive pricing.",
      customerName: "Sterling Business Solutions",
      customerTitle: "IT Manager",
    },
    {
      stars: 5,
      profileImageSrc:
        "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=512&h=512&q=80",
      heading: "Professional Laptop Repair & Printer Services",
      quote:
        "When our laptop and printer hardware failed, Ashburn DCS responded immediately with their expert computer repair services. Their certified computer repair technicians diagnosed and repaired the issues within hours, minimizing our downtime and ensuring business continuity. Highly recommended for any computer repair needs in Sterling, VA.",
      customerName: "Sterling Office Solutions",
      customerTitle: "Operations Director",
    },
    {
      stars: 5,
      profileImageSrc:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=512&h=512&q=80",
      heading: "Comprehensive Computer Repair & IT Support",
      quote:
        "Ashburn DCS provides outstanding computer repair and IT support services. Their computer repair technicians handle everything from laptop repair to network setup with precision and expertise. Their proactive computer maintenance has prevented numerous potential issues and optimized our computer performance. Best computer repair service in Sterling, VA.",
      customerName: "Sterling Tech Solutions",
      customerTitle: "Network Administrator",
    },
  ],
  imageSrc : loveIllustrationImageSrc,
  imageRounded : true,
  imageBorder : false,
  imageShadow : false,
  subheading : "Client Testimonials",
  textOnLeft : false,
};
