// ADCS Master Course Schedule — Saturday, September 19, 2026 to Wednesday, November 11, 2026
export const COURSE_DATE_RANGE = "September 19, 2026 to November 11, 2026";

export const COURSE_SCHEDULE = [
  {
    week: "Week 1",
    title: "Foundation & Connectivity",
    sessions: [
      { date: "Saturday, September 19, 2026", time: "10:00 AM – 11:30 AM", type: "Classroom", topic: "Overview of data centers and Cloud significance." },
      { date: "Sunday, September 20, 2026", time: "10:00 AM – 11:30 AM", type: "Classroom", topic: "Data center cabling design and connectivity basics." },
      { date: "Wednesday, September 23, 2026", time: "7:00 PM – 8:30 PM", type: "Classroom", topic: "Introduction to single-mode and multi-mode fiber, including common connectors (LC, SC, MPO)." },
    ],
  },
  {
    week: "Week 2",
    title: "Cabling Standards & Physical Architecture",
    sessions: [
      { date: "Saturday, September 26, 2026", time: "10:00 AM – 11:30 AM", type: "Classroom", topic: "Ethernet cabling standards and RJ45 connector awareness." },
      { date: "Sunday, September 27, 2026", time: "10:00 AM – 11:30 AM", type: "Classroom", topic: "Rack systems and server form factors (tower, rack-mounted, blade servers). Power and cooling requirements in server environments." },
      { date: "Sunday, September 27, 2026", time: "1:00 PM – 3:00 PM", type: "Lab", topic: "RJ45 crimping and rack mounting basics." },
      { date: "Wednesday, September 30, 2026", time: "7:00 PM – 8:30 PM", type: "Classroom", topic: "Fundamentals of electrical circuits, breaker systems and PDU (Power Distribution Unit) connectivity knowledge | simulation." },
    ],
  },
  {
    week: "Week 3",
    title: "Power Systems & Hardware Core",
    sessions: [
      { date: "Saturday, October 3, 2026", time: "10:00 AM – 11:30 AM", type: "Classroom", topic: "Server hardware component: Motherboard." },
      { date: "Sunday, October 4, 2026", time: "10:00 AM – 11:30 AM", type: "Classroom", topic: "Server hardware component: CPU, memory, storage devices, NICs, backplane, SAS cables, TPM, riser cards." },
      { date: "Sunday, October 4, 2026", time: "1:00 PM – 3:00 PM", type: "Lab", topic: "Pending Lab Activity." },
      { date: "Wednesday, October 7, 2026", time: "7:00 PM – 8:30 PM", type: "Classroom", topic: "Power supplies, PDU setup and power redundancy. (Part 1)." },
    ],
  },
  {
    week: "Week 4",
    title: "Hardware Deep Dive & Storage (Intensive Lab Week)",
    sessions: [
      { date: "Saturday, October 10, 2026", time: "10:00 AM – 11:30 AM", type: "Classroom", topic: "Server hardware components: motherboard, CPU, memory, storage devices, NICs, backplane, SAS cables, TPM, riser cards, and power supplies. (Feedback and revision Part 2)." },
      { date: "Saturday, October 10, 2026", time: "1:00 PM – 3:00 PM", type: "Bonus Lab", topic: "Server teardown and component identification." },
      { date: "Sunday, October 11, 2026", time: "10:00 AM – 11:30 AM", type: "Classroom", topic: "Storage drive technologies: HDD, SSD, SAS, SATA, and NVMe." },
      { date: "Sunday, October 11, 2026", time: "1:00 PM – 3:00 PM", type: "Lab", topic: "Hardware assembly and drive installations." },
      { date: "Wednesday, October 14, 2026", time: "7:00 PM – 8:30 PM", type: "Classroom", topic: "RAID levels (0, 1, 5, 10) and setup concepts." },
    ],
  },
  {
    week: "Week 5",
    title: "BIOS, Firmware & Diagnostics",
    sessions: [
      { date: "Saturday, October 17, 2026", time: "10:00 AM – 11:30 AM", type: "Classroom", topic: "BIOS/UEFI configuration essentials." },
      { date: "Sunday, October 18, 2026", time: "10:00 AM – 11:30 AM", type: "Classroom", topic: "Power-On Self-Test (POST) process and hardware diagnoses." },
      { date: "Sunday, October 18, 2026", time: "1:00 PM – 3:00 PM", type: "Lab", topic: "BIOS/UEFI configuration and POST error troubleshooting." },
      { date: "Wednesday, October 21, 2026", time: "7:00 PM – 8:30 PM", type: "Classroom", topic: "Performing firmware and driver updates. (Part 1)." },
    ],
  },
  {
    week: "Week 6",
    title: "Operating Systems & Linux",
    sessions: [
      { date: "Saturday, October 24, 2026", time: "10:00 AM – 11:30 AM", type: "Classroom", topic: "Installing operating systems (Windows Server, Linux)." },
      { date: "Sunday, October 25, 2026", time: "10:00 AM – 11:30 AM", type: "Classroom", topic: "Basic Linux command-line operation." },
      { date: "Sunday, October 25, 2026", time: "1:00 PM – 3:00 PM", type: "Lab", topic: "OS installation and Linux command line practice." },
      { date: "Wednesday, October 28, 2026", time: "7:00 PM – 8:30 PM", type: "Classroom", topic: "Understanding IP addressing (IPv4)." },
    ],
  },
  {
    week: "Week 7",
    title: "Networking & Remote Management (Intensive Lab Week)",
    sessions: [
      { date: "Saturday, October 31, 2026", time: "10:00 AM – 11:30 AM", type: "Classroom", topic: "Understand difference between router and switch." },
      { date: "Saturday, October 31, 2026", time: "1:00 PM – 3:00 PM", type: "Bonus Lab", topic: "Network Router, switch and PC connectivity, configuration, and IPs assignment." },
      { date: "Sunday, November 1, 2026", time: "10:00 AM – 11:30 AM", type: "Classroom", topic: "Remote server management via IPMI." },
      { date: "Sunday, November 1, 2026", time: "1:00 PM – 3:00 PM", type: "Lab", topic: "IPMI configuration and remote troubleshooting." },
      { date: "Wednesday, November 4, 2026", time: "7:00 PM – 8:30 PM", type: "Classroom", topic: "Performing firmware and driver updates. (Part 2 - Remote Execution Focus)." },
    ],
  },
  {
    week: "Week 8",
    title: "Operations, Logistics & Final Review",
    sessions: [
      { date: "Saturday, November 7, 2026", time: "10:00 AM – 11:30 AM", type: "Classroom", topic: "Introduction to ticketing systems." },
      { date: "Sunday, November 8, 2026", time: "10:00 AM – 11:30 AM", type: "Classroom", topic: "Parts handling and logistics guidance." },
      { date: "Sunday, November 8, 2026", time: "1:00 PM – 3:00 PM", type: "Lab", topic: "Mock ticketing scenario and full system troubleshooting (Final Practical)." },
      { date: "Wednesday, November 11, 2026", time: "7:00 PM – 8:30 PM", type: "Classroom", topic: "Course wrap-up, final Q&A, and technical assessment." },
    ],
  },
];

