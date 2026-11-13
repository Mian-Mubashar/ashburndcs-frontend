// ADCS Master Course Schedule — Saturday, November 7, 2026 to Wednesday, December 30, 2026
export const COURSE_DATE_RANGE = "November 7, 2026 to December 30, 2026";

export const COURSE_SCHEDULE = [
  {
    week: "Week 1",
    title: "Foundation & Connectivity",
    sessions: [
      { date: "Saturday, November 7, 2026", time: "10:00 AM – 11:30 AM", type: "Virtual (Zoom)", topic: "Overview of data centers and Cloud significance." },
      { date: "Sunday, November 8, 2026", time: "10:00 AM – 11:30 AM", type: "Virtual (Zoom)", topic: "Data center cabling design and connectivity basics." },
      { date: "Wednesday, November 11, 2026", time: "7:00 PM – 8:30 PM", type: "Virtual (Zoom)", topic: "Introduction to single-mode and multi-mode fiber, including common connectors (LC, SC, MPO)." },
    ],
  },
  {
    week: "Week 2",
    title: "Cabling Standards & Physical Architecture",
    sessions: [
      { date: "Saturday, November 14, 2026", time: "10:00 AM – 11:30 AM", type: "Virtual (Zoom)", topic: "Ethernet cabling standards and RJ45 connector awareness." },
      { date: "Sunday, November 15, 2026", time: "10:00 AM – 11:30 AM", type: "Virtual (Zoom)", topic: "Rack systems and server form factors (tower, rack-mounted, blade servers). Power and cooling requirements in server environments." },
      { date: "Sunday, November 15, 2026", time: "1:00 PM – 3:00 PM", type: "In-Person Lab", topic: "RJ45 crimping and rack mounting basics." },
      { date: "Wednesday, November 18, 2026", time: "7:00 PM – 8:30 PM", type: "Virtual (Zoom)", topic: "Fundamentals of electrical circuits, breaker systems and PDU (Power Distribution Unit) connectivity knowledge and simulation." },
    ],
  },
  {
    week: "Week 3",
    title: "Power Systems & Hardware Core",
    sessions: [
      { date: "Saturday, November 21, 2026", time: "10:00 AM – 11:30 AM", type: "Virtual (Zoom)", topic: "Server hardware component: Motherboard." },
      { date: "Sunday, November 22, 2026", time: "10:00 AM – 11:30 AM", type: "Virtual (Zoom)", topic: "Server hardware component: CPU, memory, storage devices, NICs, backplane, SAS cables, TPM, riser cards." },
      { date: "Sunday, November 22, 2026", time: "1:00 PM – 3:00 PM", type: "In-Person Lab", topic: "Hands-on motherboard and internal server hardware lab." },
      { date: "Wednesday, November 25, 2026", time: "7:00 PM – 8:30 PM", type: "Virtual (Zoom)", topic: "Power supplies, PDU setup and power redundancy (Part 1)." },
    ],
  },
  {
    week: "Week 4",
    title: "Hardware Deep Dive & Storage (Intensive Lab Week)",
    sessions: [
      { date: "Saturday, November 28, 2026", time: "10:00 AM – 11:30 AM", type: "Virtual (Zoom)", topic: "Server hardware components: motherboard, CPU, memory, storage devices, NICs, backplane, SAS cables, TPM, riser cards, and power supplies (Feedback and revision Part 2)." },
      { date: "Saturday, November 28, 2026", time: "1:00 PM – 3:00 PM", type: "Bonus Lab", topic: "Server teardown and component identification." },
      { date: "Sunday, November 29, 2026", time: "10:00 AM – 11:30 AM", type: "Virtual (Zoom)", topic: "Storage drive technologies: HDD, SSD, SAS, SATA, and NVMe." },
      { date: "Sunday, November 29, 2026", time: "1:00 PM – 3:00 PM", type: "In-Person Lab", topic: "Hardware assembly and drive installations." },
      { date: "Wednesday, December 2, 2026", time: "7:00 PM – 8:30 PM", type: "Virtual (Zoom)", topic: "RAID levels (0, 1, 5, 10) and setup concepts." },
    ],
  },
  {
    week: "Week 5",
    title: "BIOS, Firmware & Diagnostics",
    sessions: [
      { date: "Saturday, December 5, 2026", time: "10:00 AM – 11:30 AM", type: "Virtual (Zoom)", topic: "BIOS/UEFI configuration essentials." },
      { date: "Sunday, December 6, 2026", time: "10:00 AM – 11:30 AM", type: "Virtual (Zoom)", topic: "Power-On Self-Test (POST) process and hardware diagnoses." },
      { date: "Sunday, December 6, 2026", time: "1:00 PM – 3:00 PM", type: "In-Person Lab", topic: "BIOS/UEFI configuration and POST error troubleshooting." },
      { date: "Wednesday, December 9, 2026", time: "7:00 PM – 8:30 PM", type: "Virtual (Zoom)", topic: "Performing firmware and driver updates (Part 1)." },
    ],
  },
  {
    week: "Week 6",
    title: "Operating Systems & Linux",
    sessions: [
      { date: "Saturday, December 12, 2026", time: "10:00 AM – 11:30 AM", type: "Virtual (Zoom)", topic: "Installing operating systems (Windows Server, Linux)." },
      { date: "Sunday, December 13, 2026", time: "10:00 AM – 11:30 AM", type: "Virtual (Zoom)", topic: "Basic Linux command-line operation." },
      { date: "Sunday, December 13, 2026", time: "1:00 PM – 3:00 PM", type: "In-Person Lab", topic: "OS installation and Linux command line practice." },
      { date: "Wednesday, December 16, 2026", time: "7:00 PM – 8:30 PM", type: "Virtual (Zoom)", topic: "Understanding IP addressing (IPv4)." },
    ],
  },
  {
    week: "Week 7",
    title: "Networking & Remote Management (Intensive Lab Week)",
    sessions: [
      { date: "Saturday, December 19, 2026", time: "10:00 AM – 11:30 AM", type: "Virtual (Zoom)", topic: "Understand difference between router and switch." },
      { date: "Saturday, December 19, 2026", time: "1:00 PM – 3:00 PM", type: "Bonus Lab", topic: "Network router, switch and PC connectivity, configuration, and IP assignment." },
      { date: "Sunday, December 20, 2026", time: "10:00 AM – 11:30 AM", type: "Virtual (Zoom)", topic: "Remote server management via IPMI." },
      { date: "Sunday, December 20, 2026", time: "1:00 PM – 3:00 PM", type: "In-Person Lab", topic: "IPMI configuration and remote troubleshooting." },
      { date: "Wednesday, December 23, 2026", time: "7:00 PM – 8:30 PM", type: "Virtual (Zoom)", topic: "Performing firmware and driver updates (Part 2 - Remote Execution Focus)." },
    ],
  },
  {
    week: "Week 8",
    title: "Operations, Logistics & Final Review",
    sessions: [
      { date: "Saturday, December 26, 2026", time: "10:00 AM – 11:30 AM", type: "Virtual (Zoom)", topic: "Introduction to ticketing systems." },
      { date: "Sunday, December 27, 2026", time: "10:00 AM – 11:30 AM", type: "Virtual (Zoom)", topic: "Parts handling and logistics guidance." },
      { date: "Sunday, December 27, 2026", time: "1:00 PM – 3:00 PM", type: "In-Person Lab", topic: "Mock ticketing scenario and full system troubleshooting (Final Practical)." },
      { date: "Wednesday, December 30, 2026", time: "7:00 PM – 8:30 PM", type: "Virtual (Zoom)", topic: "Course wrap-up, final Q&A, and technical assessment." },
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
    a: "Live instruction classes are held virtually over Zoom, and hands-on practical labs are held in person at our dedicated training facility at 22648 Glenn Dr, STE 102, Sterling, VA 20164.",
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
