// Extracted from ADCS_MASTER_COURSE_SCHEDULE (Aug 22, 2026 to Oct 14, 2026)
export const COURSE_DATE_RANGE = "August 22, 2026 to October 14, 2026";

export const COURSE_SCHEDULE = [
  {
    week: "Week 1",
    title: "Foundation & Connectivity",
    sessions: [
      { date: "Sat, Aug 22", time: "10:00 AM to 11:30 AM", type: "Classroom", topic: "Overview of data centers and Cloud significance." },
      { date: "Sun, Aug 23", time: "10:00 AM to 11:30 AM", type: "Classroom", topic: "Data center cabling design and connectivity basics." },
      { date: "Wed, Aug 26", time: "7:00 PM to 8:30 PM", type: "Classroom", topic: "Introduction to single-mode and multi-mode fiber, including common connectors (LC, SC, MPO)." },
    ],
  },
  {
    week: "Week 2",
    title: "Cabling Standards & Physical Architecture",
    sessions: [
      { date: "Sat, Aug 29", time: "10:00 AM to 11:30 AM", type: "Classroom", topic: "Ethernet cabling standards and RJ45 connector awareness." },
      { date: "Sun, Aug 30", time: "10:00 AM to 11:30 AM", type: "Classroom", topic: "Rack systems and server form factors (tower, rack-mounted, blade servers). Power and cooling requirements." },
      { date: "Sun, Aug 30", time: "1:00 PM to 3:00 PM", type: "Lab", topic: "RJ45 crimping and rack mounting basics." },
      { date: "Wed, Sep 2", time: "7:00 PM to 8:30 PM", type: "Classroom", topic: "Fundamentals of electrical circuits, breaker systems, and PDU connectivity (knowledge and simulation)." },
    ],
  },
  {
    week: "Week 3",
    title: "Power Systems & Hardware Core",
    sessions: [
      { date: "Sat, Sep 5", time: "10:00 AM to 11:30 AM", type: "Classroom", topic: "Server hardware component: Motherboard." },
      { date: "Sun, Sep 6", time: "10:00 AM to 11:30 AM", type: "Classroom", topic: "Server hardware components: CPU, memory, storage devices, NICs, backplane, SAS cables, TPM, riser cards." },
      { date: "Sun, Sep 6", time: "1:00 PM to 3:00 PM", type: "Lab", topic: "Lab activity (to be finalized)." },
      { date: "Wed, Sep 9", time: "7:00 PM to 8:30 PM", type: "Classroom", topic: "Power supplies, PDU setup, and power redundancy (Part 1)." },
    ],
  },
  {
    week: "Week 4",
    title: "Hardware Deep Dive & Storage (Intensive Lab Week)",
    sessions: [
      { date: "Sat, Sep 12", time: "10:00 AM to 11:30 AM", type: "Classroom", topic: "Server hardware components review, feedback and revision (Part 2)." },
      { date: "Sat, Sep 12", time: "1:00 PM to 3:00 PM", type: "Bonus Lab", topic: "Server teardown and component identification." },
      { date: "Sun, Sep 13", time: "10:00 AM to 11:30 AM", type: "Classroom", topic: "Storage drive technologies: HDD, SSD, SAS, SATA, and NVMe." },
      { date: "Sun, Sep 13", time: "1:00 PM to 3:00 PM", type: "Lab", topic: "Hardware assembly and drive installations." },
      { date: "Wed, Sep 16", time: "7:00 PM to 8:30 PM", type: "Classroom", topic: "RAID levels (0, 1, 5, 10) and setup concepts." },
    ],
  },
  {
    week: "Week 5",
    title: "BIOS, Firmware & Diagnostics",
    sessions: [
      { date: "Sat, Sep 19", time: "10:00 AM to 11:30 AM", type: "Classroom", topic: "BIOS/UEFI configuration essentials." },
      { date: "Sun, Sep 20", time: "10:00 AM to 11:30 AM", type: "Classroom", topic: "Power-On Self-Test (POST) process and hardware diagnostics." },
      { date: "Sun, Sep 20", time: "1:00 PM to 3:00 PM", type: "Lab", topic: "BIOS/UEFI configuration and POST error troubleshooting." },
      { date: "Wed, Sep 23", time: "7:00 PM to 8:30 PM", type: "Classroom", topic: "Performing firmware and driver updates (Part 1)." },
    ],
  },
  {
    week: "Week 6",
    title: "Operating Systems & Linux",
    sessions: [
      { date: "Sat, Sep 26", time: "10:00 AM to 11:30 AM", type: "Classroom", topic: "Installing operating systems (Windows Server, Linux)." },
      { date: "Sun, Sep 27", time: "10:00 AM to 11:30 AM", type: "Classroom", topic: "Basic Linux command-line operation." },
      { date: "Sun, Sep 27", time: "1:00 PM to 3:00 PM", type: "Lab", topic: "OS installation and Linux command line practice." },
      { date: "Wed, Sep 30", time: "7:00 PM to 8:30 PM", type: "Classroom", topic: "Understanding IP addressing (IPv4)." },
    ],
  },
  {
    week: "Week 7",
    title: "Networking & Remote Management (Intensive Lab Week)",
    sessions: [
      { date: "Sat, Oct 3", time: "10:00 AM to 11:30 AM", type: "Classroom", topic: "Understanding the difference between a router and a switch." },
      { date: "Sat, Oct 3", time: "1:00 PM to 3:00 PM", type: "Bonus Lab", topic: "Network router, switch, and PC connectivity, configuration, and IP assignment." },
      { date: "Sun, Oct 4", time: "10:00 AM to 11:30 AM", type: "Classroom", topic: "Remote server management via IPMI." },
      { date: "Sun, Oct 4", time: "1:00 PM to 3:00 PM", type: "Lab", topic: "IPMI configuration and remote troubleshooting." },
      { date: "Wed, Oct 7", time: "7:00 PM to 8:30 PM", type: "Classroom", topic: "Performing firmware and driver updates (Part 2, remote execution focus)." },
    ],
  },
  {
    week: "Week 8",
    title: "Operations, Logistics & Final Review",
    sessions: [
      { date: "Sat, Oct 10", time: "10:00 AM to 11:30 AM", type: "Classroom", topic: "Introduction to ticketing systems." },
      { date: "Sun, Oct 11", time: "10:00 AM to 11:30 AM", type: "Classroom", topic: "Parts handling and logistics guidance." },
      { date: "Sun, Oct 11", time: "1:00 PM to 3:00 PM", type: "Lab", topic: "Mock ticketing scenario and full system troubleshooting (final practical)." },
      { date: "Wed, Oct 14", time: "7:00 PM to 8:30 PM", type: "Classroom", topic: "Course wrap-up, final Q&A, and technical assessment." },
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