export const PRICING = {
  title: "8-Week Server Support BootCamp",
  schedule:
    "90-minute classes on Wednesday evenings and Saturday/Sunday mornings, with 2-hour practical labs on Saturday/Sunday afternoons.",
  monthly: { amount: "$1,400", note: "per month, for 2 monthly payments" },
  payInFull: { amount: "$2,650", note: "includes a $150 discount" },
  total: "$2,800",
  learn: [
    "Server hardware & troubleshooting",
    "BIOS configuration & RAID setup",
    "VMware, Linux, and Windows installation",
    "Advanced network & router configuration",
  ],
};

export const FAQ_ITEMS = [
  {
    q: "Do I need prior IT experience?",
    a: "No. The BootCamp is built for career-changers and beginners as well as those with some IT background. We start from server hardware fundamentals and build up from there.",
  },
  {
    q: "How long is the program and how is it scheduled?",
    a: "The program runs 8 weeks. Classes are held Wednesday evenings and Saturday/Sunday mornings (90 minutes), with hands-on labs on Saturday and Sunday afternoons (2 hours).",
  },
  {
    q: "What will I actually learn?",
    a: "Server hardware and troubleshooting, BIOS configuration and RAID setup, VMware/Linux/Windows installation, and advanced network and router configuration, plus hands-on labs on racking, cabling, and remote server management (IPMI).",
  },
  {
    q: "What are my payment options?",
    a: "You can pay $1,400/month across two monthly payments, or pay in full for $2,650 (a $150 discount off the $2,800 total cost). See the Payment page for how to pay.",
  },
  {
    q: "Where are classes held?",
    a: "Classes and labs are held at our training facility at 22648 Glenn Dr, STE 102, Sterling, VA 20164.",
  },
  {
    q: "Do I need my own equipment?",
    a: "No. Hands-on labs use equipment provided at our training facility. Just bring yourself and a willingness to get hands-on with real server hardware.",
  },
  {
    q: "How do I register?",
    a: "Head to the Registration page and fill out our enrollment form. Our team will follow up with next steps.",
  },
];
