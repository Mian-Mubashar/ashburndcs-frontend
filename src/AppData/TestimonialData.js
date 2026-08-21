import tw from "twin.macro";

const HighlightedText = tw.span`text-primary-500`;

export const TestimonialData = {
  heading: (
    <>
      Our Students <HighlightedText>Trust Us</HighlightedText>
    </>
  ),
  description:
    "Ashburn Data Center Solutions trains data center technicians in Sterling, VA. Our hands-on Server Support BootCamp gets you real, practiced skills in server hardware, networking, and Linux, so you are ready for real data center work.",
  testimonials: [
    {
      stars: 5,
      profileImageSrc:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=3.25&w=512&h=512&q=80",
      heading: "Real Hands-On Experience",
      quote:
        "The BootCamp gave me real hands-on time with server hardware I had never touched before. Racking, cabling, RAID setup, all of it. The labs made the classroom material actually stick.",
      customerName: "Server Support BootCamp Graduate",
      customerTitle: "Class of 2026",
    },
    {
      stars: 5,
      profileImageSrc:
        "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=512&h=512&q=80",
      heading: "No IT Background Needed",
      quote:
        "I came in with zero IT background. The instructors started from the basics, and by week 8 I was comfortable troubleshooting real server issues. I recommend it to anyone changing careers.",
      customerName: "Server Support BootCamp Graduate",
      customerTitle: "Class of 2026",
    },
    {
      stars: 5,
      profileImageSrc:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=512&h=512&q=80",
      heading: "Instructors Who Actually Work in the Field",
      quote:
        "What stood out was that our instructors were working data center technicians, not just people reading slides. Every class tied back to a real, practical situation.",
      customerName: "Server Support BootCamp Graduate",
      customerTitle: "Class of 2026",
    },
  ],
  imageSrc: "/images/training/hero-lab.png?v=3",
  imageRounded: true,
  imageBorder: false,
  imageShadow: true,
  subheading: "Student Testimonials",
  textOnLeft: false,
};
